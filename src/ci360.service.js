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
  getDefaultSpinDirection,
  isSpinKeysPressed,
  calculateOffsetFromEvent,
  createLoadingSpinner,
  createTransitionOverlay,
  isTouchDevice,
} from './utils';

import CanvasWorker from './canvas.worker.js?worker&inline';
import Hotspot from './hotspots';

class CI360Viewer {
  constructor(container, config, fullscreen) {
    this.container = container;
    this.isClicked = false;
    this.fullscreenView = !!fullscreen;
    this.imagesX = [];
    this.imagesY = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.id = container.id;
    this.movementStart = { x: 0, y: 0 };
    this.draggingDirection = null;
    this.isReady = false;
    this.currentZoomScale = 1;
    this.touchDevice = isTouchDevice();
    this.canvasWorker = new CanvasWorker();
    this.onMoveHandler = this.onMoveHandler.bind(this);
    this.destroy = this.destroy.bind(this);
    this.init(this.container, config);
  }

  mouseDown(event) {
    if (!this.isReady || this.glass) return;

    const { pageX, pageY } = event;

    if (this.autoplay || this.loopTimeoutId) {
      this.stopAutoplay();
      this.autoplay = false;
    }

    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
    this.isDragging = false;
  }

  mouseUp() {
    if (!this.isReady) return;

    if (!this.isZoomed) this.showAllIcons();

    this.movementStart = { x: 0, y: 0 };
    this.isClicked = false;
    this.innerBox.style.cursor = 'grab';
  }

  drag(pageX, pageY) {
    if (!this.isReady || !this.isClicked) return;

    const deltaX = pageX - this.movementStart.x;
    const deltaY = pageY - this.movementStart.y;

    this.draggingDirection =
      getMovingDirection({
        deltaX,
        deltaY,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY,
      }) || this.draggingDirection;

    const container = this.fullscreenView ? document.body : this.container;
    const dragFactor = this.dragSpeed / 50;

    const speedFactorX = dragFactor * (this.amountX / container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / container.offsetHeight);
    const itemsSkippedX = this.allowSpinX ? Math.abs(Math.round(deltaX * speedFactorX)) : 0;
    const itemsSkippedY = this.allowSpinY ? Math.abs(Math.round(deltaY * speedFactorY)) : 0;

    const shouldMove = (this.allowSpinX && itemsSkippedX !== 0) || (this.allowSpinY && itemsSkippedY !== 0);

    if (shouldMove) {
      this.hideHotspotPopper();
      this.onMoveHandler(this.draggingDirection, itemsSkippedX, itemsSkippedY);
      this.movementStart = { x: pageX, y: pageY };

      setTimeout(() => {
        this.isDragging = true;
      }, 150);
    }
  }

  mouseMove(event) {
    if (!this.isReady || (!this.isClicked && !this.isZoomed) || this.glass) return;

    this.hideAllIcons();
    this.drag(event.pageX, event.pageY);

    if (this.isZoomed) this.applyZoom(event);
  }

  mouseClick(event) {
    if (!this.isReady || this.isDragging) return;

    if (this.glass && this.magnified) {
      this.removeGlass();
      return;
    }

    if (this.pointerZoom && !this.glass && !this.touchDevice) this.toggleZoom(event);
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
        this.imagesX = loadedImagesX;
        this.imagesY = loadedImagesY;
        onLoad();
      },
    });
  }

  hideHotspots() {
    if (!this.hotspotsInstance) return;

    this.hotspotsInstance.hideHotspots();
  }

  hideHotspotPopper() {
    if (!this.hotspotsInstance) return;

    this.hotspotsInstance.hidePopper();
  }

  toggleZoom(event) {
    if (this.isZoomed) {
      this.showTransitionOverlay();

      setTimeout(() => {
        this.removeZoom();
      }, 800);
    } else {
      let width = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;

      this.hideHotspots();
      this.showLoadingSpinner();
      this.loadHigherQualityImages(width, () => {
        this.showTransitionOverlay();

        setTimeout(() => {
          this.applyZoom(event);
        }, 800);
      });
    }
  }

  removeZoom() {
    this.isZoomed = false;
    this.updateView();
    this.showAllIcons();
    this.hideTransitionOverlay();
  }

  applyZoom(event) {
    const { offsetX, offsetY } = calculateOffsetFromEvent(event, this.canvas, this.devicePixelRatio);

    this.isZoomed = true;
    this.hideAllIcons();
    this.hideLoadingSpinner();
    this.hideTransitionOverlay();

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
    if (!this.isReady || event.touches.length > 1 || this.glass) return;

    const { pageX, pageY } = event.touches[0];

    if (this.autoplay || this.loopTimeoutId) {
      this.stopAutoplay();
      this.autoplay = false;
    }

    this.hideAllIcons();
    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
  }

  touchEnd() {
    if (!this.isReady) return;

    this.showAllIcons();
    this.movementStart = { x: 0, y: 0 };
    this.isClicked = false;
  }

  touchMove(event) {
    if (!this.isReady || !this.isClicked || this.glass) return;
    const { pageX, pageY } = event.touches[0];
    event.preventDefault();

    this.drag(pageX, pageY);
  }

  keyDown(event) {
    if (!this.isReady) return;

    const { keyCode } = event;
    const isReverse = this.keysReverse;

    if (this.autoplay) this.stopAutoplay();

    if (isSpinKeysPressed(keyCode, this.allowSpinY)) this.hideAllIcons();

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
  }

  updateView(zoomScale, offsetX, offsetY) {
    const activeIndex = this.orientation === ORIENTATIONS.X ? this.activeImageX : this.activeImageY;

    const imageData =
      this.orientation === ORIENTATIONS.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];

    if (this.hotspotsInstance && !this.isZoomed && !this.autoplay) {
      this.hotspotsInstance.updateHotspotPosition(activeIndex, this.orientation);
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
    this.canvasWorker.postMessage({
      action: 'drawImageOnCanvas',
      imageData,
      zoomScale,
      pointerX,
      pointerY,
    });
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

    if (this.hotspots) {
      this.hotspotsInstance = new Hotspot(this.hotspots, this.innerBox, this.imageAspectRatio);
    }

    this.isReady = true;
    this.amountX = this.imagesX.length;
    this.amountY = this.imagesY.length;
    this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0;

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

    loadImage(highPreviewCdnUrl, onLoadImage);
  }

  openFullscreenModal(event) {
    event.stopPropagation();

    const fullscreenContainer = createFullscreenModal(this.container);

    new CI360Viewer(fullscreenContainer, this.viewerConfig, true);
  }

  closeFullscreenModal(event) {
    event.stopPropagation();

    document.body.removeChild(this.container.parentNode);
    window.document.body.style.overflow = 'visible';
  }

  play() {
    if (this.isClicked) return;
    this.hide360ViewCircleIcon();

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
  }

  destroy() {
    this.stopAutoplay();
    if (this.hotspotsInstance) this.hotspotsInstance.destroy();

    const oldElement = this.container;
    const newElement = oldElement.cloneNode(true);
    const innerBox = newElement.querySelector('.cloudimage-360-inner-box');

    newElement.removeChild(innerBox);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  addInitialIcon() {
    if (this.initialIcon || this.hide360Logo) return;

    this.initialIcon = createInitialIcon(this.logoSrc);
    this.innerBox.appendChild(this.initialIcon);
  }

  showInitialIcon() {
    if (!this.initialIcon) return;

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
    if (!this.magnifier) return;

    this.magnifierIcon = createMagnifierIcon();
    this.magnifierIcon.onclick = this.magnify.bind(this);

    this.iconsContainer.appendChild(this.magnifierIcon);
  }

  showMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.visibility = 'visible';
    this.magnifierIcon.style.opacity = 1;
  }

  hideMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.visibility = 'hidden';
    this.magnifierIcon.style.opacity = 0;
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

  remove360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.innerBox.removeChild(this.view360CircleIcon);
    this.view360CircleIcon = null;
  }

  addAllIcons() {
    this.removeLoader();
    this.innerBox.style.cursor = 'grab';

    if (this.pointerZoom) {
      this.createTransitionOverlay();
      this.addLoadingSpinner();
    }

    if (!this.fullscreenView && !this.touchDevice) this.addMagnifierIcon();
    if (!this.fullscreenView) this.addFullscreenIcon();
    if (this.initialIconShown) this.addInitialIcon();
    if (!this.bottomCircle) this.add360ViewCircleIcon();
  }

  showAllIcons() {
    this.showInitialIcon();
    this.show360ViewCircleIcon();
    this.showMagnifierIcon();
    this.showFullscreenIcon();
  }

  hideAllIcons() {
    this.hideInitialIcon();
    this.hide360ViewCircleIcon();
    this.hideMagnifierIcon();
    this.hideFullscreenIcon();
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
  }

  removeEvents() {
    this.removeMouseEvents();
    this.removeTouchEvents();
    this.removeKeyboardEvents();
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

  removeMouseEvents() {
    this.innerBox.removeEventListener('click', this.boundMouseClick);
    this.innerBox.removeEventListener('mousedown', this.boundMouseDown);
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

    const offscreenCanvas = this.canvas.transferControlToOffscreen();
    this.canvasWorker.postMessage(
      {
        action: 'initCanvas',
        offscreen: offscreenCanvas,
        devicePixelRatio: this.devicePixelRatio,
      },
      [offscreenCanvas]
    );

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
      imageInfo = 'black',
      initialIconShown,
      bottomCircle,
      hotspots,
      dragReverse,
      hide360Logo,
      logoSrc,
    } = adaptedConfig;

    const ciParams = { ciToken, ciFilters, ciTransformation };
    const parsedImagesListX = imageListX ? JSON.parse(imageListX) : [];
    const parsedImagesListY = imageListY ? JSON.parse(imageListY) : [];

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
    this.magnifier = magnifier > 1 ? Math.min(magnifier, 5) : 0;
    this.dragSpeed = Math.max(dragSpeed, 50);
    this.stopAtEdges = stopAtEdges;
    this.ciParams = ciParams;
    this.apiVersion = apiVersion;
    this.pointerZoom = pointerZoom > 1 ? Math.min(pointerZoom, 5) : null;
    this.keysReverse = keysReverse;
    this.info = imageInfo;
    this.keys = keys;
    this.innerBox = this.innerBox ?? createInnerBox(this.container);
    this.initialIconShown = initialIconShown;
    this.bottomCircle = bottomCircle;
    this.spinDirection = getDefaultSpinDirection(this.autoplayBehavior, this.allowSpinX, this.allowSpinY);
    this.dragReverse = dragReverse;
    this.hotspots = hotspots;
    this.hide360Logo = hide360Logo;
    this.logoSrc = logoSrc;

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
