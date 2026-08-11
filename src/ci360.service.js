import throttle from 'lodash.throttle';

import { adaptConfig, getConfigFromImage } from './ci360.utils';
import './static/css/style.css';
import './static/css/hotspots.css';
import {
  generateCdnPath,
  preloadImages,
  preloadGridImages,
  createFullscreenIcon,
  createLoader,
  createInnerBox,
  createIconsContainer,
  createCanvas,
  create360ViewCircleIcon,
  isCompletedOneCycle,
  getMovingDirection,
  loop,
  initLazyload,
  createInitialIcon,
  createClickOverlay,
  removeElementFromContainer,
  delay,
  shouldSwitchSpinDirection,
  switchSpinDirection,
  ORIENTATIONS,
  THROTTLE_TIME,
  DRAG_START_DELAY,
  DRAG_SPEED_DIVISOR,
  MIN_DRAG_SPEED,
  PAN_STEP_KEYBOARD,
  getDefaultSpinDirection,
  isSpinKeysPressed,
  createLoadingSpinner,
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
import getFirstCdnImage from './utils/load-images/lazyload/prepare-first-image/get-first-cdn-image';
import { setFullscreenIconState } from './utils/container-elements/create-fullscreen-icon';
import { isFullscreenEnabled, getFullscreenElement, requestFullscreen, exitFullscreen } from './utils/fullscreen';
import { ZoomPan } from './utils/zoom/zoom-pan';
import { GestureRecognizer } from './utils/zoom/gestures';
import { createZoomControls } from './utils/zoom/controls';
import { createScrollHint } from './utils/zoom/scroll-hint';

import CanvasWorker from './canvas.worker.js?worker&inline';
import MainThreadCanvasRenderer from './canvas-renderer';
import Hotspot from './hotspots';

// Detect mobile for using main-thread canvas instead of OffscreenCanvas worker
// OffscreenCanvas has known memory issues on mobile Safari
const USE_MAIN_THREAD_CANVAS = typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

class CI360Viewer {
  constructor(container, config) {
    this.container = container;
    this.isClicked = false;
    this.imagesX = [];
    this.imagesY = [];
    this.imagesGrid = [];
    this.isGridMode = false;
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
    this.touchDevice = isTouchDevice();
    this.dragJustEnded = false;
    // Zoom modules (initialized in initZoom)
    this.zoomPan = null;
    this.gestureRecognizer = null;
    this.zoomControlsUI = null;
    this.scrollHintUI = null;
    this.highResLoaded = false;
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
    if (!this.isReady) return;

    // Don't handle mousedown on interactive elements - let them handle their own events
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot') ||
        target.closest('.cloudimage-360-zoom-controls');
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

    // If zoomed, delegate to ZoomPan for drag-to-pan
    if (this.isZoomed && this.zoomPan) {
      this.zoomPan.startPan(pageX, pageY);
      return;
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
    const dragFactor = this.dragSpeed / DRAG_SPEED_DIVISOR;
    const speedFactorX = dragFactor * (this.amountX / this.container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / this.container.offsetHeight);

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

    const dragFactor = this.dragSpeed / DRAG_SPEED_DIVISOR;

    const speedFactorX = dragFactor * (this.amountX / this.container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / this.container.offsetHeight);
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
    if (!this.isReady || !this.isClicked) return;

    // When zoomed, pan is handled by ZoomPan mouse listeners
    if (this.isZoomed) return;

    this.hideAllIcons();
    this.drag(event.pageX, event.pageY);
  }

  mouseClick() {
    // Click handler kept intentionally minimal.
    // Zoom is handled by ZoomPan's dblclick handler, not single click.
    // Reset transient flags so they don't leak to subsequent interactions.
    this.dragJustEnded = false;
    this.autoplayJustStopped = false;
  }

  loadHigherQualityImages(width, onLoad) {
    if (this.isGridMode) {
      const cdnPathGrid = generateCdnPath(this.srcGridConfig, width);
      preloadGridImages({
        cdnPath: cdnPathGrid,
        config: this.srcGridConfig,
        onAllImagesLoad: (loadedImages) => {
          this.closeImageBitmaps(this.imagesGrid);
          this.imagesGrid = loadedImages;
          onLoad();
        },
        onError: (errorInfo) => this.emit('onError', errorInfo),
      });
      return;
    }

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

  /**
   * Compute the actual image draw dimensions (CSS pixels) matching the renderer.
   * For wide images, drawWidth = containerWidth. For tall/portrait images,
   * drawWidth = containerHeight * imageAspectRatio (centered within the canvas).
   */
  getDrawDimensions() {
    if (!this.canvas || !this.imageAspectRatio) return null;
    const containerWidth = this.canvas.clientWidth;
    const containerHeight = containerWidth / this.imageAspectRatio;
    const containerAspectRatio = containerWidth / containerHeight;
    // This mirrors the renderer's wideImage logic
    if (this.imageAspectRatio > containerAspectRatio) {
      return { drawWidth: containerWidth, drawHeight: containerWidth / this.imageAspectRatio };
    }
    return { drawWidth: containerHeight * this.imageAspectRatio, drawHeight: containerHeight };
  }

  initZoom() {
    const zoomMax = this.zoomMax || 5;
    const zoomStep = this.zoomStep || 0.5;

    // Core zoom/pan manager
    this.zoomPan = new ZoomPan(this.innerBox, {
      zoomMax,
      zoomStep,
      onZoomChange: (zoom, panX, panY) => this.onZoomChange(zoom, panX, panY),
    });

    // Set draw size once canvas is ready (must match drawWidth/drawHeight in renderer)
    const dims = this.getDrawDimensions();
    if (dims) {
      this.zoomPan.setDrawSize(dims.drawWidth, dims.drawHeight);
    }

    // Touch gesture recognizer (mobile, if pinchZoom not disabled)
    if (this.touchDevice && this.pinchZoom !== false) {
      this.gestureRecognizer = new GestureRecognizer(this.innerBox, {
        zoomMax,
        getZoom: () => this.zoomPan ? this.zoomPan.getZoom() : 1,
        onPinchZoom: (newZoom, centerX, centerY) => {
          if (!this.zoomPan) return;
          if (centerX !== undefined) {
            this.zoomPan.zoomTowardPoint(newZoom, centerX, centerY);
          } else {
            this.zoomPan.applyTouchZoom(newZoom);
          }
        },
        onPan: (dx, dy) => {
          if (this.zoomPan) this.zoomPan.applyTouchPan(dx, dy);
        },
        onDoubleTap: (clientX, clientY) => {
          if (!this.zoomPan) return;
          if (this.zoomPan.isZoomed()) {
            this.zoomPan.resetZoom();
          } else {
            this.zoomPan.zoomTowardPoint(2, clientX, clientY);
          }
        },
      });
    }

    // Zoom UI controls
    if (this.zoomControls && !this.touchDevice) {
      this.zoomControlsUI = createZoomControls(this.innerBox, {
        position: this.zoomControlsPosition || 'bottom-left',
        zoomMax,
        onZoomIn: () => this.zoomPan && this.zoomPan.zoomIn(),
        onZoomOut: () => this.zoomPan && this.zoomPan.zoomOut(),
        onReset: () => this.zoomPan && this.zoomPan.resetZoom(),
      });
    }

    // Scroll hint toast (desktop only, non-touch)
    // Disabled: the hints overlay already provides interaction guidance
    // if (this.scrollHint && !this.touchDevice) {
    //   this.scrollHintUI = createScrollHint(this.innerBox);
    // }
  }

  onZoomChange(zoom, panX, panY) {
    // Cancel inertia when zoom changes
    if (this.inertiaAnimationId) {
      cancelAnimationFrame(this.inertiaAnimationId);
      this.inertiaAnimationId = null;
    }

    const wasZoomed = this.isZoomed;
    this.isZoomed = zoom > 1;

    // First zoom above 1x: load higher-quality images (once)
    if (this.isZoomed && !wasZoomed) {
      this.hideAllIcons();
      this.hideHotspots();
      if (this.zoomControlsUI) this.zoomControlsUI.show();

      if (!this.highResLoaded) {
        this.highResLoaded = true;
        const width = document.body.offsetWidth;
        this.loadHigherQualityImages(width, () => {
          // Use current zoom state (not stale closure values from when load started)
          if (this.zoomPan) {
            this.updateView(this.zoomPan.getZoom(), this.zoomPan.panX, this.zoomPan.panY);
          }
        });
      }

      this.emit('onZoomIn', { zoomLevel: zoom });
      this.announce('Zoomed in. Use mouse drag or arrow keys to pan. Double-click or press 0 to reset.');
    }

    // Back to 1x
    if (!this.isZoomed && wasZoomed) {
      this.showAllIcons();
      this.emit('onZoomOut');
      this.announce('Zoomed out');
    }

    // Update zoom control button states
    if (this.zoomControlsUI) {
      this.zoomControlsUI.updateState(zoom);
    }

    this.updateView(zoom, panX, panY);
  }

  removeZoom() {
    if (this.zoomPan) {
      this.zoomPan.resetZoom();
    }
  }

  toggleZoom() {
    if (!this.zoomPan) return;
    if (this.isZoomed) {
      this.zoomPan.resetZoom();
    } else {
      this.zoomPan.setZoom(2);
    }
  }

  touchStart(event) {
    if (!this.isReady || !event.touches || !event.touches.length) return;

    // Don't handle touch on interactive elements
    const target = event.target;
    if (target && target.closest) {
      const isInteractiveElement = target.closest('.cloudimage-360-button') ||
        target.closest('.cloudimage-360-hotspot-timeline') ||
        target.closest('.cloudimage-360-hotspot') ||
        target.closest('.cloudimage-360-zoom-controls');
      if (isInteractiveElement) return;
    }

    // Hide hints on first interaction
    this.hideHints();

    // Two-finger pinch and double-tap are handled by GestureRecognizer
    // We only handle single-finger rotation here when not zoomed
    if (event.touches.length > 1) {
      this.isClicked = false; // Cancel any ongoing single-finger drag
      return;
    }

    // If zoomed, single-finger pan is handled by GestureRecognizer
    if (this.isZoomed) return;

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

  touchEnd(event) {
    if (!this.isReady) return;

    if (!this.isZoomed) {
      this.showAllIcons();
    }

    // Start inertia animation if enabled and has velocity
    if (this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1)) {
      this.startInertia();
    }

    this.movementStart = { x: 0, y: 0 };
    this.isClicked = false;
    this.isDragging = false;
  }

  touchMove(event) {
    if (!this.isReady) return;

    // When zoomed, all touch handling is delegated to GestureRecognizer
    if (this.isZoomed) return;

    // Skip multi-touch (pinch handled by GestureRecognizer)
    if (event.touches && event.touches.length > 1) return;

    // Normal single-finger drag for rotation
    if (!this.isClicked || !event.touches || !event.touches[0]) return;
    const { pageX, pageY } = event.touches[0];
    if (event.cancelable) event.preventDefault();

    this.drag(pageX, pageY);
  }

  keyDown(event) {
    if (!this.isReady) return;

    // Don't intercept keyboard events in form elements
    const tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (event.target && event.target.isContentEditable)) return;

    const { keyCode } = event;
    const isReverse = this.keysReverse;

    if (this.autoplay) this.stopAutoplay();

    // Handle zoom keyboard shortcuts (+/-/0)
    if (this.zoomPan && this.zoomPan.handleKeyZoom(keyCode)) {
      event.preventDefault();
      this.hideHints();
      return;
    }

    // When zoomed, arrow keys pan instead of rotate
    if (this.isZoomed && this.zoomPan) {
      if (this.zoomPan.handleKeyPan(keyCode, PAN_STEP_KEYBOARD)) {
        event.preventDefault();
        return;
      }
    }

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
    if (!this.isGridMode) this.orientation = ORIENTATIONS.X;
    this.activeImageX = (this.activeImageX + itemsSkipped) % this.amountX;
  }

  moveActiveXIndexDown(itemsSkipped) {
    if (!this.isGridMode) this.orientation = ORIENTATIONS.X;
    this.activeImageX = (this.activeImageX - itemsSkipped + this.amountX) % this.amountX;
  }

  moveActiveYIndexUp(itemsSkipped) {
    if (!this.isGridMode) this.orientation = ORIENTATIONS.Y;
    this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY;
  }

  moveActiveYIndexDown(itemsSkipped) {
    if (!this.isGridMode) this.orientation = ORIENTATIONS.Y;
    this.activeImageY = (this.activeImageY - itemsSkipped + this.amountY) % this.amountY;
  }

  moveRight(stopAtEdges, itemsSkippedX = 1) {
    const maxX = this.isGridMode ? this.amountX - 1 : this.imagesX.length - 1;
    if (stopAtEdges && this.activeImageX >= maxX) return;

    this.moveActiveXIndexUp(itemsSkippedX);
    if (!this.isZoomed) this.updateView();
  }

  moveLeft(stopAtEdges, itemsSkippedX = 1) {
    if (stopAtEdges && this.activeImageX <= 0) return;

    this.moveActiveXIndexDown(itemsSkippedX);
    if (!this.isZoomed) this.updateView();
  }

  moveTop(stopAtEdges, itemsSkippedY = 1) {
    const maxY = this.isGridMode ? this.amountY - 1 : this.imagesY.length - 1;
    if (stopAtEdges && this.activeImageY >= maxY) return;

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
      this.moveRight(this.stopAtEdgesX, itemsSkippedX);
    } else if (movingDirection === 'left') {
      this.moveLeft(this.stopAtEdgesX, itemsSkippedX);
    } else if (movingDirection === 'up') {
      this.moveTop(this.stopAtEdgesY, itemsSkippedY);
    } else if (movingDirection === 'down') {
      this.moveBottom(this.stopAtEdgesY, itemsSkippedY);
    }

    this.emit('onSpin', {
      direction: movingDirection,
      activeImageX: this.activeImageX,
      activeImageY: this.activeImageY,
      amountX: this.amountX,
      amountY: this.amountY,
      isGridMode: this.isGridMode,
    });
  }

  updateView(zoomScale, offsetX, offsetY) {
    let imageData;

    if (this.isGridMode) {
      const flatIndex = this.activeImageY * this.amountX + this.activeImageX;
      imageData = this.imagesGrid[flatIndex];
    } else {
      imageData = this.orientation === ORIENTATIONS.X
        ? this.imagesX[this.activeImageX]
        : this.imagesY[this.activeImageY];
    }

    const activeIndex = this.isGridMode
      ? (this.activeImageY * this.amountX + this.activeImageX)
      : (this.orientation === ORIENTATIONS.X ? this.activeImageX : this.activeImageY);

    if (this.hotspotsInstance && !this.isZoomed && !this.autoplay) {
      this.hotspotsInstance.updateHotspotPosition(activeIndex, this.isGridMode ? 'grid' : this.orientation);
    }

    // Update timeline indicator position (X-axis based for timeline)
    if (this.hotspotTimelineIndicator && (this.isGridMode || this.orientation === ORIENTATIONS.X)) {
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

    const containerWidth = this.canvas.clientWidth;
    const containerHeight = containerWidth / this.imageAspectRatio;

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
    if (orientation === 'grid') {
      this.imagesGrid[index] = image;
    } else if (orientation === ORIENTATIONS.X) {
      this.imagesX[index] = image;
    } else {
      this.imagesY[index] = image;
    }
  }

  calculatePercentage() {
    if (this.isGridMode) {
      const totalAmount = this.amountX * this.amountY;
      const totalLoaded = this.imagesGrid.filter(Boolean).length;
      return Math.round((totalLoaded / totalAmount) * 100);
    }
    const totalAmount = this.amountX + this.amountY;
    const totalLoadedImages = this.imagesX.filter(Boolean).length + this.imagesY.filter(Boolean).length;
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

    // Watch for container resizes (e.g. dialog open animations, window resize)
    // and re-adapt canvas to prevent letterboxing from stale dimensions.
    this.setupResizeObserver();
  }

  setupResizeObserver() {
    if (this.resizeObserver || !this.container) return;

    let lastWidth = this.container.offsetWidth;
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const newWidth = Math.round(entry.contentRect.width);
      // Only re-adapt if width actually changed (height follows from aspect ratio)
      if (newWidth === lastWidth || newWidth === 0) return;
      lastWidth = newWidth;

      requestAnimationFrame(() => {
        let currentImage;
        if (this.isGridMode) {
          currentImage = this.imagesGrid[this.activeImageY * this.amountX + this.activeImageX];
        } else if (this.orientation === ORIENTATIONS.Y && this.imagesY.length > 0) {
          currentImage = this.imagesY[this.activeImageY];
        } else {
          currentImage = this.imagesX[this.activeImageX];
        }
        if (currentImage) {
          this.adaptCanvasSize(currentImage);

          if (this.zoomPan) {
            const dims = this.getDrawDimensions();
            if (dims) {
              this.zoomPan.setDrawSize(dims.drawWidth, dims.drawHeight, true);
            }
          }

          this.updateView();
        }
      });
    });
    this.resizeObserver.observe(this.container);
  }

  onAllImagesLoaded() {
    this.addAllIcons();

    this.isReady = true;
    if (!this.isGridMode) {
      this.amountX = this.imagesX.length;
      this.amountY = this.imagesY.length;
    }
    this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0;

    if (this.hotspots) {
      this.hotspotsInstance = new Hotspot(this.hotspots, this.innerBox, this.imageAspectRatio, {
        trigger: this.hotspotTrigger,
        onOpen: this.onHotspotOpen,
        onClose: this.onHotspotClose,
        onProductClick: this.onProductClick,
        onNavigate: this.onNavigate,
      });
      this.addHotspotTimeline();

      // Hide hotspots during autoplay — they'll be shown when autoplay stops
      if (this.autoplay) {
        this.hotspotsInstance.hideHotspots();
        this.hideHotspotTimeline();
      } else {
        const hotspotIndex = this.isGridMode
          ? (this.activeImageY * this.amountX + this.activeImageX)
          : this.activeImageX;
        const hotspotOrientation = this.isGridMode ? 'grid' : this.orientation;
        this.hotspotsInstance.updateHotspotPosition(hotspotIndex, hotspotOrientation);
        this.showHotspotTimeline();
      }
    }

    this.emit('onLoad', {
      imagesX: this.isGridMode ? this.amountX : this.imagesX.length,
      imagesY: this.isGridMode ? this.amountY : this.imagesY.length,
      ...(this.isGridMode && { imagesGrid: this.imagesGrid.filter(Boolean).length }),
    });
    this.emit('onReady');
    this.announce('360 degree view loaded. Use mouse drag or arrow keys to rotate.');

    // Create and show hints overlay if enabled and not autoplaying
    if (this.hints !== false && !this.autoplay) {
      const hintsToShow = this.hints === true || this.hints === undefined
        ? getHintsForConfig(this.viewerConfig, this.touchDevice)
        : this.hints;

      if (hintsToShow && hintsToShow.length > 0) {
        this.hintsOverlay = createHintsOverlay(this.innerBox, hintsToShow);
        showHintsOverlay(this.hintsOverlay);
      }
    }

    if (this.autoplay) {
      this.hideAllIcons();
      const delayedPlay = delay(this.play.bind(this));

      delayedPlay();
    }
  }

  toggleFullscreen(event) {
    event.stopPropagation();

    this.hideHotspotPopper();

    if (getFullscreenElement()) {
      exitFullscreen();
    } else {
      requestFullscreen(this.container);
    }
  }

  onFullscreenChange() {
    const isFullscreen = getFullscreenElement() === this.container;
    const wasFullscreen = this.container.classList.contains('cloudimage-360--fullscreen');

    if (isFullscreen === wasFullscreen) return;

    this.container.classList.toggle('cloudimage-360--fullscreen', isFullscreen);
    setFullscreenIconState(this.fullscreenIcon, isFullscreen);

    // Canvas resize is handled by the ResizeObserver (setupResizeObserver),
    // which fires automatically when the container dimensions change.

    if (isFullscreen) {
      this.emit('onFullscreenOpen');
      this.announce('Opened fullscreen mode. Press Escape to exit.');
    } else {
      this.emit('onFullscreenClose');
      this.announce('Exited fullscreen mode');
    }
  }

  play() {
    if (this.isClicked) return;
    this.hide360ViewCircleIcon();
    this.emit('onAutoplayStart');

    let autoplayFrameCount;
    if (this.isGridMode) {
      const behavior = this.autoplayBehavior;
      if (behavior === 'spin-x') autoplayFrameCount = this.amountX;
      else if (behavior === 'spin-y') autoplayFrameCount = this.amountY;
      else autoplayFrameCount = Math.max(this.amountX, this.amountY);
    } else {
      autoplayFrameCount = this.amountX + this.amountY;
    }
    const autoplaySpeed = (this.speed * 36) / autoplayFrameCount;
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
          isGridMode: this.isGridMode,
        });

      if (completedOneCycle) {
        this.stopAutoplay();
        return;
      }

      if (this.isGridMode) {
        this.gridAutoplayTick(loopTriggers);
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

  gridAutoplayTick(loopTriggers) {
    const reversed = this.autoplayReverse;
    const behavior = this.autoplayBehavior;

    if (behavior === 'spin-x') {
      if (reversed) { loopTriggers.left(); } else { loopTriggers.right(); }
      return;
    }

    if (behavior === 'spin-y') {
      if (reversed) { loopTriggers.bottom(); } else { loopTriggers.top(); }
      return;
    }

    // spin-xy: advance X each tick, when X wraps also advance Y (row-scan)
    // Manipulate indices directly to avoid double updateView() calls
    if (behavior === 'spin-xy') {
      const xEdge = reversed ? 0 : this.amountX - 1;
      const atXEdge = this.activeImageX === xEdge;

      if (reversed) {
        this.activeImageX = (this.activeImageX - 1 + this.amountX) % this.amountX;
      } else {
        this.activeImageX = (this.activeImageX + 1) % this.amountX;
      }

      if (atXEdge) {
        if (reversed) {
          this.activeImageY = (this.activeImageY - 1 + this.amountY) % this.amountY;
        } else {
          this.activeImageY = (this.activeImageY + 1) % this.amountY;
        }
      }

      if (!this.isZoomed) this.updateView();
      this.emit('onSpin', {
        direction: reversed ? 'left' : 'right',
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        isGridMode: true,
      });
      return;
    }

    // spin-yx: advance Y each tick, when Y wraps also advance X (column-scan)
    if (behavior === 'spin-yx') {
      const yEdge = reversed ? 0 : this.amountY - 1;
      const atYEdge = this.activeImageY === yEdge;

      if (reversed) {
        this.activeImageY = (this.activeImageY - 1 + this.amountY) % this.amountY;
      } else {
        this.activeImageY = (this.activeImageY + 1) % this.amountY;
      }

      if (atYEdge) {
        if (reversed) {
          this.activeImageX = (this.activeImageX - 1 + this.amountX) % this.amountX;
        } else {
          this.activeImageX = (this.activeImageX + 1) % this.amountX;
        }
      }

      if (!this.isZoomed) this.updateView();
      this.emit('onSpin', {
        direction: reversed ? 'down' : 'up',
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        isGridMode: true,
      });
    }
  }

  stopAutoplay() {
    this.showAllIcons();
    this.autoplay = false;

    window.clearInterval(this.loopTimeoutId);
    this.loopTimeoutId = null;
    this.emit('onAutoplayStop');

    // Show hotspots and timeline after autoplay stops
    if (this.hotspotsInstance) {
      const hotspotIndex = this.isGridMode
        ? (this.activeImageY * this.amountX + this.activeImageX)
        : this.activeImageX;
      const hotspotOrientation = this.isGridMode ? 'grid' : this.orientation;
      this.hotspotsInstance.updateHotspotPosition(hotspotIndex, hotspotOrientation);
      this.showHotspotTimeline();
    }

    // Show hints after autoplay stops (if hints are enabled and not created yet)
    if (this.hints !== false && !this.hintsOverlay && !this.hintsHidden) {
      const hintsToShow = this.hints === true
        ? getHintsForConfig(this.viewerConfig, this.touchDevice)
        : this.hints;

      if (hintsToShow && hintsToShow.length > 0) {
        this.hintsOverlay = createHintsOverlay(this.innerBox, hintsToShow);
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

    // Clean up initOnClick overlay if still pending
    if (this.clickOverlay) {
      this.clickOverlay.removeEventListener('click', this.clickOverlayHandler);
      this.clickOverlay = null;
      this.clickOverlayHandler = null;
    }

    // Remove all event listeners
    this.removeEvents();

    // Destroy zoom modules
    if (this.zoomPan) { this.zoomPan.destroy(); this.zoomPan = null; }
    if (this.gestureRecognizer) { this.gestureRecognizer.destroy(); this.gestureRecognizer = null; }
    if (this.zoomControlsUI) { this.zoomControlsUI.destroy(); this.zoomControlsUI = null; }
    if (this.scrollHintUI) { this.scrollHintUI.destroy(); this.scrollHintUI = null; }

    // Close all ImageBitmap objects to free GPU memory
    this.closeImageBitmaps(this.imagesX);
    this.closeImageBitmaps(this.imagesY);
    this.closeImageBitmaps(this.imagesGrid);
    this.imagesX = [];
    this.imagesY = [];
    this.imagesGrid = [];
    this.isGridMode = false;
    this.isReady = false;

    // Disconnect container resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

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

    // Exit fullscreen if active and clean up fullscreen class
    if (getFullscreenElement() === this.container) {
      exitFullscreen();
    }

    // Remove theme and marker theme classes, clear container contents
    if (this.container) {
      this.container.classList.remove('ci360-theme-dark', 'ci360-hotspot-marker-inverted', 'ci360-hotspot-marker-brand', 'cloudimage-360--fullscreen');
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
    this.closeImageBitmaps(this.imagesGrid);
    this.imagesX = [];
    this.imagesY = [];
    this.imagesGrid = [];
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
    this.initialIcon.style.pointerEvents = 'auto';
  }

  hideInitialIcon() {
    if (!this.initialIcon) return;

    this.initialIcon.style.opacity = 0;
    this.initialIcon.style.pointerEvents = 'none';
  }

  addFullscreenIcon() {
    if (!this.fullscreen || !isFullscreenEnabled()) return;

    this.fullscreenIcon = createFullscreenIcon();
    this.fullscreenIcon.onclick = this.toggleFullscreen.bind(this);

    this.iconsContainer.appendChild(this.fullscreenIcon);
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
    const timelineFrameCount = this.isGridMode ? (this.amountX * this.amountY) : this.amountX;
    const timelineData = createHotspotTimeline(this.innerBox, timelineFrameCount, this.hotspots);
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
    if (this.isGridMode) {
      const flatIndex = this.activeImageY * this.amountX + this.activeImageX;
      updateTimelineIndicator(this.hotspotTimelineIndicator, flatIndex, this.amountX * this.amountY);
    } else {
      updateTimelineIndicator(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
    }
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

    const currentFlatIndex = this.isGridMode
      ? (this.activeImageY * this.amountX + this.activeImageX)
      : this.activeImageX;

    if (this.isAnimatingToFrame || targetFrame === currentFlatIndex) {
      // If already at the target frame, just show the hotspot if requested
      if (targetFrame === currentFlatIndex && hotspotId && this.hotspotsInstance && this.hotspotTimelineOnClick) {
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

    // In grid mode, jump directly to target (x, y) position
    if (this.isGridMode) {
      const totalFrames = this.amountX * this.amountY;
      const clampedTarget = Math.max(0, Math.min(targetFrame, totalFrames - 1));
      this.activeImageY = Math.floor(clampedTarget / this.amountX);
      this.activeImageX = clampedTarget % this.amountX;
      if (!this.isZoomed) this.updateView();
      this.emit('onSpin', {
        direction: clampedTarget > currentFlatIndex ? 'right' : 'left',
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        isGridMode: true,
      });
      this.isAnimatingToFrame = false;
      if (hotspotId && this.hotspotsInstance && this.hotspotTimelineOnClick) {
        setTimeout(() => {
          this.hotspotsInstance.showHotspotById(hotspotId);
        }, 50);
      }
      return;
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

    this.addLoadingSpinner();
    this.addFullscreenIcon();
    if (this.initialIconShown) this.addInitialIcon();
    if (this.bottomCircle) this.add360ViewCircleIcon();

    // Initialize new zoom system
    this.initZoom();
  }

  showAllIcons() {
    this.showInitialIcon();
    this.show360ViewCircleIcon();
    this.showFullscreenIcon();
    this.showHotspotTimeline();
    if (this.zoomControlsUI) this.zoomControlsUI.show();
  }

  hideAllIcons() {
    this.hideInitialIcon();
    this.hide360ViewCircleIcon();
    this.hideFullscreenIcon();
    if (this.zoomControlsUI) this.zoomControlsUI.hide();
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
    this.addFullscreenChangeHandler();
  }

  removeEvents() {
    this.removeMouseEvents();
    this.removeTouchEvents();
    this.removeKeyboardEvents();
    this.removeEscKeyHandler();
    this.removeFullscreenChangeHandler();
  }

  addMouseEvents() {
    this.boundMouseClick = this.mouseClick.bind(this);
    this.boundMouseDown = this.mouseDown.bind(this);
    this.boundMouseMove = throttle(this.mouseMove.bind(this), THROTTLE_TIME);
    this.boundMouseUp = this.mouseUp.bind(this);

    this.innerBox.addEventListener('click', this.boundMouseClick);
    this.innerBox.addEventListener('mousedown', this.boundMouseDown);
    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mouseup', this.boundMouseUp);
  }

  addTouchEvents() {
    this.boundTouchStart = this.touchStart.bind(this);
    this.boundTouchEnd = this.touchEnd.bind(this);
    this.boundTouchMove = throttle(this.touchMove.bind(this), THROTTLE_TIME);

    this.container.addEventListener('touchstart', this.boundTouchStart, { passive: false });
    this.container.addEventListener('touchend', this.boundTouchEnd);
    this.container.addEventListener('touchmove', this.boundTouchMove, { passive: false });
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

      if (this.isZoomed) {
        this.removeZoom();
      }
    };

    document.addEventListener('keydown', this.boundEscHandler);
  }

  removeEscKeyHandler() {
    document.removeEventListener('keydown', this.boundEscHandler);
  }

  addFullscreenChangeHandler() {
    this.boundFullscreenChange = this.onFullscreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.boundFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.boundFullscreenChange);
  }

  removeFullscreenChangeHandler() {
    document.removeEventListener('fullscreenchange', this.boundFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.boundFullscreenChange);
  }

  removeMouseEvents() {
    this.innerBox.removeEventListener('click', this.boundMouseClick);
    this.innerBox.removeEventListener('mousedown', this.boundMouseDown);
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup', this.boundMouseUp);
  }

  removeTouchEvents() {
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

    removeElementFromContainer(this.innerBox, '.cloudimage-360-placeholder');
  }

  update(newConfig) {
    if (!this.isReady) return;

    this.stopAutoplay();

    // Clean up zoom modules before re-init
    if (this.zoomPan) { this.zoomPan.destroy(); this.zoomPan = null; }
    if (this.gestureRecognizer) { this.gestureRecognizer.destroy(); this.gestureRecognizer = null; }
    if (this.zoomControlsUI) { this.zoomControlsUI.destroy(); this.zoomControlsUI = null; }
    if (this.scrollHintUI) { this.scrollHintUI.destroy(); this.scrollHintUI = null; }
    this.isZoomed = false;
    this.highResLoaded = false;

    // Clean up hotspot instance and timeline before re-creating
    if (this.hotspotsInstance) {
      this.hotspotsInstance.destroy();
      this.hotspotsInstance = null;
    }
    if (this.hotspotTimeline && this.hotspotTimeline.parentNode) {
      this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline);
      this.hotspotTimeline = null;
      this.hotspotTimelineIndicator = null;
    }
    if (this.innerBox) {
      this.innerBox.classList.remove('has-hotspot-timeline');
    }

    // Clean up hints overlay
    if (this.hintsOverlay && this.hintsOverlay.parentNode) {
      this.hintsOverlay.parentNode.removeChild(this.hintsOverlay);
      this.hintsOverlay = null;
    }
    this.hintsHidden = false;

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
      filenameGrid,
      imageListX,
      imageListY,
      imageListGrid,
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
      pointerZoom,
      zoomMax,
      zoomStep,
      zoomControls,
      zoomControlsPosition,
      scrollHint,
      ciToken,
      ciFilters,
      ciTransformation,
      lazyload,
      dragSpeed,
      stopAtEdges,
      stopAtEdgesX,
      stopAtEdgesY,
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
      initOnClick,
      hotspotTimelineOnClick = true,
      aspectRatio,
      cropAspectRatio,
      cropGravity,
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
      onNavigate,
      onError,
    } = adaptedConfig;

    const ciParams = { ciToken, ciFilters, ciTransformation, cropAspectRatio, cropGravity };
    const parsedImagesListX = safeJsonParse(imageListX, []);
    const parsedImagesListY = safeJsonParse(imageListY, []);

    // Parse grid image list (flatten if 2D array)
    let parsedImageListGrid = safeJsonParse(imageListGrid, []);
    if (parsedImageListGrid.length && Array.isArray(parsedImageListGrid[0])) {
      parsedImageListGrid = parsedImageListGrid.flat();
    }

    // Detect grid mode
    this.isGridMode = !!(filenameGrid || parsedImageListGrid.length);

    // Backward compatibility: pointerZoom > 0 maps to zoomMax if not explicitly set
    const effectiveZoomMax = (adaptedConfig.zoomMax === 5 && pointerZoom > 1)
      ? Math.min(pointerZoom, 5)
      : (zoomMax || 5);

    this.viewerConfig = adaptedConfig;
    this.amountX = parsedImagesListX.length || amountX;
    this.amountY = parsedImagesListY.length || amountY;
    this.allowSpinX = !!this.amountX;
    this.allowSpinY = !!this.amountY;

    // In grid mode, both axes are always active
    if (this.isGridMode) {
      this.allowSpinX = true;
      this.allowSpinY = true;
    }
    this.orientation = this.allowSpinX ? ORIENTATIONS.X : ORIENTATIONS.Y;
    this.activeImageX = autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = autoplayReverse ? this.amountY - 1 : 0;
    this.bottomCircleOffset = bottomCircleOffset;
    this.autoplay = autoplay;
    this.autoplayBehavior = autoplayBehavior;
    this.playOnce = playOnce;
    this.speed = speed;
    this.autoplayReverse = autoplayReverse;
    this.fullscreen = fullscreen;
    this.zoomMax = effectiveZoomMax;
    this.zoomStep = zoomStep || 0.5;
    this.zoomControls = zoomControls ?? true;
    this.zoomControlsPosition = zoomControlsPosition || 'bottom-left';
    this.scrollHint = scrollHint ?? true;
    this.dragSpeed = Math.max(dragSpeed, MIN_DRAG_SPEED);
    this.stopAtEdges = stopAtEdges;
    this.stopAtEdgesX = stopAtEdgesX ?? stopAtEdges;
    this.stopAtEdgesY = stopAtEdgesY ?? stopAtEdges;
    this.ciParams = ciParams;
    this.apiVersion = apiVersion;
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
    this.onHotspotOpen = onHotspotOpen;
    this.onHotspotClose = onHotspotClose;
    this.onProductClick = onProductClick;
    this.onNavigate = onNavigate;
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
    }

    // Always set brand color variable when provided, even if global markerTheme != 'brand'
    // (per-hotspot markerTheme: 'brand' markers need it)
    if (brandColor) {
      this.container.style.setProperty('--ci360-hotspot-brand-color', brandColor);
    } else {
      this.container.style.removeProperty('--ci360-hotspot-brand-color');
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

    this.srcGridConfig = {
      folder,
      filename: filenameGrid,
      imageList: parsedImageListGrid,
      container,
      innerBox: this.innerBox,
      apiVersion,
      ciParams,
      lazyload,
      amount: this.amountX * this.amountY,
      amountX: this.amountX,
      amountY: this.amountY,
      indexZeroBase,
      autoplayReverse,
    };

    if (update) this.removeEvents();

    if (update) {
      this.attachEvents(draggable, swipeable, keys);
      return;
    }

    if (initOnClick) {
      this.showInitOnClickPreview(draggable, swipeable, keys);
      return;
    }

    this.attachEvents(draggable, swipeable, keys);
    this.startLoadingImages();
  }

  showInitOnClickPreview(draggable, swipeable, keys) {
    const srcConfig = this.isGridMode
      ? this.srcGridConfig
      : (this.allowSpinX ? this.srcXConfig : this.srcYConfig);

    const width = this.container.offsetWidth;
    const cdnPath = !srcConfig.imageList.length ? generateCdnPath(srcConfig, width) : null;

    const [firstImageSrcInList] = srcConfig.imageList;
    const firstImageSrc = firstImageSrcInList || (cdnPath ? getFirstCdnImage(cdnPath, srcConfig.indexZeroBase) : null);

    if (!firstImageSrc) return;

    // Show sharp first-frame preview image
    const previewImg = new Image();
    previewImg.className = 'cloudimage-360-init-preview';
    previewImg.alt = '360° view preview — click to load';
    previewImg.style.cssText = `
      display: block;
      width: 100%;
      object-fit: contain;
      object-position: center;
    `;
    previewImg.src = firstImageSrc;
    this.innerBox.appendChild(previewImg);

    // Show click overlay
    this.clickOverlay = createClickOverlay(this.logoSrc);
    this.innerBox.appendChild(this.clickOverlay);

    this.clickOverlayHandler = () => {
      this.clickOverlay.removeEventListener('click', this.clickOverlayHandler);
      removeElementFromContainer(this.innerBox, '.cloudimage-360-click-overlay');
      removeElementFromContainer(this.innerBox, '.cloudimage-360-init-preview');
      this.clickOverlay = null;
      this.clickOverlayHandler = null;

      this.attachEvents(draggable, swipeable, keys);
      this.startLoadingImages();
    };

    this.clickOverlay.addEventListener('click', this.clickOverlayHandler);
  }

  startLoadingImages() {
    const width = this.container.offsetWidth;

    if (this.isGridMode) {
      const cdnPathGrid = !this.srcGridConfig.imageList.length ? generateCdnPath(this.srcGridConfig, width) : null;

      const loadCallback = (event) => {
        preloadGridImages({
          cdnPath: cdnPathGrid,
          config: this.srcGridConfig,
          onImageLoad: (imageData, index) => {
            this.pushImageToSet(imageData, index, 'grid');
            this.updatePercentageInLoader(this.calculatePercentage());
          },
          onFirstImageLoad: (imageData) => this.onFirstImageLoaded(event, imageData),
          onAllImagesLoad: (loadedImages, stats) => {
            this.imagesGrid = loadedImages;
            if (stats && stats.errorCount > 0) {
              this.emit('onError', { errorCount: stats.errorCount, errors: stats.errors, totalImages: this.amountX * this.amountY });
            }
            this.onAllImagesLoaded();
          },
          onError: (errorInfo) => this.emit('onError', errorInfo),
        });
      };

      initLazyload(cdnPathGrid, this.srcGridConfig, loadCallback);
    } else {
      const cdnPathX =
        this.allowSpinX && !this.srcXConfig.imageList.length ? generateCdnPath(this.srcXConfig, width) : null;
      const cdnPathY =
        this.allowSpinY && !this.srcYConfig.imageList.length ? generateCdnPath(this.srcYConfig, width) : null;

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
}

export default CI360Viewer;
