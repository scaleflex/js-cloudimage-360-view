import throttle from 'lodash.throttle';

import { get360ViewProps } from './ci360.utils';
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
} from './utils';

class CI360Viewer {
  constructor(container, fullscreen) {
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
    this.canvasWorker = new Worker(new URL('canvas.worker.js', import.meta.url));

    this.init(container);
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

    this.draggingDirection = getMovingDirection(deltaX, deltaY, this.allowSpinY) || this.draggingDirection;

    const container = this.fullscreenView ? document.body : this.container;
    const dragFactor = this.dragSpeed / 50;
    const speedFactorX = dragFactor * (this.amountX / container.offsetWidth);
    const speedFactorY = dragFactor * (this.amountY / container.offsetHeight);

    const itemsSkippedX = Math.abs(Math.round(deltaX * speedFactorX));
    const itemsSkippedY = Math.abs(Math.round(deltaY * speedFactorY));
    const shouldMove = itemsSkippedX !== 0 || (this.allowSpinY && itemsSkippedY !== 0);

    if (shouldMove) {
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

    if (this.glass) {
      this.removeGlass();
      return;
    }

    if (this.pointerZoom) this.toggleZoom(event);
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

  toggleZoom(event) {
    if (this.isZoomed) {
      this.showTransitionOverlay();

      setTimeout(() => {
        this.removeZoom();
      }, 800);
    } else {
      let width = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;

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

    this.update(ORIENTATIONS.X);
    this.showAllIcons();
    this.hideTransitionOverlay();
  }

  applyZoom(event) {
    const { offsetX, offsetY } = calculateOffsetFromEvent(event, this.canvas, this.devicePixelRatio);

    this.isZoomed = true;
    this.hideAllIcons();
    this.hideLoadingSpinner();
    this.hideTransitionOverlay();

    this.update(ORIENTATIONS.X, this.pointerZoom, offsetX, offsetY);
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

    if (isSpinKeysPressed(keyCode, this.allowSpinY)) {
      this.hideAllIcons();
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
    this.activeImageX = (this.activeImageX + itemsSkipped) % this.amountX;
  }

  moveActiveXIndexDown(itemsSkipped) {
    this.activeImageX = (this.activeImageX - itemsSkipped + this.amountX) % this.amountX;
  }

  moveActiveYIndexUp(itemsSkipped) {
    this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY;
  }

  moveActiveYIndexDown(itemsSkipped) {
    this.activeImageY = (this.activeImageY - itemsSkipped + this.amountY) % this.amountY;
  }

  moveRight(stopAtEdges, itemsSkippedX = 1) {
    if (stopAtEdges && this.activeImageX >= this.imagesX.length - 1) return;

    this.moveActiveXIndexUp(itemsSkippedX);
    this.update(ORIENTATIONS.X);
  }

  moveLeft(stopAtEdges, itemsSkippedX = 1) {
    if (stopAtEdges && this.activeImageX <= 0) return;

    this.moveActiveXIndexDown(itemsSkippedX);
    this.update(ORIENTATIONS.X);
  }

  moveTop(stopAtEdges, itemsSkippedY = 1) {
    if (stopAtEdges && this.activeImageY >= this.imagesY.length - 1) return;

    this.moveActiveYIndexUp(itemsSkippedY);
    this.update(ORIENTATIONS.Y);
  }

  moveBottom(stopAtEdges, itemsSkippedY = 1) {
    if (stopAtEdges && this.activeImageY <= 0) return;

    this.moveActiveYIndexDown(itemsSkippedY);
    this.update(ORIENTATIONS.Y);
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

  update(orientation, zoomScale, offsetX, offsetY) {
    const imageData =
      orientation === ORIENTATIONS.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];

    this.drawImageOnCanvas(imageData, zoomScale, offsetX, offsetY);
  }

  updatePercentageInLoader(percentage = 0) {
    if (!this.loader) return;

    this.loader.innerText = percentage + '%';
  }

  adaptCanvasSize(imageData) {
    const { naturalWidth, naturalHeight } = imageData;
    const imageAspectRatio = naturalWidth / naturalHeight;
    const containerWidth = this.fullscreenView ? window.innerWidth : this.canvas.clientWidth;
    const containerHeight = this.fullscreenView ? window.innerHeight : this.canvas.clientHeight;

    this.canvasWorker.postMessage({
      action: 'adaptCanvasSize',
      devicePixelRatio: this.devicePixelRatio,
      imageAspectRatio: imageAspectRatio,
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
    this.isReady = true;
    this.amountX = this.imagesX.length - 1;
    this.amountY = this.imagesY.length - 1;

    if (this.autoplay) {
      this.hideAllIcons();
      const delayedPlay = delay(this.play.bind(this));

      delayedPlay();
    }
  }

  magnify(event) {
    event.stopPropagation();
    const { src } = this.imagesX[this.activeImageX];
    const highPreviewCdnUrl = generateHighPreviewCdnUrl(src);

    this.createGlass();

    const onLoadImage = (image) => {
      magnify(event, this.innerBox, this.offset, image, this.glass, this.magnifier);
    };

    loadImage(highPreviewCdnUrl, onLoadImage);
  }

  openFullscreenModal(event) {
    event.stopPropagation();

    const fullscreenContainer = createFullscreenModal(this.container);

    new CI360Viewer(fullscreenContainer, true);
  }

  closeFullscreenModal(event) {
    event.stopPropagation();

    document.body.removeChild(this.container.parentNode);
    window.document.body.style.overflow = 'visible';
  }

  play() {
    if (this.isClicked) return;
    this.hide360ViewCircleIcon();

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
    }, this.autoplaySpeed);
  }

  stopAutoplay() {
    this.showAllIcons();
    this.autoplay = false;

    window.clearTimeout(this.loopTimeoutId);
  }

  destroy() {
    this.stopAutoplay();

    const oldElement = this.container;
    const newElement = oldElement.cloneNode(true);
    const innerBox = newElement.querySelector('.cloudimage-360-inner-box');

    newElement.className = newElement.className.replace(' initialized', '');
    newElement.style.position = 'relative';
    newElement.style.width = '100%';
    newElement.style.cursor = 'default';
    newElement.setAttribute('draggable', 'false');
    newElement.style.minHeight = 'auto';
    newElement.removeChild(innerBox);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  addInitialIcon() {
    this.initialIcon = createInitialIcon();
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
  }

  addMagnifierIcon() {
    if (!this.magnifier) return;

    this.magnifierIcon = createMagnifierIcon();
    this.magnifierIcon.onclick = this.magnify.bind(this);

    this.iconsContainer.appendChild(this.magnifierIcon);
  }

  showMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.visibility = 'visible'; // !TODO: Rework
    this.magnifierIcon.style.opacity = 1;
  }

  hideMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.visibility = 'hidden';
    this.magnifierIcon.style.opacity = 0;
  }

  addFullscreenIcon() {
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
    if (!this.fullscreenView) this.addMagnifierIcon();
    if (!this.fullscreenView) this.addFullscreenIcon();
    if (!this.initialIconHidden) this.addInitialIcon();
    if (!this.bottomCircleHidden) this.add360ViewCircleIcon();
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

  addMouseEvents() {
    this.innerBox.addEventListener('click', this.mouseClick.bind(this));
    this.innerBox.addEventListener('mousedown', this.mouseDown.bind(this));

    document.addEventListener('mousemove', throttle(this.mouseMove.bind(this), THROTTLE_TIME));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  addTouchEvents() {
    document.addEventListener('touchstart', this.touchOutside.bind(this));

    this.container.addEventListener('touchstart', this.touchStart.bind(this));
    this.container.addEventListener('touchend', this.touchEnd.bind(this));
    this.container.addEventListener('touchmove', throttle(this.touchMove.bind(this), THROTTLE_TIME));
  }

  addKeyboardEvents() {
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
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
        devicePixelRatio: window.devicePixelRatio,
      },
      [offscreenCanvas]
    );

    if (this.fullscreenView) this.addCloseFullscreenIcon();

    removeElementFromContainer(this.innerBox, '.cloudimage-lazy');
  }

  init(container) {
    let {
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
      bottomCircle,
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
      lazySelector,
      dragSpeed,
      stopAtEdges,
      controlReverse,
      logoSrc,
      pointerZoom,
      imageInfo = 'black',
      initialIconHidden,
      bottomCircleHidden,
    } = get360ViewProps(container);

    const ciParams = { ciToken, ciFilters, ciTransformation };

    this.folder = folder;
    this.apiVersion = apiVersion;
    this.filenameX = filenameX;
    this.filenameY = filenameY;
    this.imageListX = imageListX;
    this.imageListY = imageListY;
    this.indexZeroBase = indexZeroBase;
    this.amountX = imageListX ? JSON.parse(imageListX).length : amountX;
    this.amountY = imageListY ? JSON.parse(imageListY).length : amountY;
    this.allowSpinY = !!this.amountY;
    this.activeImageX = autoplayReverse ? this.amountX - 1 : 0;
    this.activeImageY = autoplayReverse ? this.amountY - 1 : 0;
    this.bottomCircle = bottomCircle;
    this.bottomCircleOffset = bottomCircleOffset;
    this.autoplay = autoplay;
    this.autoplayBehavior = autoplayBehavior;
    this.playOnce = playOnce;
    this.speed = speed;
    this.autoplayReverse = autoplayReverse;
    this.fullscreen = fullscreen;
    this.magnifier = magnifier > 1 ? Math.min(magnifier, 5) : 0;
    this.lazySelector = lazySelector;
    this.controlReverse = controlReverse;
    this.dragSpeed = Math.max(dragSpeed, 50);
    this.autoplaySpeed = (this.speed * 36) / this.amountX;
    this.stopAtEdges = stopAtEdges;
    this.logoSrc = logoSrc;
    this.ciParams = ciParams;
    this.apiVersion = apiVersion;
    this.pointerZoom = pointerZoom > 1 ? Math.min(pointerZoom, 5) : null;
    this.keysReverse = keysReverse;
    this.info = imageInfo;
    this.keys = keys;
    this.innerBox = createInnerBox(this.container);
    this.initialIconHidden = initialIconHidden;
    this.bottomCircleHidden = bottomCircleHidden;
    this.spinDirection = getDefaultSpinDirection(this.autoplayBehavior);

    this.srcXConfig = {
      folder,
      filename: filenameX,
      imageList: imageListX,
      container,
      innerBox: this.innerBox,
      apiVersion,
      ciParams,
      lazySelector,
      amount: this.amountX,
      indexZeroBase,
      autoplayReverse,
    };

    this.srcYConfig = {
      ...this.srcXConfig,
      filename: filenameY,
      imageList: imageListY,
      orientation: ORIENTATIONS.Y,
      amount: this.amountY,
    };

    const width = (this.fullscreenView ? document.body : this.container).offsetWidth;
    const cdnPathX = generateCdnPath(this.srcXConfig, width);
    const cdnPathY = this.allowSpinY ? generateCdnPath(this.srcYConfig, width) : null;

    if (lazyload) {
      initLazyload(cdnPathX, this.srcXConfig, (event) => {
        preloadImages({
          cdnPathX,
          cdnPathY,
          configX: this.srcXConfig,
          configY: this.srcYConfig,
          onImageLoad: (image, index, orientation) => this.onImageLoad(image, index, orientation),
          onFirstImageLoad: (image) => this.onFirstImageLoaded(event, image),
          onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        });
      });
    }

    this.attachEvents(draggable, swipeable, keys);
  }
}

export default CI360Viewer;
