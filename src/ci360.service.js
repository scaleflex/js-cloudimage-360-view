import throttle from 'lodash.throttle';

import { adaptConfig, getConfigFromImage } from './ci360.utils';
import './static/css/style.css';
import './static/css/hotspots.css';
import {
  generateCdnPath,
  preloadImages,
  createCloseIcon,
  createFullscreenIcon,
  createMagnifierIcon,
  createZoomOutIcon,
  createLoader,
  createInnerBox,
  createIconsContainer,
  createCanvas,
  create360ViewCircleIcon,
  createFullscreenModal,
  magnify,
  isCompletedOneCycle,
  getMovingDirection,
  loop,
  initLazyload,
  createInitialIcon,
  removeElementFromContainer,
  generateHighPreviewCdnUrl,
  loadImage,
  delay,
  shouldSwitchSpinDirection,
  switchSpinDirection,
  ORIENTATIONS,
  THROTTLE_TIME,
  DRAG_START_DELAY,
  ZOOM_TRANSITION_DELAY,
  DRAG_SPEED_DIVISOR,
  MIN_DRAG_SPEED,
  MAX_MAGNIFIER_LEVEL,
  MAX_POINTER_ZOOM,
  getDefaultSpinDirection,
  isSpinKeysPressed,
  calculateOffsetFromEvent,
  createLoadingSpinner,
  createTransitionOverlay,
  isTouchDevice,
  safeJsonParse,
  createAriaLiveRegion,
  announceToScreenReader,
  createHintsOverlay,
  getHintsForConfig,
  showHintsOverlay,
  hideHintsOverlay,
  createHotspotTimeline,
  updateTimelineIndicator,
  showHotspotTimeline,
  hideHotspotTimeline,
} from './utils';

import CanvasWorker from './canvas.worker.js?worker&inline';
import MainThreadCanvasRenderer from './canvas-renderer';
import Hotspot from './hotspots';

// Detect mobile for using main-thread canvas instead of OffscreenCanvas worker
// OffscreenCanvas has known memory issues on mobile Safari
const USE_MAIN_THREAD_CANVAS = typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

class CI360Viewer {
  constructor(container, config, fullscreen) {
    this.container = container;
    this.isClicked = false;
    this.fullscreenView = !!fullscreen;
    this.imagesX = [];
    this.imagesY = [];
    // Cap DPR on mobile to reduce canvas memory usage
    // Mobile devices with dPR 3 can create canvases 3x larger than needed
    const rawDpr = Math.round(window.devicePixelRatio || 1);
    this.devicePixelRatio = USE_MAIN_THREAD_CANVAS ? Math.min(rawDpr, 2) : rawDpr;
    this.id = container.id;
    this.movementStart = { x: 0, y: 0 };
    this.draggingDirection = null;
    this.isReady = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.lastDragTime = 0;
    this.lastDragX = 0;
    this.lastDragY = 0;
    this.inertiaAnimationId = null;
    this.hasInteracted = false;
    this.currentZoomScale = 1;
    this.touchDevice = isTouchDevice();
    this.dragJustEnded = false;
    // Pinch-to-zoom state
    this.isPinching = false;
    this.initialPinchDistance = 0;
    this.pinchZoomLevel = 1;
    this.pinchZoomEmitted = false;
    this.lastEmittedZoom = 1;
    // Pan while zoomed state
    this.panOffsetX = 0;
    this.panOffsetY = 0;
    // Use main-thread canvas on mobile to avoid OffscreenCanvas memory issues
    this.useMainThreadCanvas = USE_MAIN_THREAD_CANVAS;
    this.canvasWorker = this.useMainThreadCanvas ? new MainThreadCanvasRenderer() : new CanvasWorker();
    // Hotspot timeline state
    this.hotspotTimeline = null;
    this.hotspotTimelineIndicator = null;
    this.isAnimatingToFrame = false;
    this.onMoveHandler = this.onMoveHandler.bind(this);
    this.destroy = this.destroy.bind(this);
    this.init(this.container, config);
  }

  /**
   * Close ImageBitmap objects to free GPU memory
   * @param {Array} images - Array of image objects with bitmapImage property
   */
  closeImageBitmaps(images) {
    if (!images || !Array.isArray(images)) return;

    images.forEach((imageData) => {
      if (imageData?.bitmapImage?.close) {
        imageData.bitmapImage.close();
      }
    });
  }

  emit(eventName, data = {}) {
    const callback = this[eventName];
    if (typeof callback === 'function') {
      callback({ ...data, viewerId: this.id });
    }
  }

  announce(message) {
    announceToScreenReader(this.ariaLiveRegion, message);
  }

  mouseDown(event) {
    if (!this.isReady || this.glass) return;

    // Don't handle mousedown on interactive elements - let them handle their own events
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot');
      if (isInteractiveElement) return;
    }

    const { pageX, pageY } = event;

    // Hide hints and hotspot poppers on first interaction
    this.hideHints();
    this.hideHotspotPopper();

    // Cancel any running inertia animation
    if (this.inertiaAnimationId) {
      cancelAnimationFrame(this.inertiaAnimationId);
      this.inertiaAnimationId = null;
    }

    // Track if we just stopped autoplay - don't zoom on this click
    this.autoplayJustStopped = false;
    if (this.autoplay || this.loopTimeoutId) {
      this.stopAutoplay();
      this.autoplay = false;
      this.autoplayJustStopped = true;
    }

    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
    this.isDragging = false;

    // Initialize velocity tracking for inertia
    if (this.inertia) {
      this.velocityX = 0;
      this.velocityY = 0;
      this.lastDragTime = performance.now();
      this.lastDragX = pageX;
      this.lastDragY = pageY;
    }
  }

  mouseUp() {
    if (!this.isReady) return;

    // Don't show icons if autoplay was just stopped by this interaction
    if (!this.isZoomed && !this.autoplayJustStopped) this.showAllIcons();

    // Start inertia animation if enabled and has velocity
    if (this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1)) {
      this.startInertia();
    }

    // Emit drag end event if we were dragging
    if (this.isDragging) {
      this.emit('onDragEnd');
      // Prevent click event from triggering zoom after drag
      this.dragJustEnded = true;
    }

    this.movementStart = { x: 0, y: 0 };
    this.isClicked = false;
    this.isDragging = false;
    this.innerBox.style.cursor = 'grab';
  }

  startInertia() {
    const friction = 0.95;
    const minVelocity = 0.01;
    const container = this.fullscreenView ? document.body : this.container;
    const dragFactor = this.dragSpeed / DRAG_SPEED_DIVISOR;
    const speedFactorX = dragFactor * (this.amountX / container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / container.offsetHeight);

    const animate = () => {
      // Apply friction
      this.velocityX *= friction;
      this.velocityY *= friction;

      // Check if we should stop
      if (Math.abs(this.velocityX) < minVelocity && Math.abs(this.velocityY) < minVelocity) {
        this.inertiaAnimationId = null;
        return;
      }

      // Calculate movement
      const deltaX = this.velocityX * 16; // ~16ms per frame
      const deltaY = this.velocityY * 16;

      const direction = getMovingDirection({
        deltaX,
        deltaY,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY,
      });

      if (direction) {
        const itemsSkippedX = this.allowSpinX ? Math.max(1, Math.abs(Math.round(deltaX * speedFactorX))) : 0;
        const itemsSkippedY = this.allowSpinY ? Math.max(1, Math.abs(Math.round(deltaY * speedFactorY))) : 0;

        if (itemsSkippedX > 0 || itemsSkippedY > 0) {
          this.onMoveHandler(direction, itemsSkippedX, itemsSkippedY);
        }
      }

      this.inertiaAnimationId = requestAnimationFrame(animate);
    };

    this.inertiaAnimationId = requestAnimationFrame(animate);
  }

  drag(pageX, pageY) {
    if (!this.isReady || !this.isClicked) return;

    const deltaX = pageX - this.movementStart.x;
    const deltaY = pageY - this.movementStart.y;

    // Track velocity for inertia (always track, not just on movement)
    if (this.inertia) {
      const now = performance.now();
      const timeDelta = now - this.lastDragTime;
      if (timeDelta > 0 && timeDelta < 100) { // Ignore if too much time passed (stale)
        this.velocityX = (pageX - this.lastDragX) / timeDelta;
        this.velocityY = (pageY - this.lastDragY) / timeDelta;
      }
      this.lastDragTime = now;
      this.lastDragX = pageX;
      this.lastDragY = pageY;
    }

    this.draggingDirection =
      getMovingDirection({
        deltaX,
        deltaY,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY,
      }) || this.draggingDirection;

    const container = this.fullscreenView ? document.body : this.container;
    const dragFactor = this.dragSpeed / DRAG_SPEED_DIVISOR;

    const speedFactorX = dragFactor * (this.amountX / container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / container.offsetHeight);
    const itemsSkippedX = this.allowSpinX ? Math.abs(Math.round(deltaX * speedFactorX)) : 0;
    const itemsSkippedY = this.allowSpinY ? Math.abs(Math.round(deltaY * speedFactorY)) : 0;

    const shouldMove = (this.allowSpinX && itemsSkippedX !== 0) || (this.allowSpinY && itemsSkippedY !== 0);

    if (shouldMove) {
      this.hasInteracted = true;
      this.hideHotspotPopper();
      this.onMoveHandler(this.draggingDirection, itemsSkippedX, itemsSkippedY);
      this.movementStart = { x: pageX, y: pageY };

      setTimeout(() => {
        if (!this.isDragging) {
          this.isDragging = true;
          this.emit('onDragStart');
        }
      }, DRAG_START_DELAY);
    }
  }

  mouseMove(event) {
    if (!this.isReady || (!this.isClicked && !this.isZoomed) || this.glass) return;

    // Only hide icons when dragging (not when zoomed and panning)
    if (!this.isZoomed) {
      this.hideAllIcons();
    }
    this.drag(event.pageX, event.pageY);

    if (this.isZoomed) this.applyZoom(event);
  }

  mouseClick(event) {
    if (!this.isReady || this.isDragging) return;

    // Don't handle click on interactive elements - let them handle their own clicks
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot');
      if (isInteractiveElement) return;
    }

    // If drag just ended, don't trigger zoom (click fires after mouseUp)
    if (this.dragJustEnded) {
      this.dragJustEnded = false;
      return;
    }

    // If autoplay was just stopped by this click, don't trigger zoom
    if (this.autoplayJustStopped) {
      this.autoplayJustStopped = false;
      return;
    }

    if (this.glass && this.magnified) {
      this.removeGlass();
      return;
    }

    // Only trigger zoom on click if pointerZoomTrigger is 'click'
    if (this.pointerZoomTrigger === 'click' && this.pointerZoom && !this.glass && !this.touchDevice) {
      this.toggleZoom(event);
    }
  }

  mouseDblClick(event) {
    if (!this.isReady) return;

    // Don't handle dblclick on interactive elements
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot');
      if (isInteractiveElement) return;
    }

    // Only trigger zoom on dblclick if pointerZoomTrigger is 'dblclick'
    if (this.pointerZoomTrigger === 'dblclick' && this.pointerZoom && !this.glass && !this.touchDevice) {
      this.toggleZoom(event);
    }
  }

  loadHigherQualityImages(width, onLoad) {
    const cdnPathX = generateCdnPath(this.srcXConfig, width);
    const cdnPathY = this.allowSpinY ? generateCdnPath(this.srcYConfig, width) : null;

    preloadImages({
      cdnPathX,
      cdnPathY,
      configX: this.srcXConfig,
      configY: this.srcYConfig,
      onAllImagesLoad: (loadedImagesX, loadedImagesY) => {
        // Close old ImageBitmap objects to free memory before replacing
        this.closeImageBitmaps(this.imagesX);
        this.closeImageBitmaps(this.imagesY);

        this.imagesX = loadedImagesX;
        this.imagesY = loadedImagesY;
        onLoad();
      },
      onError: (errorInfo) => this.emit('onError', errorInfo),
    });
  }

  hideHotspots() {
    if (!this.hotspotsInstance) return;

    this.hotspotsInstance.hideHotspots();
  }

  hideHotspotPopper() {
    if (!this.hotspotsInstance) return;

    // Use forceHidePopper to ensure the modal is always closed, ignoring keepOpen flag
    this.hotspotsInstance.forceHidePopper();
  }

  toggleZoom(event) {
    if (this.isZoomed) {
      this.showTransitionOverlay();

      setTimeout(() => {
        this.removeZoom();
      }, ZOOM_TRANSITION_DELAY);
    } else {
      let width = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;

      this.hideHotspots();
      this.showLoadingSpinner();
      this.loadHigherQualityImages(width, () => {
        this.showTransitionOverlay();

        setTimeout(() => {
          this.applyZoom(event);
        }, ZOOM_TRANSITION_DELAY);
      });
    }
  }

  removeZoom() {
    this.isZoomed = false;
    this.updateView();
    this.showAllIcons();
    this.hideZoomOutIcon();
    this.hideTransitionOverlay();
    this.emit('onZoomOut');
    this.announce('Zoomed out');
  }

  zoomIn(event) {
    if (this.isZoomed || !this.pointerZoom) return;

    event?.stopPropagation();

    let width = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;

    this.hideHotspots();
    this.hideAllIcons();
    this.showLoadingSpinner();
    this.loadHigherQualityImages(width, () => {
      this.showTransitionOverlay();

      setTimeout(() => {
        this.applyZoom(event);
      }, ZOOM_TRANSITION_DELAY);
    });
  }

  zoomOut(event) {
    if (!this.isZoomed) return;

    event?.stopPropagation();

    this.showTransitionOverlay();

    setTimeout(() => {
      this.removeZoom();
    }, ZOOM_TRANSITION_DELAY);
  }

  mouseLeave() {
    if (this.isZoomed) {
      this.removeZoom();
    }
  }

  applyZoom(event) {
    const { offsetX, offsetY } = calculateOffsetFromEvent(event, this.canvas, this.devicePixelRatio);

    // Only do first-time zoom setup if not already zoomed
    if (!this.isZoomed) {
      this.isZoomed = true;
      this.hideAllIcons();
      this.hideLoadingSpinner();
      this.hideTransitionOverlay();
      this.showZoomOutIcon();
      this.emit('onZoomIn', { zoomLevel: this.pointerZoom });
      this.announce('Zoomed in. Move mouse to pan. Click to zoom out.');
    }

    this.updateView(this.pointerZoom, offsetX, offsetY);
  }

  touchOutside(event) {
    if (!this.glass) return;

    const isOutside = !this.canvas.contains(event.target);

    if (isOutside) {
      this.removeGlass();
    }
  }

  touchStart(event) {
    if (!this.isReady || this.glass || !event.touches || !event.touches.length) return;

    // Don't handle touch on interactive elements - let them handle their own clicks
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot');
      if (isInteractiveElement) return;
    }

    // Hide hints on first interaction
    this.hideHints();

    // Handle pinch-to-zoom with two fingers
    // Don't enter pinch mode if already dragging (prevents accidental activation)
    if (event.touches.length === 2 && this.pinchZoom && !this.isDragging) {
      event.preventDefault();
      this.isPinching = true;
      this.isClicked = false;

      // Cancel any running inertia animation
      if (this.inertiaAnimationId) {
        cancelAnimationFrame(this.inertiaAnimationId);
        this.inertiaAnimationId = null;
      }

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      this.initialPinchDistance = this.getPinchDistance(touch1, touch2);

      // Stop autoplay when pinching
      if (this.autoplay || this.loopTimeoutId) {
        this.stopAutoplay();
        this.autoplay = false;
      }

      // If not already zoomed, load higher quality images
      if (!this.isZoomed && this.pinchZoomLevel === 1) {
        const width = (this.fullscreenView ? document.body : this.container).offsetWidth;
        this.hideHotspots();
        this.loadHigherQualityImages(width, () => {});
      }
      return;
    }

    // Single finger - normal rotation
    if (event.touches.length > 1) return;

    const { pageX, pageY } = event.touches[0];

    // Cancel any running inertia animation
    if (this.inertiaAnimationId) {
      cancelAnimationFrame(this.inertiaAnimationId);
      this.inertiaAnimationId = null;
    }

    if (this.autoplay || this.loopTimeoutId) {
      this.stopAutoplay();
      this.autoplay = false;
    }

    this.hideAllIcons();
    this.hideHotspotPopper();
    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
    this.isDragging = false;

    // Initialize velocity tracking for inertia
    if (this.inertia) {
      this.velocityX = 0;
      this.velocityY = 0;
      this.lastDragTime = performance.now();
      this.lastDragX = pageX;
      this.lastDragY = pageY;
    }
  }

  getPinchDistance(touch1, touch2) {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getPinchCenter(touch1, touch2) {
    return {
      x: (touch1.pageX + touch2.pageX) / 2,
      y: (touch1.pageY + touch2.pageY) / 2,
    };
  }

  touchEnd(event) {
    if (!this.isReady) return;

    // Handle pinch end
    if (this.isPinching) {
      // Only end pinching if no fingers remain or only one finger
      if (!event.touches || event.touches.length < 2) {
        this.isPinching = false;
        this.initialPinchDistance = 0;

        // If zoomed out completely, reset zoom state
        if (this.pinchZoomLevel <= 1) {
          const wasZoomed = this.pinchZoomEmitted;
          this.pinchZoomLevel = 1;
          this.pinchZoomEmitted = false;
          this.lastEmittedZoom = 1;
          this.isZoomed = false;
          this.panOffsetX = 0;
          this.panOffsetY = 0;
          this.showAllIcons();
          this.updateView();
          // Only emit onZoomOut if onZoomIn was previously emitted
          if (wasZoomed) {
            this.emit('onZoomOut');
          }
        } else if (this.canvas) {
          // Still zoomed - initialize pan offset to canvas center for panning
          const rect = this.canvas.getBoundingClientRect();
          this.panOffsetX = rect.width / 2 * this.devicePixelRatio;
          this.panOffsetY = rect.height / 2 * this.devicePixelRatio;
        }
      }
      return;
    }

    this.showAllIcons();

    // Start inertia animation if enabled and has velocity
    if (this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1)) {
      this.startInertia();
    }

    this.movementStart = { x: 0, y: 0 };
    this.isClicked = false;
    this.isDragging = false;
  }

  touchMove(event) {
    if (!this.isReady || this.glass) return;

    // Handle pinch zoom
    if (this.isPinching && event.touches.length === 2) {
      event.preventDefault();

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = this.getPinchDistance(touch1, touch2);

      // Guard against division by zero
      if (this.initialPinchDistance === 0) {
        this.initialPinchDistance = currentDistance;
        return;
      }

      // Calculate zoom scale based on pinch distance change
      const scale = currentDistance / this.initialPinchDistance;
      const newZoomLevel = Math.max(1, Math.min(this.pinchZoomLevel * scale, MAX_POINTER_ZOOM));

      // Update pinch reference for smooth continuous zoom
      this.initialPinchDistance = currentDistance;
      this.pinchZoomLevel = newZoomLevel;

      // Calculate offset relative to canvas center for zoom
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      const canvasCenterX = rect.width / 2 * this.devicePixelRatio;
      const canvasCenterY = rect.height / 2 * this.devicePixelRatio;

      if (newZoomLevel > 1) {
        this.isZoomed = true;
        this.hideAllIcons();
        // Use canvas center for zoom (simpler and more stable)
        this.updateView(newZoomLevel, canvasCenterX, canvasCenterY);

        if (!this.pinchZoomEmitted || newZoomLevel > this.lastEmittedZoom) {
          this.emit('onZoomIn', { zoomLevel: newZoomLevel });
          this.pinchZoomEmitted = true;
          this.lastEmittedZoom = newZoomLevel;
        }
      } else {
        this.isZoomed = false;
        this.panOffsetX = 0;
        this.panOffsetY = 0;
        // Don't reset pinchZoomEmitted here - we need it in touchEnd to know if onZoomOut should fire
        this.updateView();
      }
      return;
    }

    // Normal single-finger drag
    if (!this.isClicked || !event.touches || !event.touches[0]) return;
    const { pageX, pageY } = event.touches[0];
    event.preventDefault();

    // Pan when zoomed instead of rotating
    if (this.isZoomed && this.pinchZoomLevel > 1) {
      const deltaX = pageX - this.movementStart.x;
      const deltaY = pageY - this.movementStart.y;

      // Update pan offset - subtract to follow finger direction (like scrolling)
      this.panOffsetX -= deltaX * this.devicePixelRatio;
      this.panOffsetY -= deltaY * this.devicePixelRatio;

      // Update movement start for next frame
      this.movementStart = { x: pageX, y: pageY };

      // Apply pan with current zoom level
      this.updateView(this.pinchZoomLevel, this.panOffsetX, this.panOffsetY);
      return;
    }

    this.drag(pageX, pageY);
  }

  keyDown(event) {
    if (!this.isReady) return;

    const { keyCode } = event;
    const isReverse = this.keysReverse;

    if (this.autoplay) this.stopAutoplay();

    if (isSpinKeysPressed(keyCode, this.allowSpinY)) {
      this.hasInteracted = true;
      this.hideAllIcons();
      this.hideHints();
    }

    switch (keyCode) {
      case 37: // left arrow
        isReverse ? this.moveLeft() : this.moveRight();
        break;
      case 39: // right arrow
        isReverse ? this.moveRight() : this.moveLeft();
        break;
      case 38: // up arrow
        if (this.allowSpinY) {
          event.preventDefault();
          isReverse ? this.moveTop() : this.moveBottom();
        }
        break;
      case 40: // down arrow
        if (this.allowSpinY) {
          event.preventDefault();
          isReverse ? this.moveBottom() : this.moveTop();
        }
        break;
      default:
        break;
    }
  }

  keyUp(event) {
    const { keyCode } = event;

    if (isSpinKeysPressed(keyCode, this.allowSpinY)) {
      this.showAllIcons();
    }
  }

  moveActiveXIndexUp(itemsSkipped) {
    this.orientation = ORIENTATIONS.X;
    this.activeImageX = (this.activeImageX + itemsSkipped) % this.amountX;
  }

  moveActiveXIndexDown(itemsSkipped) {
    this.orientation = ORIENTATIONS.X;
    this.activeImageX = (this.activeImageX - itemsSkipped + this.amountX) % this.amountX;
  }

  moveActiveYIndexUp(itemsSkipped) {
    this.orientation = ORIENTATIONS.Y;
    this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY;
  }

  moveActiveYIndexDown(itemsSkipped) {
    this.orientation = ORIENTATIONS.Y;
    this.activeImageY = (this.activeImageY - itemsSkipped + this.amountY) % this.amountY;
  }

  moveRight(stopAtEdges, itemsSkippedX = 1) {
    if (stopAtEdges && this.activeImageX >= this.imagesX.length - 1) return;

    this.moveActiveXIndexUp(itemsSkippedX);
    if (!this.isZoomed) this.updateView();
  }

  moveLeft(stopAtEdges, itemsSkippedX = 1) {
    if (stopAtEdges && this.activeImageX <= 0) return;

    this.moveActiveXIndexDown(itemsSkippedX);
    if (!this.isZoomed) this.updateView();
  }

  moveTop(stopAtEdges, itemsSkippedY = 1) {
    if (stopAtEdges && this.activeImageY >= this.imagesY.length - 1) return;

    this.moveActiveYIndexUp(itemsSkippedY);
    if (!this.isZoomed) this.updateView();
  }

  moveBottom(stopAtEdges, itemsSkippedY = 1) {
    if (stopAtEdges && this.activeImageY <= 0) return;

    this.moveActiveYIndexDown(itemsSkippedY);
    if (!this.isZoomed) this.updateView();
  }

  onMoveHandler(movingDirection, itemsSkippedX = 1, itemsSkippedY = 1) {
    if (movingDirection === 'right') {
      this.moveRight(this.stopAtEdges, itemsSkippedX);
    } else if (movingDirection === 'left') {
      this.moveLeft(this.stopAtEdges, itemsSkippedX);
    } else if (movingDirection === 'up') {
      this.moveTop(this.stopAtEdges, itemsSkippedY);
    } else if (movingDirection === 'down') {
      this.moveBottom(this.stopAtEdges, itemsSkippedY);
    }

    this.emit('onSpin', {
      direction: movingDirection,
      activeImageX: this.activeImageX,
      activeImageY: this.activeImageY,
      amountX: this.amountX,
      amountY: this.amountY,
    });
  }

  updateView(zoomScale, offsetX, offsetY) {
    const activeIndex = this.orientation === ORIENTATIONS.X ? this.activeImageX : this.activeImageY;

    const imageData =
      this.orientation === ORIENTATIONS.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];

    if (this.hotspotsInstance && !this.isZoomed && !this.autoplay) {
      this.hotspotsInstance.updateHotspotPosition(activeIndex, this.orientation);
    }

    // Update timeline indicator position
    if (this.hotspotTimelineIndicator && this.orientation === ORIENTATIONS.X) {
      this.updateHotspotTimelinePosition();
    }

    this.drawImageOnCanvas(imageData, zoomScale, offsetX, offsetY);
  }

  updatePercentageInLoader(percentage = 0) {
    if (!this.loader) return;

    this.loader.innerText = percentage + '%';
  }

  adaptCanvasSize(imageData) {
    const { naturalWidth, naturalHeight } = imageData;
    this.imageAspectRatio = naturalWidth / naturalHeight;
    const containerWidth = this.fullscreenView ? window.innerWidth : this.canvas.clientWidth;
    const containerHeight = this.fullscreenView ? window.innerHeight : this.canvas.clientHeight;

    this.canvasWorker.postMessage({
      action: 'adaptCanvasSize',
      devicePixelRatio: this.devicePixelRatio,
      imageAspectRatio: this.imageAspectRatio,
      containerWidth,
      containerHeight,
    });
  }

  drawImageOnCanvas(imageData, zoomScale = 1, pointerX = 0, pointerY = 0) {
    // Throttle draw calls using requestAnimationFrame to prevent flooding
    // the worker with messages during rapid dragging (especially on mobile)
    this.pendingDrawData = { imageData, zoomScale, pointerX, pointerY };

    if (!this.drawFrameRequested) {
      this.drawFrameRequested = true;
      requestAnimationFrame(() => {
        this.drawFrameRequested = false;
        if (this.pendingDrawData) {
          const { imageData, zoomScale, pointerX, pointerY } = this.pendingDrawData;
          this.canvasWorker.postMessage({
            action: 'drawImageOnCanvas',
            imageData,
            zoomScale,
            pointerX,
            pointerY,
          });
        }
      });
    }
  }

  pushImageToSet(image, index, orientation) {
    if (orientation === ORIENTATIONS.X) {
      this.imagesX[index] = image;
    } else {
      this.imagesY[index] = image;
    }
  }

  calculatePercentage() {
    const totalAmount = this.amountX + this.amountY;
    const totalLoadedImages = this.imagesX.length + this.imagesY.length;
    return Math.round((totalLoadedImages / totalAmount) * 100);
  }

  onImageLoad(image, index, orientation) {
    this.pushImageToSet(image, index, orientation);
    this.updatePercentageInLoader(this.calculatePercentage());
  }

  onFirstImageLoaded(event, imageData) {
    this.createContainers(event);

    this.adaptCanvasSize(imageData);
    this.drawImageOnCanvas(imageData);
  }

  onAllImagesLoaded() {
    this.addAllIcons();

    this.isReady = true;
    this.amountX = this.imagesX.length;
    this.amountY = this.imagesY.length;
    this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0;

    if (this.hotspots) {
      this.hotspotsInstance = new Hotspot(this.hotspots, this.innerBox, this.imageAspectRatio, {
        trigger: this.hotspotTrigger,
        onOpen: onHotspotOpen,
        onClose: onHotspotClose,
        onProductClick,
      });
      // Show dots for the initial frame immediately
      this.hotspotsInstance.updateHotspotPosition(this.activeImageX, this.orientation);
      this.addHotspotTimeline();
      // Show timeline by default (unless autoplay is active - it will be hidden below)
      this.showHotspotTimeline();
    }

    this.emit('onLoad', { imagesX: this.imagesX.length, imagesY: this.imagesY.length });
    this.emit('onReady');
    this.announce('360 degree view loaded. Use mouse drag or arrow keys to rotate.');

    // Create and show hints overlay if enabled and not autoplaying
    if (this.hints !== false && !this.autoplay) {
      const hintsToShow = this.hints === true || this.hints === undefined
        ? getHintsForConfig(this.viewerConfig, this.touchDevice)
        : this.hints;

      if (hintsToShow && hintsToShow.length > 0) {
        this.hintsOverlay = createHintsOverlay(this.innerBox, hintsToShow, {
          pointerZoomTrigger: this.pointerZoomTrigger,
        });
        showHintsOverlay(this.hintsOverlay);
      }
    }

    if (this.autoplay) {
      this.hideAllIcons();
      const delayedPlay = delay(this.play.bind(this));

      delayedPlay();
    }
  }

  magnify(event) {
    event.stopPropagation();
    const { src } =
      this.orientation === ORIENTATIONS.Y ? this.imagesY[this.activeImageY] : this.imagesX[this.activeImageX];
    const width = (this.fullscreenView ? document.body : this.container).offsetWidth;
    const imageWidth = width * this.magnifier;
    const highPreviewCdnUrl = generateHighPreviewCdnUrl(src, imageWidth);

    this.showLoadingSpinner();
    this.createGlass();

    const onLoadImage = (image) => {
      this.hideLoadingSpinner();
      this.magnified = true;
      magnify(event, this.innerBox, this.offset, image, this.glass, this.magnifier);
    };

    const onErrorImage = (error) => {
      this.hideLoadingSpinner();
      this.removeGlass();
      this.emit('onError', {
        error: { message: error.message, url: error.url },
        errorCount: 1,
        totalImages: 1,
        errors: [{ message: error.message, url: error.url }],
      });
    };

    loadImage(highPreviewCdnUrl, onLoadImage, onErrorImage);
  }

  openFullscreenModal(event) {
    event.stopPropagation();

    // Close any open hotspot popups before entering fullscreen
    this.hideHotspotPopper();

    // Release memory from the original viewer to prevent doubling memory usage
    // This is especially important on mobile devices with limited memory
    this.releaseMemory();

    window.document.body.style.overflow = 'hidden';
    const fullscreenContainer = createFullscreenModal(this.container);

    this.fullscreenInstance = new CI360Viewer(fullscreenContainer, this.viewerConfig, true);
    // Store reference to original viewer so fullscreen can call back
    this.fullscreenInstance.originalViewer = this;

    // Add resize listener to close fullscreen on window resize (e.g., device rotation)
    this.boundResizeHandler = () => {
      if (this.fullscreenInstance) {
        this.closeFullscreenModal(new Event('resize'));
      }
    };
    window.addEventListener('resize', this.boundResizeHandler);

    this.emit('onFullscreenOpen');
    this.announce('Opened fullscreen mode. Press Escape to exit.');
  }

  closeFullscreenModal(event) {
    event.stopPropagation();

    // Get reference to original viewer (if this is the fullscreen instance)
    const originalViewer = this.originalViewer || this;
    const fullscreenInstance = this.fullscreenView ? this : originalViewer.fullscreenInstance;

    // Remove resize listener
    if (originalViewer.boundResizeHandler) {
      window.removeEventListener('resize', originalViewer.boundResizeHandler);
      originalViewer.boundResizeHandler = null;
    }

    // Close any open hotspot popups and destroy the fullscreen instance
    if (fullscreenInstance) {
      fullscreenInstance.hideHotspotPopper();

      // Remove fullscreen modal from DOM
      const fullscreenModal = fullscreenInstance.container.parentNode;
      if (fullscreenModal && fullscreenModal.parentNode) {
        fullscreenModal.parentNode.removeChild(fullscreenModal);
      }

      fullscreenInstance.destroy();
      if (originalViewer.fullscreenInstance) {
        originalViewer.fullscreenInstance = null;
      }
    }

    window.document.body.style.overflow = 'visible';

    // Reload images for the original viewer
    originalViewer.reloadImages();

    originalViewer.emit('onFullscreenClose');
    originalViewer.announce('Exited fullscreen mode');
  }

  play() {
    if (this.isClicked) return;
    this.hide360ViewCircleIcon();
    this.emit('onAutoplayStart');

    const autoplaySpeed = (this.speed * 36) / (this.amountX + this.amountY);
    const loopTriggers = {
      left: this.moveLeft.bind(this),
      right: this.moveRight.bind(this),
      top: this.moveTop.bind(this),
      bottom: this.moveBottom.bind(this),
    };

    this.loopTimeoutId = window.setInterval(() => {
      const completedOneCycle =
        this.playOnce &&
        isCompletedOneCycle({
          autoplayBehavior: this.autoplayBehavior,
          activeImageX: this.activeImageX,
          activeImageY: this.activeImageY,
          amountX: this.amountX,
          amountY: this.amountY,
          autoplayReverse: this.autoplayReverse,
        });

      if (completedOneCycle) {
        this.stopAutoplay();
        return;
      }

      const shouldSwitch = shouldSwitchSpinDirection({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse,
        spinDirection: this.spinDirection,
      });

      if (shouldSwitch) {
        this.spinDirection = switchSpinDirection(this.spinDirection);
      }

      const spinY = this.spinDirection === 'y';

      loop({
        autoplayBehavior: this.autoplayBehavior,
        spinY,
        reversed: this.autoplayReverse,
        loopTriggers,
      });
    }, autoplaySpeed);
  }

  stopAutoplay() {
    this.showAllIcons();
    this.autoplay = false;

    window.clearTimeout(this.loopTimeoutId);
    this.loopTimeoutId = null;
    this.emit('onAutoplayStop');

    // Show hints after autoplay stops (if hints are enabled and not created yet)
    if (this.hints !== false && !this.hintsOverlay && !this.hintsHidden) {
      const hintsToShow = this.hints === true
        ? getHintsForConfig(this.viewerConfig, this.touchDevice)
        : this.hints;

      if (hintsToShow && hintsToShow.length > 0) {
        this.hintsOverlay = createHintsOverlay(this.innerBox, hintsToShow, {
          pointerZoomTrigger: this.pointerZoomTrigger,
        });
        showHintsOverlay(this.hintsOverlay);
      }
    }
  }

  destroy() {
    this.stopAutoplay();

    // Cancel any pending inertia animation
    if (this.inertiaAnimationId) {
      cancelAnimationFrame(this.inertiaAnimationId);
      this.inertiaAnimationId = null;
    }

    // Remove all event listeners
    this.removeEvents();

    // Close all ImageBitmap objects to free GPU memory
    this.closeImageBitmaps(this.imagesX);
    this.closeImageBitmaps(this.imagesY);
    this.imagesX = [];
    this.imagesY = [];

    // Terminate the canvas worker
    if (this.canvasWorker) {
      this.canvasWorker.terminate();
      this.canvasWorker = null;
    }

    // Destroy hotspots
    if (this.hotspotsInstance) this.hotspotsInstance.destroy();

    // Remove hints overlay if exists
    if (this.hintsOverlay && this.hintsOverlay.parentNode) {
      this.hintsOverlay.parentNode.removeChild(this.hintsOverlay);
      this.hintsOverlay = null;
    }

    // Remove hotspot timeline if exists
    if (this.hotspotTimeline && this.hotspotTimeline.parentNode) {
      this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline);
      this.hotspotTimeline = null;
      this.hotspotTimelineIndicator = null;
    }
    if (this.innerBox) {
      this.innerBox.classList.remove('has-hotspot-timeline');
    }

    // Remove theme and marker theme classes, clear container contents
    if (this.container) {
      this.container.classList.remove('ci360-theme-dark', 'ci360-hotspot-marker-inverted', 'ci360-hotspot-marker-brand');
      this.container.style.removeProperty('--ci360-hotspot-brand-color');
      // Clear the container contents instead of replacing the element
      // This preserves React refs and other framework bindings
      this.container.innerHTML = '';
    }
  }

  /**
   * Release memory by closing ImageBitmap objects without destroying the viewer.
   * Useful for freeing memory when the viewer scrolls off-screen on mobile.
   * Call reloadImages() to restore the images when the viewer becomes visible again.
   */
  releaseMemory() {
    this.stopAutoplay();

    // Close all ImageBitmap objects to free GPU memory
    this.closeImageBitmaps(this.imagesX);
    this.closeImageBitmaps(this.imagesY);
    this.imagesX = [];
    this.imagesY = [];
    this.isMemoryReleased = true;
  }

  /**
   * Reload images after memory was released.
   * Call this when the viewer becomes visible again after releaseMemory() was called.
   */
  reloadImages() {
    if (!this.isMemoryReleased) return;

    this.isMemoryReleased = false;
    const width = this.container.offsetWidth;

    // Reload images using the existing configuration
    this.loadHigherQualityImages(width, () => {
      this.updateView();
    });
  }

  addInitialIcon() {
    if (this.initialIcon || this.hide360Logo) return;

    this.initialIcon = createInitialIcon(this.logoSrc);
    this.innerBox.appendChild(this.initialIcon);
  }

  showInitialIcon() {
    if (!this.initialIcon || this.hasInteracted) return;

    this.initialIcon.style.opacity = 1;
  }

  hideInitialIcon() {
    if (!this.initialIcon) return;

    this.initialIcon.style.opacity = 0;
  }

  createGlass() {
    this.hideAllIcons();
    this.glass = document.createElement('div');
    this.innerBox.appendChild(this.glass);
    this.innerBox.style.cursor = 'default';
  }

  removeGlass() {
    this.showAllIcons();
    this.innerBox.removeChild(this.glass);
    this.glass = null;
    this.magnified = false;
  }

  addMagnifierIcon() {
    // Use pointerZoom for the magnifier/zoom-in button
    if (!this.pointerZoom) return;

    // Create zoom-in icon (magnifier with plus)
    this.magnifierIcon = createMagnifierIcon();
    this.magnifierIcon.onclick = this.zoomIn.bind(this);
    this.iconsContainer.appendChild(this.magnifierIcon);

    // Create zoom-out icon in the same position (initially hidden)
    this.zoomOutIcon = createZoomOutIcon();
    this.zoomOutIcon.onclick = this.zoomOut.bind(this);
    this.zoomOutIcon.style.display = 'none';
    this.iconsContainer.appendChild(this.zoomOutIcon);
  }

  showMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.display = '';
    this.magnifierIcon.style.visibility = 'visible';
    this.magnifierIcon.style.opacity = 1;
  }

  hideMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.display = 'none';
    this.magnifierIcon.style.visibility = 'hidden';
    this.magnifierIcon.style.opacity = 0;
  }

  showZoomOutIcon() {
    if (!this.zoomOutIcon) return;

    this.zoomOutIcon.style.display = '';
    this.zoomOutIcon.style.visibility = 'visible';
    this.zoomOutIcon.style.opacity = 1;
  }

  hideZoomOutIcon() {
    if (!this.zoomOutIcon) return;

    this.zoomOutIcon.style.display = 'none';
    this.zoomOutIcon.style.visibility = 'hidden';
    this.zoomOutIcon.style.opacity = 0;
  }

  addFullscreenIcon() {
    if (!this.fullscreen) return;

    this.fullscreenIcon = createFullscreenIcon();
    this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this);

    this.iconsContainer.appendChild(this.fullscreenIcon);
  }

  addCloseFullscreenIcon() {
    this.fullscreenCloseIcon = createCloseIcon();
    this.fullscreenCloseIcon.onclick = this.closeFullscreenModal.bind(this);

    this.iconsContainer.appendChild(this.fullscreenCloseIcon);
  }

  showFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.opacity = 1;
  }

  hideFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.opacity = 0;
  }

  add360ViewCircleIcon() {
    if (this.view360CircleIcon) return;

    this.view360CircleIcon = create360ViewCircleIcon(this.bottomCircleOffset);
    this.innerBox.appendChild(this.view360CircleIcon);
  }

  show360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = 1;
  }

  hide360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = 0;
  }

  addLoadingSpinner() {
    this.loadingSpinner = createLoadingSpinner();
    this.innerBox.appendChild(this.loadingSpinner);
  }

  showLoadingSpinner() {
    if (!this.loadingSpinner) return;

    this.hideAllIcons();
    this.loadingSpinner.style.opacity = 1;
  }

  createTransitionOverlay() {
    this.transitionOverlay = createTransitionOverlay();
    this.innerBox.appendChild(this.transitionOverlay);
  }

  showTransitionOverlay() {
    if (!this.transitionOverlay) return;

    this.hideAllIcons();
    this.transitionOverlay.style.opacity = 1;
  }

  hideTransitionOverlay() {
    if (!this.transitionOverlay) return;

    this.transitionOverlay.style.opacity = 0;
  }

  hideLoadingSpinner() {
    if (!this.loadingSpinner) return;

    this.loadingSpinner.style.opacity = 0;
  }

  hideHints() {
    if (!this.hintsOverlay || this.hintsHidden) return;

    this.hintsHidden = true;
    hideHintsOverlay(this.hintsOverlay);
  }

  addHotspotTimeline() {
    if (!this.hotspots || this.hotspotTimeline) return;

    // Append to innerBox so it overlays the bottom of the image
    const timelineData = createHotspotTimeline(this.innerBox, this.amountX, this.hotspots);
    if (!timelineData) return;

    this.hotspotTimeline = timelineData.element;
    this.hotspotTimelineIndicator = timelineData.indicator;
    this.innerBox.classList.add('has-hotspot-timeline');

    // Add click handlers to dots
    const dots = this.hotspotTimeline.querySelectorAll('.cloudimage-360-hotspot-timeline-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', (event) => {
        event.stopPropagation();
        // Hide icons and hints on timeline interaction
        this.hideAllIcons();
        this.hideHints();
        const targetFrame = parseInt(dot.getAttribute('data-frame'), 10);
        const hotspotId = dot.getAttribute('data-hotspot-id');
        if (!isNaN(targetFrame)) {
          this.animateToFrame(targetFrame, hotspotId);
        }
      });
    });

    // Update initial indicator position
    this.updateHotspotTimelinePosition();
  }

  showHotspotTimeline() {
    showHotspotTimeline(this.hotspotTimeline);
  }

  hideHotspotTimeline() {
    hideHotspotTimeline(this.hotspotTimeline);
  }

  updateHotspotTimelinePosition() {
    updateTimelineIndicator(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
  }

  /**
   * Animates the viewer to a target frame, optionally showing a hotspot popup on arrival
   * @param {number} targetFrame - The frame to animate to
   * @param {string} [hotspotId] - Optional hotspot ID to show popup for after animation
   */
  animateToFrame(targetFrame, hotspotId) {
    // Close any existing hotspot popup before navigating
    if (this.hotspotsInstance) {
      this.hotspotsInstance.hidePopper();
    }

    if (this.isAnimatingToFrame || targetFrame === this.activeImageX) {
      // If already at the target frame, just show the hotspot if requested
      if (targetFrame === this.activeImageX && hotspotId && this.hotspotsInstance && this.hotspotTimelineOnClick) {
        this.hotspotsInstance.showHotspotById(hotspotId);
      }
      return;
    }

    this.isAnimatingToFrame = true;
    this.hasInteracted = true;

    // Stop autoplay if running
    if (this.autoplay || this.loopTimeoutId) {
      this.stopAutoplay();
      this.autoplay = false;
    }

    // Cancel any running inertia
    if (this.inertiaAnimationId) {
      cancelAnimationFrame(this.inertiaAnimationId);
      this.inertiaAnimationId = null;
    }

    // Calculate shortest path (forward vs backward with wrap)
    const currentFrame = this.activeImageX;
    const forwardDistance = (targetFrame - currentFrame + this.amountX) % this.amountX;
    const backwardDistance = (currentFrame - targetFrame + this.amountX) % this.amountX;

    const goForward = forwardDistance <= backwardDistance;
    const totalSteps = goForward ? forwardDistance : backwardDistance;

    if (totalSteps === 0) {
      this.isAnimatingToFrame = false;
      return;
    }

    const frameDelay = 30; // ~30ms per frame for smooth animation
    let stepsRemaining = totalSteps;

    const animateStep = () => {
      if (stepsRemaining <= 0) {
        this.isAnimatingToFrame = false;
        // Show hotspot popup after animation completes if configured
        if (hotspotId && this.hotspotsInstance && this.hotspotTimelineOnClick) {
          // Small delay to ensure hotspot position is updated
          setTimeout(() => {
            this.hotspotsInstance.showHotspotById(hotspotId);
          }, 50);
        }
        return;
      }

      if (goForward) {
        this.moveRight();
      } else {
        this.moveLeft();
      }

      stepsRemaining--;

      if (stepsRemaining > 0) {
        setTimeout(animateStep, frameDelay);
      } else {
        this.isAnimatingToFrame = false;
        // Show hotspot popup after animation completes if configured
        if (hotspotId && this.hotspotsInstance && this.hotspotTimelineOnClick) {
          setTimeout(() => {
            this.hotspotsInstance.showHotspotById(hotspotId);
          }, 50);
        }
      }
    };

    animateStep();
  }

  remove360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.innerBox.removeChild(this.view360CircleIcon);
    this.view360CircleIcon = null;
  }

  addAllIcons() {
    this.removeLoader();

    // If iconsContainer doesn't exist (e.g., all images failed to load), skip adding icons
    if (!this.iconsContainer) return;

    this.innerBox.style.cursor = 'grab';

    if (this.pointerZoom) {
      this.createTransitionOverlay();
      this.addLoadingSpinner();
    }

    if (!this.fullscreenView && !this.touchDevice) this.addMagnifierIcon();
    if (!this.fullscreenView) this.addFullscreenIcon();
    if (this.initialIconShown) this.addInitialIcon();
    if (this.bottomCircle) this.add360ViewCircleIcon();
  }

  showAllIcons() {
    this.showInitialIcon();
    this.show360ViewCircleIcon();
    this.showMagnifierIcon();
    this.showFullscreenIcon();
    this.showHotspotTimeline();
  }

  hideAllIcons() {
    this.hideInitialIcon();
    this.hide360ViewCircleIcon();
    this.hideMagnifierIcon();
    this.hideZoomOutIcon();
    this.hideFullscreenIcon();
    // Don't hide timeline - it should always remain visible
  }

  removeLoader() {
    if (!this.loader) return;

    this.innerBox.removeChild(this.loader);
    this.loader = null;
  }
  attachEvents(draggable, swipeable, keys) {
    if (draggable) {
      this.addMouseEvents();
    }

    if (swipeable) {
      this.addTouchEvents();
    }

    if (keys) {
      this.addKeyboardEvents();
    }

    this.addEscKeyHandler();
  }

  removeEvents() {
    this.removeMouseEvents();
    this.removeTouchEvents();
    this.removeKeyboardEvents();
    this.removeEscKeyHandler();
  }

  addMouseEvents() {
    this.boundMouseClick = this.mouseClick.bind(this);
    this.boundMouseDblClick = this.mouseDblClick.bind(this);
    this.boundMouseDown = this.mouseDown.bind(this);
    this.boundMouseMove = throttle(this.mouseMove.bind(this), THROTTLE_TIME);
    this.boundMouseUp = this.mouseUp.bind(this);
    this.boundMouseLeave = this.mouseLeave.bind(this);

    this.innerBox.addEventListener('click', this.boundMouseClick);
    this.innerBox.addEventListener('dblclick', this.boundMouseDblClick);
    this.innerBox.addEventListener('mousedown', this.boundMouseDown);
    this.innerBox.addEventListener('mouseleave', this.boundMouseLeave);
    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mouseup', this.boundMouseUp);
  }

  addTouchEvents() {
    this.boundTouchOutside = this.touchOutside.bind(this);
    this.boundTouchStart = this.touchStart.bind(this);
    this.boundTouchEnd = this.touchEnd.bind(this);
    this.boundTouchMove = throttle(this.touchMove.bind(this), THROTTLE_TIME);

    document.addEventListener('touchstart', this.boundTouchOutside);
    this.container.addEventListener('touchstart', this.boundTouchStart);
    this.container.addEventListener('touchend', this.boundTouchEnd);
    this.container.addEventListener('touchmove', this.boundTouchMove);
  }

  addKeyboardEvents() {
    this.boundKeyDown = this.keyDown.bind(this);
    this.boundKeyUp = this.keyUp.bind(this);

    document.addEventListener('keydown', this.boundKeyDown);
    document.addEventListener('keyup', this.boundKeyUp);
  }

  addEscKeyHandler() {
    this.boundEscHandler = (event) => {
      if (event.keyCode !== 27) return;

      if (this.fullscreenView) {
        this.closeFullscreenModal(event);
      } else if (this.isZoomed) {
        this.removeZoom();
      } else if (this.glass) {
        this.removeGlass();
      }
    };

    document.addEventListener('keydown', this.boundEscHandler);
  }

  removeEscKeyHandler() {
    document.removeEventListener('keydown', this.boundEscHandler);
  }

  removeMouseEvents() {
    this.innerBox.removeEventListener('click', this.boundMouseClick);
    this.innerBox.removeEventListener('dblclick', this.boundMouseDblClick);
    this.innerBox.removeEventListener('mousedown', this.boundMouseDown);
    this.innerBox.removeEventListener('mouseleave', this.boundMouseLeave);
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup', this.boundMouseUp);
  }

  removeTouchEvents() {
    document.removeEventListener('touchstart', this.boundTouchOutside);
    this.container.removeEventListener('touchstart', this.boundTouchStart);
    this.container.removeEventListener('touchend', this.boundTouchEnd);
    this.container.removeEventListener('touchmove', this.boundTouchMove);
  }

  removeKeyboardEvents() {
    document.removeEventListener('keydown', this.boundKeyDown);
    document.removeEventListener('keyup', this.boundKeyUp);
  }

  createContainers(event) {
    this.iconsContainer = createIconsContainer(this.innerBox);
    this.canvas = createCanvas(this.innerBox, event);
    this.loader = createLoader(this.innerBox);
    this.ariaLiveRegion = createAriaLiveRegion(this.innerBox);

    if (this.useMainThreadCanvas) {
      // Main-thread canvas - pass the canvas element directly
      this.canvasWorker.postMessage({
        action: 'initCanvas',
        offscreen: this.canvas,
        devicePixelRatio: this.devicePixelRatio,
      });
    } else {
      // Worker-based rendering with OffscreenCanvas
      const offscreenCanvas = this.canvas.transferControlToOffscreen();
      this.canvasWorker.postMessage(
        {
          action: 'initCanvas',
          offscreen: offscreenCanvas,
          devicePixelRatio: this.devicePixelRatio,
        },
        [offscreenCanvas]
      );
    }

    if (this.fullscreenView) this.addCloseFullscreenIcon();

    removeElementFromContainer(this.innerBox, '.cloudimage-360-placeholder');
  }

  update(newConfig) {
    if (!this.isReady) return;

    this.stopAutoplay();
    removeElementFromContainer(this.innerBox, '.cloudimage-360-icons-container');
    this.init(this.container, newConfig, true);
    this.iconsContainer = createIconsContainer(this.innerBox);
    this.onAllImagesLoaded();
  }

  init(container, config, update) {
    const adaptedConfig = config ? adaptConfig(config) : getConfigFromImage(container);

    const {
      folder,
      apiVersion,
      filenameX,
      filenameY,
      imageListX,
      imageListY,
      indexZeroBase,
      amountX,
      amountY,
      draggable = true,
      swipeable = true,
      keys,
      keysReverse,
      bottomCircleOffset,
      autoplay,
      autoplayBehavior,
      playOnce,
      speed,
      autoplayReverse,
      fullscreen,
      magnifier,
      ciToken,
      ciFilters,
      ciTransformation,
      lazyload,
      dragSpeed,
      stopAtEdges,
      pointerZoom,
      pointerZoomTrigger = 'dblclick',
      imageInfo = 'black',
      initialIconShown,
      bottomCircle,
      hotspots,
      hotspotTrigger = 'hover',
      dragReverse,
      hide360Logo,
      logoSrc,
      inertia,
      pinchZoom,
      hints,
      theme,
      markerTheme,
      brandColor,
      hotspotTimelineOnClick = true,
      aspectRatio,
      // Event callbacks
      onReady,
      onLoad,
      onSpin,
      onAutoplayStart,
      onAutoplayStop,
      onFullscreenOpen,
      onFullscreenClose,
      onZoomIn,
      onZoomOut,
      onDragStart,
      onDragEnd,
      onHotspotOpen,
      onHotspotClose,
      onProductClick,
      onError,
    } = adaptedConfig;

    const ciParams = { ciToken, ciFilters, ciTransformation };
    const parsedImagesListX = safeJsonParse(imageListX, []);
    const parsedImagesListY = safeJsonParse(imageListY, []);

    this.viewerConfig = adaptedConfig;
    this.amountX = parsedImagesListX.length || amountX;
    this.amountY = parsedImagesListY.length || amountY;
    this.allowSpinX = !!this.amountX;
    this.allowSpinY = !!this.amountY;
    this.activeImageX = autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = autoplayReverse ? this.amountY - 1 : 0;
    this.bottomCircleOffset = bottomCircleOffset;
    this.autoplay = autoplay;
    this.autoplayBehavior = autoplayBehavior;
    this.playOnce = playOnce;
    this.speed = speed;
    this.autoplayReverse = autoplayReverse;
    this.fullscreen = fullscreen;
    this.magnifier = magnifier > 1 ? Math.min(magnifier, MAX_MAGNIFIER_LEVEL) : 0;
    this.dragSpeed = Math.max(dragSpeed, MIN_DRAG_SPEED);
    this.stopAtEdges = stopAtEdges;
    this.ciParams = ciParams;
    this.apiVersion = apiVersion;
    this.pointerZoom = pointerZoom > 1 ? Math.min(pointerZoom, MAX_POINTER_ZOOM) : null;
    this.pointerZoomTrigger = pointerZoomTrigger;
    this.keysReverse = keysReverse;
    this.info = imageInfo;
    this.keys = keys;
    this.innerBox = this.innerBox ?? createInnerBox(this.container);

    // Apply or clear aspect ratio on container
    this.container.style.aspectRatio = aspectRatio || '';

    this.initialIconShown = initialIconShown;
    this.bottomCircle = bottomCircle;
    this.spinDirection = getDefaultSpinDirection(this.autoplayBehavior, this.allowSpinX, this.allowSpinY);
    this.dragReverse = dragReverse;
    this.hotspots = hotspots;
    this.hotspotTrigger = hotspotTrigger;
    this.hide360Logo = hide360Logo;
    this.logoSrc = logoSrc;
    this.inertia = inertia;
    this.pinchZoom = pinchZoom;
    this.hints = hints;
    this.hotspotTimelineOnClick = hotspotTimelineOnClick;

    // Apply theme class to container
    if (theme === 'dark') {
      this.container.classList.add('ci360-theme-dark');
    } else if (theme === 'light') {
      this.container.classList.remove('ci360-theme-dark');
    }

    // Apply marker theme class
    this.container.classList.remove('ci360-hotspot-marker-inverted', 'ci360-hotspot-marker-brand');
    if (markerTheme === 'inverted') {
      this.container.classList.add('ci360-hotspot-marker-inverted');
    } else if (markerTheme === 'brand') {
      this.container.classList.add('ci360-hotspot-marker-brand');
      if (brandColor) {
        this.container.style.setProperty('--ci360-hotspot-brand-color', brandColor);
      }
    }

    // Event callbacks
    this.onReady = onReady;
    this.onLoad = onLoad;
    this.onSpin = onSpin;
    this.onAutoplayStart = onAutoplayStart;
    this.onAutoplayStop = onAutoplayStop;
    this.onFullscreenOpen = onFullscreenOpen;
    this.onFullscreenClose = onFullscreenClose;
    this.onZoomIn = onZoomIn;
    this.onZoomOut = onZoomOut;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;
    this.onError = onError;

    this.srcXConfig = {
      folder,
      filename: filenameX,
      imageList: parsedImagesListX,
      container,
      innerBox: this.innerBox,
      apiVersion,
      ciParams,
      lazyload,
      amount: this.amountX,
      indexZeroBase,
      autoplayReverse,
      orientation: ORIENTATIONS.X,
    };

    this.srcYConfig = {
      ...this.srcXConfig,
      filename: filenameY,
      imageList: parsedImagesListY,
      orientation: ORIENTATIONS.Y,
      amount: this.amountY,
    };

    if (update) this.removeEvents();
    this.attachEvents(draggable, swipeable, keys);

    if (update) return;

    const width = (this.fullscreenView ? document.body : this.container).offsetWidth;
    const cdnPathX =
      this.allowSpinX && !parsedImagesListX.length ? generateCdnPath(this.srcXConfig, width) : null;
    const cdnPathY =
      this.allowSpinY && !parsedImagesListY.length ? generateCdnPath(this.srcYConfig, width) : null;

    const loadCallback = (event) => {
      preloadImages({
        cdnPathX,
        cdnPathY,
        configX: this.srcXConfig,
        configY: this.srcYConfig,
        onImageLoad: (image, index, orientation) => this.onImageLoad(image, index, orientation),
        onFirstImageLoad: (imageData) => this.onFirstImageLoaded(event, imageData),
        onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        onError: (errorInfo) => this.emit('onError', errorInfo),
      });
    };

    if (this.allowSpinX) {
      initLazyload(cdnPathX, this.srcXConfig, loadCallback);
    } else if (this.allowSpinY) {
      initLazyload(cdnPathY, this.srcYConfig, loadCallback);
    }
  }
}

export default CI360Viewer;
