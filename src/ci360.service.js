import {
  get360ViewProps,
  setView360Icon,
} from './ci360.utils';
import {
  ORIENTATIONS,
  AUTOPLAY_BEHAVIOR,
} from './constants/';
import './static/css/style.css';
import './static/css/hotspots.css';
import {
  generateImagesPath,
  preloadImages,
  preloadOriginalImages,
  create360ViewIcon,
  createCloseFullscreenIcon,
  createFullscreenIcon,
  createMagnifierIcon,
  createLoader,
  createInnerBox,
  createIconsContainer,
  createCanvas,
  create360ViewCircleIcon,
  createFullscreenModal,
  contain,
  getCurrentOriginalImage,
  magnify,
  createBoxShadow,
  getSpeedFactor,
  isCompletedOneCycle,
  getMovingDirection,
  applyStylesToContainer,
  initControls,
  addClass,
  removeClass,
  getItemSkipped,
  loop,
  generateZoomInSteps,
  generateZoomOutSteps,
  updateHotspots,
  createHotspots,
  generateHotspotsConfigs,
  isMouseOnHotspot,
  hideHotspotsIcons,
  isPropsChangeRequireReload,
  getImageAspectRatio,
  removeChildFromParent,
  initLazyload,
} from './utils';
import { togglePopupEvents } from './utils/hotspots/toggle-popup-events';

class CI360Viewer {
  constructor(container, fullscreen, hotspotsConfigs) {
    this.container = container;
    this.movementStart = { x: 0, y: 0 };
    this.isStartSpin = false;
    this.movingDirection = ORIENTATIONS.CENTER;
    this.isClicked = false;
    this.loadedImagesX = 0;
    this.loadedImagesY = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullscreenView = !!fullscreen;
    this.imagesX = [];
    this.imagesY = [];
    this.originalImagesX = [];
    this.originalImagesY = [];
    this.resizedImagesX = [];
    this.resizedImagesY = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.id = container.id;
    this.hotspotsConfigs = hotspotsConfigs && generateHotspotsConfigs(hotspotsConfigs);
    this.isMagnifyOpen = false;
    this.isDragged = false;
    this.startPointerZoom = false;
    this.zoomIntensity = 0;
    this.mouseTracked = false;
    this.intialPositions = { x: 0, y: 0 };
    this.pointerCurrentPosition = { x: 0, y: 0 };
    this.isStartedLoadOriginalImages = false;
    this.init(container);
  }

  isReady() {
    const totalAmount = this.amountX + this.amountY;

    return (this.imagesX.length + this.imagesY.length) === totalAmount;
  }

  mouseDown(event) {
    if (!this.imagesLoaded) return;

    const isMouseOnHotspotElement = isMouseOnHotspot();
    const { pageX, pageY } = event;

    this.hideInitialIcons();

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
      this.isZoomReady = true;
    }

    this.intialPositions = { x: pageX, y: pageY };
    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
    this.isDragged = false;

    if (this.hotspotsConfigs) {
      togglePopupEvents(this.hotspotsConfigs, event, true);
    }

    if (isMouseOnHotspotElement) {
      this.isClicked = false;
    }

    if (this.hotspotsConfigs) {
      updateHotspots(
        this.container,
        this.hotspotsConfigs,
        this.activeImageX,
        this.activeImageY,
        this.movingDirection
      );
    }
  }

  mouseUp() {
    if (!this.imagesLoaded || !this.isClicked) return;

    this.movementStart = { x: 0, y: 0 };
    this.isStartSpin = false;
    this.isClicked = false;

    if (this.bottomCircle && !this.mouseTracked) {
      this.show360ViewCircleIcon();
    }

    if (this.hotspotsConfigs) {
      togglePopupEvents(this.hotspotsConfigs);
    }

    if (this.pointerZoom && !this.fullscreenView) {
      setTimeout(() => {
        this.isZoomReady = true;
      }, 50);

      if (this.mouseTracked) {
        this.container.style.cursor = 'zoom-out';
      } else {
        this.container.style.cursor = 'zoom-in';
      }
    } else {
      this.container.style.cursor = 'grab';
    }
  }

  mouseClick(event) {
    if (!this.pointerZoom || this.fullscreenView) return;

    this.setCursorPosition(event);
    this.hideInitialIcons();

    if (!this.isStartedLoadOriginalImages && !this.isDragged && this.isZoomReady) {
      this.prepareOriginalImages(event);
    }

    if (this.isAllOriginalImagesLoaded && !this.isDragged && this.isZoomReady) {
      this.togglePointerZoom(event);
    };
  }

  mouseMove(event) {
    if (!this.imagesLoaded) return;

    const { pageX, pageY } = event;

    if (this.mouseTracked) {
      this.setCursorPosition(event);

      if (!this.isClicked) {
        this.update();
      }
    }

    if (this.isClicked) {
      const nextPositions = { x: pageX, y: pageY };

      this.container.style.cursor = 'grabbing';
      this.isDragged = true;
      this.movingDirection = getMovingDirection(
        this.isStartSpin,
        this.allowSpinY,
        this.intialPositions,
        nextPositions,
        this.movingDirection
      );

      this.onMoveHandler(event);
    }
  }

  mouseLeave() {
    if (!this.imagesLoaded) return;

    if (this.pointerZoom && this.mouseTracked) {
      this.togglePointerZoom();
    }

    if (this.isMagnifyOpen) {
      this.closeMagnifier();
    }
  }

  togglePointerZoom() {
    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    if (this.mouseTracked) {
      const zoomSteps = generateZoomOutSteps(this.pointerZoom);
      this.container.style.cursor = 'zoom-in';

      zoomSteps.forEach((step, index) => {
        setTimeout(() => {
          this.zoomIntensity = step;
          this.update();

          const isReachedIntialScale = index === (zoomSteps.length - 1);

          if (isReachedIntialScale) {
            this.mouseTracked = false;
            this.update();
          };
        }, (this.pointerZoom - step) * 200);
      })
    } else {
      if (this.bottomCircle) this.hide360ViewCircleIcon();

      const zoomSteps = generateZoomInSteps(this.pointerZoom);

      if (this.hotspotsConfigs) {
        hideHotspotsIcons();
      }

      zoomSteps.forEach((step) => {
        setTimeout(() => {
          this.zoomIntensity = step;
          this.update();
        }, step * 200);
      })

      this.mouseTracked = true;
      this.container.style.cursor = 'zoom-out';
    }
  }

  onOriginalImageLoad(orientation, event, image, index) {
    if (orientation === ORIENTATIONS.Y) {
      this.originalImagesY[index] = image;
    } else {
      this.originalImagesX[index] = image;
    }

    const loadedOriginalXImages = this.originalImagesX
      .filter(image => image);
    const loadedOriginalYImages = this.originalImagesY
      .filter(image => image);

    const totalAmount = this.amountX + this.amountY;
    const totalLoadedImages = loadedOriginalXImages.length + loadedOriginalYImages.length;

    const isAllImagesLoaded = (
      loadedOriginalXImages.length + loadedOriginalYImages.length === this.amountX + this.amountY
    );

    const percentage = Math.round(totalLoadedImages / totalAmount * 100);

    this.updatePercentageInLoader(percentage);

    if (isAllImagesLoaded) {
      this.removeLoader();
      this.togglePointerZoom(event);

      this.mouseTracked = true;
      this.isAllOriginalImagesLoaded = true;
    }
  }

  prepareOriginalImages(event) {
    const srcX = generateImagesPath(this.srcXConfig);

    this.isStartedLoadOriginalImages = true;
    this.loader = createLoader(this.innerBox);
    this.container.style.cursor = 'wait';

    preloadOriginalImages(
      this.srcXConfig,
      srcX,
      this.onOriginalImageLoad.bind(this, ORIENTATIONS.X, event)
    );

    if (this.allowSpinY) {
      const srcY = generateImagesPath(this.srcYConfig);

      preloadOriginalImages(
        this.srcYConfig,
        srcY,
        this.onOriginalImageLoad.bind(this, ORIENTATIONS.Y, event)
      );
    }
  }

  touchStart(event) {
    if (!this.imagesLoaded) return;

    const isMouseOnHotspotElement = isMouseOnHotspot();

    this.hideInitialIcons();

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    this.intialPositions = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.movementStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.isClicked = true;

    if (isMouseOnHotspotElement) {
      this.isClicked = false;
    }
  }

  touchEnd() {
    if (!this.imagesLoaded) return;

    if (this.bottomCircle) this.show360ViewCircleIcon();

    this.movementStart = { x: 0, y: 0 };
    this.isStartSpin = false;
    this.isClicked = false;
  }

  touchMove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    if (event.cancelable && this.allowSpinY) {
      event.preventDefault();
    }

    const nextPositions = { x: event.touches[0].clientX, y: event.touches[0].clientY };

    this.movingDirection = getMovingDirection(
      this.isStartSpin,
      this.allowSpinY,
      this.intialPositions,
      nextPositions,
      this.movingDirection
    );

    this.onMoveHandler(event);
  }

  keyDownGeneral(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (event.keyCode === 27) { //ESC
      if (this.mouseTracked) {
        this.togglePointerZoom();
      }
    }
  }

  hideInitialIcons() {
    if (this.glass) {
      this.closeMagnifier();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }
  }

  setCursorPosition(event) {
    this.mousePositions = {
      x: event.clientX,
      y: event.clientY
    };
  }

  getCursorPositionInCanvas() {
    const canvasRect = this.canvas.getBoundingClientRect();

    this.pointerCurrentPosition = {
      x: this.mousePositions.x - canvasRect.left,
      y: this.mousePositions.y - canvasRect.top
    };

    return this.pointerCurrentPosition;
  }

  keyDown(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (event.keyCode === 37) { // left
      this.keysReverse ? this.left() : this.right();

      this.onSpin();
    }

    if (event.keyCode === 39) { // right
      this.keysReverse ? this.right() : this.left();

      this.onSpin();
    }

    if (this.allowSpinY) {
      event.preventDefault();

      if (event.keyCode === 38) { // up
        this.keysReverse ? this.top() : this.bottom();

        this.onSpin();
      }

      if (event.keyCode === 40) { // down
        this.keysReverse ? this.bottom() : this.top();

        this.onSpin();
      }
    }
  }

  onSpin() {
    if (this.bottomCircle) {
      this.hide360ViewCircleIcon();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }
  }

  keyUp(event) {
    if (!this.imagesLoaded) return;

    if ([37, 39].includes(event.keyCode)) {
      this.onFinishSpin();
    }
  }

  onFinishSpin() {
    if (this.bottomCircle) this.show360ViewCircleIcon();
  }

  moveActiveIndexUp(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageX + itemsSkipped >= this.amountX;

      if (isReachedTheEdge) {
        this.activeImageX = this.amountX;

        if (isReverse ? this.leftElem : this.rightElem) {
          addClass(isReverse ? this.leftElem : this.rightElem, 'not-active');
        }
      } else {
        this.activeImageX += itemsSkipped;

        if (this.rightElem) removeClass(this.rightElem, 'not-active');

        if (this.leftElem) removeClass(this.leftElem, 'not-active');
      }
    } else {
      this.activeImageX = (this.activeImageX + itemsSkipped) % this.amountX || this.amountX;

      if (this.activeImageX === this.amountX && this.allowSpinY) this.spinY = true;
    }
  }

  moveActiveIndexDown(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageX - itemsSkipped <= 1;

      if (isReachedTheEdge) {
        this.activeImageX = 1;

        if (isReverse ? this.rightElem : this.leftElem) {
          addClass(isReverse ? this.rightElem : this.leftElem, 'not-active');
        }
      } else {
        this.activeImageX -= itemsSkipped;

        if (this.leftElem) removeClass(this.leftElem, 'not-active');

        if (this.rightElem) removeClass(this.rightElem, 'not-active');
      }
    } else {
      if (this.activeImageX - itemsSkipped < 1) {
        this.activeImageX = this.amountX + (this.activeImageX - itemsSkipped);
        this.spinY = true;
      } else {
        this.activeImageX -= itemsSkipped;
      }
    }
  }

  moveActiveYIndexUp(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageY + itemsSkipped >= this.amountY;

      if (isReachedTheEdge) {
        this.activeImageY = this.amountY;

        if (isReverse ? this.bottomElem : this.topElem) {
          addClass(isReverse ? this.bottomElem : this.topElem, 'not-active');
        }
      } else {
        this.activeImageY += itemsSkipped;

        if (this.topElem) removeClass(this.topElem, 'not-active');

        if (this.bottomElem) removeClass(this.bottomElem, 'not-active');
      }
    } else {
      this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY || this.amountY;

      if (this.activeImageY === this.amountY) this.spinY = false;
    }
  }

  moveActiveYIndexDown(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageY - itemsSkipped <= 1;

      if (isReachedTheEdge) {
        this.activeImageY = 1;

        if (isReverse ? this.topElem : this.bottomElem) {
          addClass(isReverse ? this.topElem : this.bottomElem, 'not-active');
        }
      } else {
        this.activeImageY -= itemsSkipped;

        if (this.bottomElem) removeClass(this.bottomElem, 'not-active');
        if (this.topElem) removeClass(this.topElem, 'not-active');
      }
    } else {
      if (this.activeImageY - itemsSkipped < 1) {
        this.activeImageY = this.amountY + (this.activeImageY - itemsSkipped);
        this.spinY = false;
      } else {
        this.activeImageY -= itemsSkipped;
      }
    }
  }

  moveRight(currentPositionX) {
    const itemsSkippedRight = getItemSkipped(currentPositionX, this.movementStart.x, this.speedFactor);

    this.spinReverse ? this.moveActiveIndexDown(itemsSkippedRight)
      : this.moveActiveIndexUp(itemsSkippedRight);

    this.movementStart.x = currentPositionX;
    this.activeImageY = 1;
    this.update();
  }

  moveLeft(currentPositionX) {
    const itemsSkippedLeft = getItemSkipped(this.movementStart.x, currentPositionX, this.speedFactor);

    this.spinReverse ? this.moveActiveIndexUp(itemsSkippedLeft)
      : this.moveActiveIndexDown(itemsSkippedLeft);

    this.activeImageY = 1;
    this.movementStart.x = currentPositionX;
    this.update();
  }

  moveTop(currentPositionY) {
    const itemsSkippedTop = getItemSkipped(this.movementStart.y, currentPositionY, this.speedFactor);

    this.spinReverse ? this.moveActiveYIndexUp(itemsSkippedTop)
      : this.moveActiveYIndexDown(itemsSkippedTop);

    this.activeImageX = 1;
    this.movementStart.y = currentPositionY;
    this.update();
  }

  moveBottom(currentPositionY) {
    const itemsSkippedBottom = getItemSkipped(currentPositionY, this.movementStart.y, this.speedFactor);

    this.spinReverse ? this.moveActiveYIndexDown(itemsSkippedBottom)
      : this.moveActiveYIndexUp(itemsSkippedBottom);

    this.activeImageX = 1;
    this.movementStart.y = currentPositionY;
    this.update();
  }

  onMoveHandler(event) {
    const currentPositionX = this.isMobile ? event.touches[0].clientX : event.pageX;
    const currentPositionY = this.isMobile ? event.touches[0].clientY : event.pageY;

    const isMoveRight = currentPositionX - this.movementStart.x >= this.speedFactor;
    const isMoveLeft = this.movementStart.x - currentPositionX >= this.speedFactor;
    const isMoveTop = this.movementStart.y - currentPositionY >= this.speedFactor;
    const isMoveBottom = currentPositionY - this.movementStart.y >= this.speedFactor;

    if (this.bottomCircle) this.hide360ViewCircleIcon();

    if (isMoveRight && this.movingDirection === ORIENTATIONS.X) {
      this.moveRight(currentPositionX);

      this.isStartSpin = true;
    } else if (isMoveLeft && this.movingDirection === ORIENTATIONS.X) {
      this.moveLeft(currentPositionX);

      this.isStartSpin = true;
    } else if (isMoveTop && this.movingDirection === ORIENTATIONS.Y) {
      this.moveTop(currentPositionY);

      this.isStartSpin = true;
    } else if (isMoveBottom && this.movingDirection === ORIENTATIONS.Y) {
      this.moveBottom(currentPositionY);

      this.isStartSpin = true;
    }
  }

  left() {
    this.movingDirection = ORIENTATIONS.X;
    this.activeImageY = this.reversed ? this.amountY : 1;

    this.moveActiveIndexDown(1);
    this.update();
  }

  right() {
    this.movingDirection = ORIENTATIONS.X;
    this.activeImageY = this.reversed ? this.amountY : 1;

    this.moveActiveIndexUp(1);
    this.update();
  }

  top() {
    this.movingDirection = ORIENTATIONS.Y;
    this.activeImageX = this.reversed ? this.amountX : 1;

    this.moveActiveYIndexUp(1);
    this.update();
  }

  bottom() {
    this.movingDirection = ORIENTATIONS.Y;
    this.activeImageX = this.reversed ? this.amountX : 1;

    this.moveActiveYIndexDown(1);
    this.update();
  }

  loop(reversed) {
    const loopTriggers = {
      left: this.left.bind(this),
      right: this.right.bind(this),
      top: this.top.bind(this),
      bottom: this.bottom.bind(this)
    }

    loop(this.autoplayBehavior, this.spinY, reversed, loopTriggers);
  }

  updateContainerAndCanvasSize(image) {
    const imageAspectRatio = getImageAspectRatio(image, this.ratio);

    if (this.fullscreenView) {
      this.container.width = window.innerWidth * this.devicePixelRatio;
      this.container.style.width = window.innerWidth + 'px';
      this.container.height = window.innerHeight * this.devicePixelRatio;
      this.container.style.height = window.innerHeight + 'px';
      this.container.style.maxWidth = 'unset';

      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      return;
    }

    this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
    this.canvas.style.width = this.container.offsetWidth + 'px';

    this.canvas.height = (this.container.offsetWidth / imageAspectRatio) * this.devicePixelRatio;
    this.canvas.style.height = (this.container.offsetWidth / imageAspectRatio) + 'px';
  }

  onResizedImageLoad(orientation, image, index) {
    if (orientation === ORIENTATIONS.Y) {
      this.resizedImagesY[index] = image;
    } else {
      this.resizedImagesX[index] = image;
    }

    const isAllImagesLoaded = (
      this.resizedImagesX.length + this.resizedImagesY.length === this.amountX + this.amountY
    );

    if (isAllImagesLoaded) {
      this.imagesX = this.resizedImagesX;
      this.imagesY = this.resizedImagesY;

      this.update();
    }
  }

  showImageInfo(ctx) {
    ctx.font = `${this.fullscreenView ? 28 : 14}px serif`;
    ctx.fillStyle = (this.info === 'white' ? '#FFF' : '#000');

    const imageDimension = `image-dimension: ${this.container.offsetWidth}x${this.container.offsetHeight}px`;

    const currentXImage = 'active-index-x: ' + this.activeImageX;
    const currentYImage = 'active-index-y: ' + this.activeImageY;

    const imageIndex = [currentXImage, currentYImage].join(' | ');

    ctx.fillText(imageDimension, 20, this.container.offsetHeight - 35);
    ctx.fillText(imageIndex, 20, this.container.offsetHeight - 10);
  }

  requestResizedImages() {
    if (!this.isReady()) return;

    const responsive = this.ciParams.ciToken;
    const firstImage = this.imagesX[0];

    this.update();

    if (!responsive || !this.requestResponsiveImages || (this.container.offsetWidth < firstImage.width * 1.5)) return;

    this.speedFactor = getSpeedFactor(this.dragSpeed, this.amountX, this.container.offsetWidth);
    const srcX = generateImagesPath(this.srcXConfig);

    preloadImages(
      this.srcXConfig,
      srcX,
      this.onResizedImageLoad.bind(this, ORIENTATIONS.X),
    )

    if (this.allowSpinY) {
      const srcY = generateImagesPath(this.srcYConfig);

      preloadImages(
        this.srcYConfig,
        srcY,
        this.onResizedImageLoad.bind(this, ORIENTATIONS.Y),
      )
    }
  }

  update() {
    let image = this.imagesX[this.activeImageX - 1];

    if (this.movingDirection === ORIENTATIONS.Y) {
      image = this.imagesY[this.activeImageY - 1];
    }

    if (!image) return;

    const ctx = this.canvas.getContext("2d");
    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

    this.updateContainerAndCanvasSize(image);

    if (this.fullscreenView) {
      const { width, height, offsetX, offsetY } =
        contain(this.canvas.width, this.canvas.height, image.width, image.height);

      ctx.drawImage(image, offsetX, offsetY, width, height);
    } else {
      if (this.mouseTracked) {
        this.updateImageScale(ctx);
      } else {
        if (this.hotspotsConfigs && !this.autoplay) {
          updateHotspots(
            this.container,
            this.hotspotsConfigs,
            this.activeImageX,
            this.activeImageY,
            this.movingDirection,
            this.isClicked
          );
        }

        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
    }

    if (this.info) {
      this.showImageInfo(ctx);
    }
  }

  updateImageScale(ctx) {
    let image = this.originalImagesX[this.activeImageX - 1];

    if (this.movingDirection === ORIENTATIONS.Y) {
      image = this.originalImagesY[this.activeImageY - 1];
    }

    const position = this.getCursorPositionInCanvas();
    const imageWidth = this.canvas.width;
    const imageHeight = this.canvas.height;

    const width = (this.canvas.width * this.zoomIntensity);
    const height = (this.canvas.height * this.zoomIntensity);

    const pointX = 0 - ((position.x / imageWidth) * (width - this.canvas.width));
    const pointY = 0 - ((position.y / imageHeight) * (height - this.canvas.height));

    ctx.drawImage(image, pointX, pointY, width, height);
  }

  updatePercentageInLoader(percentage) {
    if (this.loader) {
      this.loader.style.width = percentage + '%';
    }

    if (this.view360Icon) {
      this.view360Icon.innerText = percentage + '%';
    }
  }

  onFirstImageLoaded(image) {
    this.add360ViewIcon();

    const ctx = this.canvas.getContext("2d");
    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    this.updateContainerAndCanvasSize(image);

    if (this.fullscreenView) {
      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, image.width, image.height);

      this.offset = { x: offsetX, y: offsetY };

      this.addCloseFullscreenView();

      ctx.drawImage(image, offsetX, offsetY, width, height);
    } else {
      ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

    if (this.info) {
      this.showImageInfo(ctx);
    }

    if (this.magnifier) {
      this.addMagnifier();
    }

    if (this.boxShadow && !this.fullscreenView) {
      this.boxShadowEl = createBoxShadow(this.boxShadow, this.innerBox);
    }

    if (this.bottomCircle && !this.fullscreenView) {
      this.add360ViewCircleIcon();
    }

    if (this.fullscreen && !this.fullscreenView) {
      this.addFullscreenIcon();
    }
  }

  onAllImagesLoaded() {
    this.removeLoader();
    this.imagesLoaded = true;

    if (this.autoplay && this.pointerZoom) {
      this.container.style.cursor = 'zoom-in';
    } else {
      this.container.style.cursor = 'grab';
    }

    this.speedFactor = getSpeedFactor(this.dragSpeed, this.amountX, this.container.offsetWidth);

    if (this.autoplay) {
      this.play();
    }

    if (this.disableDrag) {
      this.container.style.cursor = 'default';
    }

    if (this.view360Icon) {
      if (this.hide360Logo) return this.remove360ViewIcon();

      this.view360Icon.innerText = '';
      //TODO [deprecated]: remove setView360Icon in the upcoming versions
      if (this.logoSrc) setView360Icon(this.view360Icon, this.logoSrc);
    }

    this.initControls();
  }

  magnify(event) {
    event.stopPropagation();

    if (this.mouseTracked) this.togglePointerZoom();

    const currentOriginalImage = getCurrentOriginalImage(
      this.movingDirection,
      this.imagesX,
      this.imagesY,
      this.activeImageX,
      this.activeImageY
    );

    this.isMagnifyOpen = true;

    currentOriginalImage.onload = () => {
      if (this.glass) {
        this.glass.style.cursor = 'none';
      }
    };

    this.glass = document.createElement('div');
    this.container.style.overflow = 'hidden';

    magnify(
      this.container,
      this.offset,
      currentOriginalImage,
      this.glass,
      this.magnifier || 3
    );
  }

  closeMagnifier() {
    if (!this.glass) return;

    this.container.style.overflow = 'visible';
    this.container.removeChild(this.glass);
    this.glass = null;
    this.isMagnifyOpen = false;
  }

  openFullscreenModal(event) {
    event.stopPropagation();

    if (this.mouseTracked) this.togglePointerZoom();

    const fullscreenContainer = createFullscreenModal(this.container);

    new CI360Viewer(fullscreenContainer, true, this.hotspotsConfigs);
  }

  setFullscreenEvents(_, event) {
    if (event.type === 'click') return this.closeFullscreenModal(event);
    if (event.key === 'Escape' && this.container.parentNode.parentNode === document.body) {
      this.closeFullscreenModalOnEsc(event);
    }
  }

  closeFullscreenModalOnEsc(event) {
    this.closeFullscreenModal(event);
  }

  play() {
    if (this.bottomCircle) this.hide360ViewCircleIcon();

    this.remove360ViewIcon();

    this.loopTimeoutId = window.setInterval(() => {
      this.loop(this.reversed);

      const isPlayedOnce = isCompletedOneCycle(
        this.autoplayBehavior,
        this.activeImageX,
        this.activeImageY,
        this.amountX,
        this.amountY,
        this.reversed
      );

      if (this.playOnce && isPlayedOnce) {
        window.clearTimeout(this.loopTimeoutId);
        this.autoplay = false;

        if (this.hotspotsConfigs) {
          updateHotspots(
            this.container,
            this.hotspotsConfigs,
            this.activeImageX,
            this.activeImageY,
            this.movingDirection,
            this.isClicked
          );
        }
      }
    }, this.autoplaySpeed);
  }

  stop() {
    if (this.bottomCircle) this.show360ViewCircleIcon();

    window.clearTimeout(this.loopTimeoutId);
  }

  updateView(forceUpdate, viewers) {
    let container = this.container;

    const imageProps = get360ViewProps(container);
    const srcPropsChanged = isPropsChangeRequireReload(this, imageProps);
    const reInitView = srcPropsChanged || forceUpdate;

    if (reInitView) {
      const oldElement = this.container;
      const viewIndex = viewers.findIndex(view => view.id === this.container.id);

      container.removeChild(this.innerBox);
      container = container.cloneNode(true);

      container.className = container.className.replace(' initialized', '');

      oldElement.parentNode.replaceChild(container, oldElement);

      return viewers.splice(viewIndex, 1, new CI360Viewer(container));
    }

    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.cursor = 'default';
    container.setAttribute('draggable', 'false');

    this.stop();
    this.init(container, true);
  }

  destroy() {
    this.stop();

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

  addCloseFullscreenView(event) {
    const closeFullscreenIcon = createCloseFullscreenIcon();

    closeFullscreenIcon.onclick = this.setFullscreenEvents.bind(this, event);
    window.onkeyup = this.setFullscreenEvents.bind(this, event);

    this.iconsContainer.appendChild(closeFullscreenIcon);
  }

  add360ViewIcon() {
    this.view360Icon = create360ViewIcon();
    this.innerBox.appendChild(this.view360Icon);
  }

  addFullscreenIcon() {
    this.fullscreenIcon = createFullscreenIcon();
    this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this);

    this.iconsContainer.appendChild(this.fullscreenIcon);
  }

  showFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.display = 'block';
    this.fullscreenIcon.style.pointerEvents = 'auto';
  }

  hideFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.display = 'none';
    this.fullscreenIcon.style.pointerEvents = 'none';
  }

  addMagnifier() {
    this.magnifierIcon = createMagnifierIcon();
    this.magnifierIcon.onclick = this.magnify.bind(this);

    this.iconsContainer.appendChild(this.magnifierIcon);
  }

  enableMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.display = 'block';
    this.magnifierIcon.style.pointerEvents = 'auto';
  }

  disableMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.display = 'none';
    this.magnifierIcon.style.pointerEvents = 'none';
  }

  closeFullscreenModal(event) {
    event.stopPropagation();
    document.body.removeChild(this.container.parentNode);
    window.document.body.style.overflow = 'visible';
  }

  add360ViewCircleIcon() {
    this.view360CircleIcon = create360ViewCircleIcon(this.bottomCircleOffset);
    this.innerBox.appendChild(this.view360CircleIcon);
  }

  show360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = '1';
  }

  hide360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = '0';
  }

  remove360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.innerBox.removeChild(this.view360CircleIcon);
    this.view360CircleIcon = null;
  }

  removeLoader() {
    if (!this.loader) return;

    this.innerBox.removeChild(this.loader);
    this.loader = null;
  }

  remove360ViewIcon() {
    if (!this.view360Icon) return;

    try {
      this.innerBox.removeChild(this.view360Icon);
      this.view360Icon = null;
    } catch { }
  }

  initControls() {
    const onLeftStart = (event) => {
      event.stopPropagation();

      this.onSpin();
      this.left();

      this.loopTimeoutId = window.setInterval(this.left.bind(this), this.autoplaySpeed);
    };

    const onRightStart = (event) => {
      event.stopPropagation();

      this.onSpin();
      this.right();

      this.loopTimeoutId = window.setInterval(this.right.bind(this), this.autoplaySpeed);
    };

    const onTopStart = (event) => {
      event.stopPropagation();

      this.onSpin();
      this.top();

      this.loopTimeoutId = window.setInterval(this.top.bind(this), this.autoplaySpeed);
    };

    const onBottomStart = (event) => {
      event.stopPropagation();

      this.onSpin();
      this.bottom();

      this.loopTimeoutId = window.setInterval(this.bottom.bind(this), this.autoplaySpeed);
    }

    const onEventEnd = () => {
      this.onFinishSpin();
      window.clearTimeout(this.loopTimeoutId);
    };

    const controlsConfig = {
      container: this.container,
      controlReverse: this.controlReverse,
      spinReverse: this.spinReverse,
      stopAtEdges: this.stopAtEdges
    }

    const controlsTriggers = {
      onLeftStart,
      onRightStart,
      onTopStart,
      onBottomStart,
      onEventEnd,
    };

    const controlsElements = initControls(controlsConfig, controlsTriggers);

    this.topElem = controlsElements.top;
    this.bottomElem = controlsElements.bottom;
    this.leftElem = controlsElements.left;
    this.rightElem = controlsElements.right;
  }

  attachEvents(draggable, swipeable, keys) {
    window.addEventListener('resize', this.requestResizedImages.bind(this));

    if ((draggable) && (!this.disableDrag)) {
      this.container.addEventListener('click', this.mouseClick.bind(this));
      this.container.addEventListener('mousedown', this.mouseDown.bind(this));
      this.container.addEventListener('mousemove', this.mouseMove.bind(this));
      this.container.addEventListener('mouseleave', this.mouseLeave.bind(this));

      document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    if ((swipeable) && (!this.disableDrag)) {
      this.container.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
      this.container.addEventListener('touchend', this.touchEnd.bind(this));
      this.container.addEventListener('touchmove', this.touchMove.bind(this));
    }

    if (keys) {
      document.addEventListener('keydown', this.keyDown.bind(this));
      document.addEventListener('keyup', this.keyUp.bind(this));
    }

    document.addEventListener('keydown', this.keyDownGeneral.bind(this));
  }

  init(container, update = false) {
    let {
      folder, apiVersion, filenameX, filenameY, imageListX, imageListY, indexZeroBase, amountX, amountY, draggable = true, swipeable = true, keys, keysReverse, bottomCircle, bottomCircleOffset, boxShadow,
      autoplay, autoplayBehavior, playOnce, speed, autoplayReverse, disableDrag = true, fullscreen, magnifier, ciToken, ciFilters, ciTransformation, lazyload, lazySelector, spinReverse, dragSpeed, stopAtEdges, controlReverse, hide360Logo, logoSrc, pointerZoom, ratio, imageInfo = 'black', requestResponsiveImages
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
    this.allowSpinY = (!!this.amountY);
    this.activeImageX = autoplayReverse ? this.amountX : 1;
    this.activeImageY = autoplayReverse ? this.amountY : 1;
    this.spinY = (autoplayBehavior === AUTOPLAY_BEHAVIOR.SPIN_YX) ? true : false;
    this.bottomCircle = bottomCircle;
    this.bottomCircleOffset = bottomCircleOffset;
    this.boxShadow = boxShadow;
    this.autoplay = autoplay;
    this.autoplayBehavior = autoplayBehavior;
    this.playOnce = playOnce;
    this.speed = speed;
    this.reversed = autoplayReverse;
    this.disableDrag = disableDrag;
    this.fullscreen = fullscreen;
    this.magnifier = !this.isMobile && magnifier > 1 ? Math.min(magnifier, 5) : 0;
    this.lazySelector = lazySelector;
    this.spinReverse = spinReverse;
    this.controlReverse = controlReverse;
    this.dragSpeed = Math.max(dragSpeed, 50);
    this.autoplaySpeed = this.speed * 36 / this.amountX;
    this.stopAtEdges = stopAtEdges;
    this.hide360Logo = hide360Logo;
    this.logoSrc = logoSrc;
    this.ciParams = ciParams;
    this.apiVersion = apiVersion;
    this.pointerZoom = pointerZoom > 1 ? Math.min(pointerZoom, 3) : 0;
    this.keysReverse = keysReverse;
    this.info = imageInfo;
    this.keys = keys;
    this.ratio = ratio && JSON.parse(ratio);
    this.requestResponsiveImages = requestResponsiveImages

    if (update) {
      removeChildFromParent(this.innerBox, this.iconsContainer);
      removeChildFromParent(this.innerBox, this.boxShadowEl);
      removeChildFromParent(this.innerBox, this.view360Icon);
      this.remove360ViewCircleIcon();

      this.iconsContainer = createIconsContainer(this.innerBox);

      if (!this.hide360Logo && !this.lazyload && this.logoSrc) {
        this.add360ViewIcon();
        setView360Icon(this.view360Icon, this.logoSrc);
      }

      if (this.magnifier) {
        this.addMagnifier();
      }

      if (this.bottomCircle && !this.fullscreenView) {
        this.add360ViewCircleIcon();
      }

      if (this.fullscreen && !this.fullscreenView) {
        this.addFullscreenIcon();
      }

      if (this.boxShadow && !this.fullscreenView) {
        this.boxShadowEl = createBoxShadow(this.boxShadow, this.innerBox);
      }

      return this.onAllImagesLoaded();
    }

    this.innerBox = createInnerBox(this.container);
    this.iconsContainer = createIconsContainer(this.innerBox);
    this.canvas = createCanvas(this.innerBox);
    this.loader = createLoader(this.innerBox);

    if (this.hotspotsConfigs && !this.fullscreenView) {
      createHotspots(container, this.hotspotsConfigs);
    }

    applyStylesToContainer(this.container);

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
      fullscreen: this.fullscreenView,
    }

    this.srcYConfig = {
      ...this.srcXConfig,
      filename: filenameY,
      orientation: ORIENTATIONS.Y,
      imageList: imageListY,
      amount: this.amountY
    }

    const srcX = generateImagesPath(this.srcXConfig);

    const onImageLoad = (orientation, image, index) => {
      if (orientation === ORIENTATIONS.X) {
        this.imagesX[index] = image;
      } else {
        this.imagesY[index] = image;
      }

      const totalAmount = this.amountX + this.amountY;
      const totalLoadedImages = this.imagesX.length + this.imagesY.length;
      const isFirstImageLoaded = !index && orientation !== ORIENTATIONS.Y;
      const percentage = Math.round(totalLoadedImages / totalAmount * 100);

      this.updatePercentageInLoader(percentage);
      if (isFirstImageLoaded) {
        this.onFirstImageLoaded(image);
      } else if (this.autoplay) {
        this.moveRight(index)
      }

      if (this.isReady()) {
        this.onAllImagesLoaded();
      }
    }

    const loadImages = () => {
      preloadImages(
        this.srcXConfig,
        srcX,
        (onImageLoad.bind(this, ORIENTATIONS.X))
      );

      if (this.allowSpinY) {
        const srcY = generateImagesPath(this.srcYConfig);

        preloadImages(
          this.srcYConfig,
          srcY,
          onImageLoad.bind(this, ORIENTATIONS.Y)
        );
      }
    }

    if (lazyload) {
      const onFirstImageLoad = (image) => {
        this.innerBox.removeChild(image);

        loadImages();
      }

      initLazyload(srcX, this.srcXConfig, onFirstImageLoad);
    } else {
      loadImages();
    }

    this.attachEvents(draggable, swipeable, keys);
  }
}

export default CI360Viewer;
