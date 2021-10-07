import {
  addClass,
  contain,
  get360ViewProps,
  getResponsiveWidthOfContainer,
  getSizeAccordingToPixelRatio,
  magnify,
  pad,
  isTwoFingers,
  removeClass,
  set360ViewCircleIconStyles,
  set360ViewIconStyles,
  setBoxShadowStyles,
  setCloseFullscreenViewStyles,
  setIconsContainerStyles,
  setFullscreenIconStyles,
  setResetZoomIconStyles,
  setFullscreenModalStyles,
  setLoaderStyles,
  setMagnifyIconStyles,
  setView360Icon,
  getMaxZoomIntensity,
  normalizeZoomFactor,
} from './ci360.utils';

import { TO_START_POINTER_ZOOM, MOUSE_LEAVE_ACTIONS, ORIENTATIONS} from './ci360.constants';

class CI360Viewer {
  constructor(container, fullscreen, ratio) {
    this.container = container;
    this.activeImage = 1;
    this.activeImageY = 1;
    this.movementStart = { x: 0, y: 0};
    this.isStartSpin = false;
    this.movingDirection = ORIENTATIONS.CENTER
    this.isClicked = false;
    this.loadedImages = 0;
    this.loadedImagesY = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullscreenView = !!fullscreen;
    this.ratio = ratio;
    this.images = [];
    this.imagesY = [];
    this.originalImages = [];
    this.originalImagesY = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.id = container.id;
    this.init(container);
    this.clickedToZoom = false;
    this.isMagnifyOpen = false;
    this.startPointerZoom = false;
    this.zoomIntensity = 0;
    this.mouseTracked = false;
    this.intialPositions = { x: 0, y: 0 };
    this.pointerCurrentPosition = { x: 0, y: 0 };
    this.startPinchZoom = false;
    this.prevDistanceBetweenFingers = 0;
  }

  mouseDown(event) {
    event.preventDefault();

    const { pageX, pageY } = event;

    if (!this.imagesLoaded) return;

    this.hideInitialIcons();

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    this.intialPositions = { x: pageX, y: pageY };
    this.movementStart = { x: pageX, y: pageY };
    this.isClicked = true;
    this.clickedToZoom = true;
    this.container.style.cursor = 'grabbing';
  }

  mouseUp() {
    if (!this.imagesLoaded || !this.isClicked) return;

    this.movementStart = { x: 0, y: 0};
    this.isStartSpin = false;
    this.isClicked = false;
    this.container.style.cursor = 'grab';

    if (this.bottomCircle && !this.zoomIntensity) {
      this.show360ViewCircleIcon();
    }
  }

  mouseMove(event) {
    if (!this.imagesLoaded) return;

    const { pageX, pageY } = event;

    if (this.mouseTracked) {
      this.setCursorPosition(event);
    }

    if (this.isClicked) {
      const nextPositions = { x: pageX, y: pageY };

      this.updateMovingDirection(this.intialPositions, nextPositions);
      this.onMoveHandler(event)
    } else if (this.zoomIntensity) {
      this.update();
    }
  }

  updateMovingDirection(prevPosition, nextPositions) {
    if (this.isStartSpin) return;

    const differenceInPositionX = Math.abs(prevPosition.x - nextPositions.x);
    const differenceInPositionY = Math.abs(prevPosition.y - nextPositions.y);
    const sensitivity = 10;
  
    if (differenceInPositionX > sensitivity) this.movingDirection = ORIENTATIONS.X;
  
    if (differenceInPositionY > sensitivity && this.amountY) this.movingDirection = ORIENTATIONS.Y;
  }

  mouseScroll(event) {
    if (this.disablePointerZoom || this.isMagnifyOpen) return;

    const isClickedToZoom = this.toStartPointerZoom === TO_START_POINTER_ZOOM.clickToStart
      && this.clickedToZoom;
    const isScrolledToZoom = this.toStartPointerZoom === TO_START_POINTER_ZOOM.scrollToStart

    if (isClickedToZoom || isScrolledToZoom) {
      this.initMouseScrollZoom(event);
    }
  }

  touchStart(event) {
    if (!this.imagesLoaded) return;

    const isPinchZoom = (
      !this.disablePinchZoom &&
      isTwoFingers(event) &&
      !this.isMagnifyOpen
      );

    if (isPinchZoom) {
      this.initAndSetPinchZoom(event);
    };

    this.hideInitialIcons();

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    this.intialPositions = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.movementStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.isClicked = true;
  }

  touchEnd() {
    if (!this.imagesLoaded) return;

    if (this.zoomIntensity) this.resetZoom();

    this.movementStart = { x: 0, y: 0 };
    this.isStartSpin = false;
    this.isClicked = false;

    if (this.bottomCircle) this.show360ViewCircleIcon();
  }

  touchMove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    if (!this.disablePinchZoom && isTwoFingers(event)) {
      this.fingersPinchZoom(event);
    } else {
      const nextPositions = { x: event.touches[0].clientX, y: event.touches[0].clientY };

      this.updateMovingDirection(this.intialPositions, nextPositions);
      this.onMoveHandler(event);
    }
  }

  keyDownGeneral() {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
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

  initMouseScrollZoom(event) {
    if (this.bottomCircle) this.hide360ViewCircleIcon();

    this.hideInitialIcons();
    this.mouseTracked = true;
    this.setCursorPosition(event);
    this.mouseScrollZoom(event);
  }

  setCursorPosition(event) {
    this.mousePositions = {
      x: event.clientX,
      y: event.clientY
    }
  }

  getCursorPositionInCanvas () {
    const canvasRect =  this.canvas.getBoundingClientRect();

    this.pointerCurrentPosition = {
      x: this.mousePositions.x - canvasRect.left,
      y: this.mousePositions.y - canvasRect.top
    };

    return this.pointerCurrentPosition;
  }

  mouseScrollZoom (event) {
    event.preventDefault();

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    const zoomFactor = normalizeZoomFactor(event, this.pointerZoomFactor);
    const maxIntensity = getMaxZoomIntensity(this.canvas.width, this.maxScale);
    this.startPointerZoom = true;
    this.zoomIntensity += event.deltaY * zoomFactor;
    this.zoomIntensity = Math.min(Math.max(0, this.zoomIntensity), maxIntensity);

    if (this.zoomIntensity) {
      if (this.resetZoomIcon) this.showResetZoomIcon();
    } else {
      if (this.resetZoomIcon) this.hideResetZoomIcon();

      if (this.bottomCircle) this.show360ViewCircleIcon();

      this.startPointerZoom = false;
      this.mouseTracked = false;
    }

    this.update();
  }

  initAndSetPinchZoom (event) {
    if (this.bottomCircle) this.hide360ViewCircleIcon();

    const [fingerOnePosition, fingerTwoPosition] = this.getFingersPosition(event);
    this.prevDistanceBetweenFingers = this.getDistanceBetweenFingers(fingerOnePosition, fingerTwoPosition);
  }

  getDistanceBetweenFingers (fingerOne, fingerTwo) {
    const xPosition = fingerTwo.x - fingerOne.x;
    const yPosition = fingerTwo.y - fingerOne.y;

    return Math.sqrt(Math.pow(xPosition, 2) + Math.pow(yPosition, 2));
  }

  updateAveragePositionBetweenFingers (fingerOne, fingerTwo) {
    const containerRect = this.canvas.getBoundingClientRect();
    const offSetX = containerRect.left;
    const offSetY = containerRect.top;

    this.pointerCurrentPosition.x = (
      ( fingerOne.x + fingerTwo.x ) / 2
    ) - offSetX;

    this.pointerCurrentPosition.y = (
      ( fingerOne.y + fingerTwo.y ) / 2
    ) - offSetY;
  }

  getFingersPosition (event) {
    const p1 = event.targetTouches[0];
    const p2 = event.targetTouches[1];

    const fingerOnePosition = { x: p1.clientX, y: p1.clientY };
    const fingerTwoPosition = { x: p2.clientX, y: p2.clientY };

    return [fingerOnePosition, fingerTwoPosition];
  }

  fingersPinchZoom (event) {
    event.preventDefault();

    const [fingerOnePosition, fingerTwoPosition] = this.getFingersPosition(event);
    const currentDistanceBetweenFingers = this.getDistanceBetweenFingers(fingerOnePosition, fingerTwoPosition);
    const zoomFactor  = this.pinchZoomFactor * 30;

    const zoomSensitivity = 1.5;
    const isZoomIn = currentDistanceBetweenFingers > (this.prevDistanceBetweenFingers + zoomSensitivity);
    const isZoomOut = (currentDistanceBetweenFingers + zoomSensitivity) < this.prevDistanceBetweenFingers;
    const maxIntensity = getMaxZoomIntensity(this.canvas.width, this.maxScale);

    this.startPinchZoom = true;
    
    this.updateAveragePositionBetweenFingers(fingerOnePosition, fingerTwoPosition);

    if (isZoomIn && this.zoomIntensity <= maxIntensity) {
      this.zoomIntensity += zoomFactor;
    } else if (isZoomOut && this.zoomIntensity >= zoomFactor) {
      this.zoomIntensity -= zoomFactor;
    }
    
    this.update();
    this.prevDistanceBetweenFingers = currentDistanceBetweenFingers;
  }

  resetZoom () {
    this.startPointerZoom = false;
    this.startPinchZoom = false;
    this.mouseTracked = false;
    this.clickedToZoom = false;

    if (this.resetZoomIcon) this.hideResetZoomIcon();

    if (this.zoomIntensity) {
      this.zoomIntensity = 0;
      this.update();
    }
  }

  keyDown(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if ([37, 39].includes(event.keyCode)) {
      if (37 === event.keyCode) {
        if (this.reversed)
          this.prev();
        else
          this.next();
      } else if (39 === event.keyCode) {
        if (this.reversed)
          this.next();
        else
          this.prev();
      }

      this.onSpin();
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

  onMoveHandler(event) {
    const currentPositionX = this.isMobile ? event.touches[0].clientX : event.pageX;
    const currentPositionY = this.isMobile ? event.touches[0].clientY : event.pageY;

    const isMoveRight = currentPositionX - this.movementStart.x >= this.speedFactor;
    const isMoveLeft = this.movementStart.x - currentPositionX >= this.speedFactor;
    const isMoveTop = this.movementStart.y - currentPositionY >= this.speedFactor;
    const isMoveBottom = currentPositionY - this.movementStart.y >= this.speedFactor;
    
    if (this.bottomCircle) this.hide360ViewCircleIcon();

    if (isMoveRight && this.movingDirection === ORIENTATIONS.X) {
      this.moveRight(currentPositionX)
  
      this.isStartSpin = true;
    } else if (isMoveLeft && this.movingDirection === ORIENTATIONS.X) {  
      this.moveLeft(currentPositionX)

      this.isStartSpin = true;
    } else if (isMoveTop && this.movingDirection === ORIENTATIONS.Y) {
      this.moveTop(currentPositionY)

      this.isStartSpin = true;
    } else if (isMoveBottom && this.movingDirection === ORIENTATIONS.Y) {
      this.moveBottom(currentPositionY)

      this.isStartSpin = true;
    }
  }

  moveRight(currentPositionX) {
    const itemsSkippedRight = Math.floor(
      (currentPositionX - this.movementStart.x) / this.speedFactor
    ) || 1;

    this.spinReverse ? this.moveActiveIndexDown(itemsSkippedRight) 
    : this.moveActiveIndexUp(itemsSkippedRight);

    this.movementStart.x = currentPositionX;
    this.update();
  }

  moveLeft(currentPositionX) { 
    const itemsSkippedLeft = Math.floor(
      (this.movementStart.x - currentPositionX) / this.speedFactor
    ) || 1;

    this.spinReverse ? this.moveActiveIndexUp(itemsSkippedLeft) 
    : this.moveActiveIndexDown(itemsSkippedLeft);

    this.movementStart.x = currentPositionX;
    this.update();
  }

  moveTop(currentPositionY) {
    const itemsSkippedTop = Math.floor(
      (this.movementStart.y - currentPositionY) / this.speedFactor
    ) || 1;

    this.spinReverse ? this.moveActiveYIndexUp(itemsSkippedTop)
    : this.moveActiveYIndexDown(itemsSkippedTop);

    this.movementStart.y = currentPositionY;
    this.update();
  }

  moveBottom(currentPositionY) {
    const itemsSkippedBottom = Math.floor(
      (currentPositionY - this.movementStart.y) / this.speedFactor
    ) || 1;

    this.spinReverse ? this.moveActiveYIndexDown(itemsSkippedBottom)
    : this.moveActiveYIndexUp(itemsSkippedBottom);

    this.movementStart.y = currentPositionY;
    this.update();
  }

  moveActiveIndexUp(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImage + itemsSkipped >= this.amount;
  
      if (isReachedTheEdge) {
        this.activeImage = this.amount;

        if (isReverse ? this.prevElem : this.nextElem) {
          addClass(isReverse ? this.prevElem : this.nextElem, 'not-active');
        }
      } else {
        this.activeImage += itemsSkipped;

        if (this.nextElem) removeClass(this.nextElem, 'not-active');

        if (this.prevElem) removeClass(this.prevElem, 'not-active');
      }
    } else {
      this.activeImage = (this.activeImage + itemsSkipped) % this.amount || this.amount;
    }
  }

  moveActiveIndexDown(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImage - itemsSkipped <= 1;

      if (isReachedTheEdge) {
        this.activeImage = 1;

        if (isReverse ? this.nextElem : this.prevElem) {
          addClass(isReverse ? this.nextElem : this.prevElem, 'not-active');
        }
      } else {
        this.activeImage -= itemsSkipped;

        if (this.prevElem) removeClass(this.prevElem, 'not-active');

        if (this.nextElem) removeClass(this.nextElem, 'not-active');
  
      }
    } else {
      if (this.activeImage - itemsSkipped < 1) {
        this.activeImage = this.amount + (this.activeImage - itemsSkipped);
      } else {
        this.activeImage -= itemsSkipped;
      }    
    }
  }

  moveActiveYIndexUp(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageY + itemsSkipped >= this.amountY;

      if (isReachedTheEdge) {
        this.activeImage = this.amountY;

        if (isReverse ? this.prevElem : this.nextElem) {
          addClass(isReverse ? this.prevElem : this.nextElem, 'not-active');
        }
      } else {
        this.activeImageY += itemsSkipped;

        if (this.nextElem) removeClass(this.nextElem, 'not-active');

        if (this.prevElem) removeClass(this.prevElem, 'not-active');
      }
    } else {
      this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY || this.amountY;
    }
  }

  moveActiveYIndexDown(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      const isReachedTheEdge = this.activeImageY - itemsSkipped <= 1;

      if (isReachedTheEdge) {
        this.activeImageY = 1;

        if (isReverse ? this.nextElem : this.prevElem) {
          addClass(isReverse ? this.nextElem : this.prevElem, 'not-active');
        }
      } else {
        this.activeImageY -= itemsSkipped;

        if (this.prevElem) removeClass(this.prevElem, 'not-active');
        if (this.nextElem) removeClass(this.nextElem, 'not-active');
      }
    } else {
      if (this.activeImageY - itemsSkipped < 1) {
        this.activeImageY = this.amountY + (this.activeImageY - itemsSkipped);
      } else {
        this.activeImageY -= itemsSkipped;
      }    
    }
  }

  loop(reversed) {
    reversed ? this.prev() : this.next();
  }

  next() {
    this.moveActiveIndexUp(1);
    this.update();
  }

  prev() {
    this.moveActiveIndexDown(1);
    this.update();
  }

  update() {
    let image = this.images[this.activeImage - 1];

    if (this.movingDirection === ORIENTATIONS.Y) {
      image = this.imagesY[this.activeImageY - 1];
    }

    const ctx = this.canvas.getContext("2d");

    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

    if (this.fullscreenView) {
      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, image.width, image.height);

      ctx.drawImage(image, offsetX, offsetY, width, height);
    } else {
      this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
      this.canvas.style.width = this.container.offsetWidth + 'px';
      this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / image.width * image.height;
      this.canvas.style.height = this.container.offsetWidth / image.width * image.height + 'px';

      if (this.startPointerZoom || this.startPinchZoom) {
        this.updateImageScale(ctx);
      } else {
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  
  updateImageScale(ctx) {
    let image = this.originalImages[this.activeImage -1];

    if (this.movingDirection === ORIENTATIONS.Y) {
      image = this.imagesY[this.activeImageY - 1];
    }

    let position = this.pointerCurrentPosition;

    if (this.startPointerZoom) position = this.getCursorPositionInCanvas();

    const imageWidth = this.canvas.width / this.devicePixelRatio;
    const imageHeight = this.canvas.height / this.devicePixelRatio;

    const width = this.canvas.width + (this.zoomIntensity * (this.canvas.width / this.canvas.height));
    const height = this.canvas.height + this.zoomIntensity;

    const pointX = 0 - ( (position.x / imageWidth) * (width - this.canvas.width) );
    const pointY = 0 - ( (position.y / imageHeight) * (height - this.canvas.height) );

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

  onAllImagesLoaded() {
    this.imagesLoaded = true;

    this.container.style.cursor = 'grab';
    if (this.disableDrag) this.container.style.cursor = 'default';

    this.removeLoader();

    if (!this.fullscreenView) {
      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * this.container.offsetWidth / 1500) || 1;
    } else {
      const containerRatio = this.container.offsetHeight / this.container.offsetWidth;
      let imageOffsetWidth = this.container.offsetWidth;

      if (this.ratio > containerRatio) {
        imageOffsetWidth = this.container.offsetHeight / this.ratio;
      }

      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * imageOffsetWidth / 1500) || 1;
    }

    if (this.imageOffset) {
      this.activeImage = this.imageOffset;
    };

    if (this.autoplay) {
      this.play();
    }

    if (this.view360Icon) {
      this.view360Icon.innerText = '';
      setView360Icon(this.view360Icon, this.logoSrc);
    }

    this.initControls();
  }

  onFirstImageLoaded(event) {
    if (!this.hide360Logo) {
      this.add360ViewIcon();
    }

    if (this.fullscreenView) {
      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      const ctx = this.canvas.getContext("2d");

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, event.target.width, event.target.height);

        this.offset = { x: offsetX, y: offsetY };

        ctx.drawImage(event.target, offsetX, offsetY, width, height);
    } else {
      const ctx = this.canvas.getContext("2d");
      let imagePreview = event.target;

      if (this.imageOffset) {
        imagePreview = this.images[this.imageOffset];
      }

      if (this.container.offsetWidth === 0) {
        const modalRef = this.container.parentElement;

        this.canvas.width = parseInt(modalRef.style.width) * this.devicePixelRatio;
        this.canvas.style.width = modalRef.style.width;

        this.canvas.height = parseInt(modalRef.style.height) * this.devicePixelRatio / event.target.width * event.target.height;
        this.canvas.style.height = parseInt(modalRef.style.width) / event.target.width * event.target.height + 'px';

      }

      if (this.container.offsetWidth > 0) {
        this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
        this.canvas.style.width = this.container.offsetWidth + 'px';

        this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / event.target.width * event.target.height;
        this.canvas.style.height = this.container.offsetWidth / event.target.width * event.target.height + 'px';
      }

      ctx.drawImage(imagePreview, 0, 0, this.canvas.width, this.canvas.height);
    }

    if (this.lazyload && !this.fullscreenView) {
      this.images
        .forEach((image, index) => {
          if (index === 0) {
            this.innerBox.removeChild(this.lazyloadInitImage);
            return;
          }

          const dataSrc = image.getAttribute('data-src');

          if (dataSrc) {
            image.src = image.getAttribute('data-src');
          }
        });
    }

    if (this.ratio) {
      this.container.style.minHeight = 'auto';
    }

    if (this.fullscreenView) {
      this.addCloseFullscreenView();
    }

    if ( (this.magnifier && !this.fullscreenView) || this.magnifyInFullscreen ) {
      this.addMagnifier();
    }

    if (this.boxShadow && !this.fullscreenView) {
      this.addBoxShadow();
    }

    if (this.bottomCircle && !this.fullscreenView) {
      this.add360ViewCircleIcon();
    }

    if (this.fullscreen && !this.fullscreenView) {
      this.addFullscreenIcon();
    }

    if (!this.isMobile && !this.fullScreenView && !this.disablePointerZoom) {
      this.addResetZoomIcon();
    }
  }

  incrementLoadedImages(orientation) {
    if (orientation === ORIENTATIONS.Y) {
      this.loadedImagesY += 1;
    } else {
      this.loadedImages += 1;
    }
  }

  onImageLoad(index, orientation, event ) {
    this.incrementLoadedImages(orientation);

    const totalAmount = this.amount + this.amountY;
    const totalLoadedImages = this.loadedImages + this.loadedImagesY;

    const percentage = Math.round(totalLoadedImages / totalAmount * 100);

    this.updatePercentageInLoader(percentage);

    if (index === 0 && orientation !== ORIENTATIONS.Y) {
      this.onFirstImageLoaded(event);
    }

    if (totalLoadedImages === totalAmount) {
      this.onAllImagesLoaded(event);
    }
  }

  addCloseFullscreenView(event) {
    const closeFullscreenIcon = document.createElement('div');

    setCloseFullscreenViewStyles(closeFullscreenIcon);

    closeFullscreenIcon.onclick = this.setFullscreenEvents.bind(this, event);
    window.onkeyup = this.setFullscreenEvents.bind(this, event);

    this.iconsContainer.appendChild(closeFullscreenIcon);
  }

  add360ViewIcon() {
    const view360Icon = document.createElement('div');

    set360ViewIconStyles(view360Icon);

    view360Icon.innerText = '0%';

    this.view360Icon = view360Icon;
    this.innerBox.appendChild(view360Icon);
  }

  addFullscreenIcon() {
    const fullscreenIcon = document.createElement('div');

    setFullscreenIconStyles(fullscreenIcon);

    fullscreenIcon.onclick = this.openFullscreenModal.bind(this);

    this.fullscreenIcon = fullscreenIcon;

    this.iconsContainer.appendChild(fullscreenIcon);
  }

  hideFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.opacity = '0.4';
    this.fullscreenIcon.style.pointerEvents = 'none';
  }

  showFullscreenIcon() {
    if (!this.fullscreenIcon) return;

    this.fullscreenIcon.style.opacity = '1';
    this.fullscreenIcon.style.pointerEvents = 'auto';
  }

  addMagnifier() {
    const magnifyIcon = document.createElement('div');

    setMagnifyIconStyles(magnifyIcon);

    magnifyIcon.onclick = this.magnify.bind(this);

    this.magnifierIcon = magnifyIcon;

    this.iconsContainer.appendChild(magnifyIcon);
  }

  disableMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.opacity = '0.4';
    this.magnifierIcon.style.pointerEvents = 'none';
  }

  enableMagnifierIcon() {
    if (!this.magnifierIcon) return;

    this.magnifierIcon.style.opacity = '1';
    this.magnifierIcon.style.pointerEvents = 'auto';  
  }

  getOriginalSrc() {
    const currentImage = this.images[this.activeImage - 1];
    const lastIndex = currentImage.src.lastIndexOf('//');

    return lastIndex > 10 ? currentImage.src.slice(lastIndex) : currentImage.src;
  }

  magnify() {
    const image = new Image();
    const src = this.getOriginalSrc();
    this.isMagnifyOpen = true;

    image.src = src;
    image.onload = () => {
      if (this.glass) {
        this.glass.style.cursor = 'none';
      }
    };

    this.glass = document.createElement('div');
    this.container.style.overflow = 'hidden';

    magnify(
      this.container,
      this.offset,
      src,
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

  openFullscreenModal() {
    const fullscreenModal = document.createElement('div');

    setFullscreenModalStyles(fullscreenModal);

    const fullscreenContainer = this.container.cloneNode();
    const image = this.images[0];
    const ratio = image.height / image.width;

    fullscreenContainer.style.height = '100%';
    fullscreenContainer.style.maxHeight = '100%';

    fullscreenModal.appendChild(fullscreenContainer);

    window.document.body.style.overflow = 'hidden';
    window.document.body.appendChild(fullscreenModal);

    new CI360Viewer(fullscreenContainer, true, ratio);
  }

  setFullscreenEvents(_, event) {
    if (event.type === 'click') return this.closeFullscreenModal();
    if (event.key === 'Escape') return this.closeFullscreenModalOnEsc();
  }

  closeFullscreenModalOnEsc() {

    if (this.container.parentNode.parentNode === document.body) {
      this.closeFullscreenModal()
    };
  }

  closeFullscreenModal() {
    document.body.removeChild(this.container.parentNode);
    window.document.body.style.overflow = 'visible';
  }

  add360ViewCircleIcon() {
    const view360CircleIcon = new Image();

    set360ViewCircleIconStyles(view360CircleIcon, this.bottomCircleOffset);

    this.view360CircleIcon = view360CircleIcon;
    this.innerBox.appendChild(view360CircleIcon);
  }

  hide360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = '0';
  }

  show360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = '1';
  }

  remove360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.innerBox.removeChild(this.view360CircleIcon);
    this.view360CircleIcon = null;
  }

  addResetZoomIcon() {
    const resetZoomIcon = document.createElement('div');

    setResetZoomIconStyles(resetZoomIcon);

    this.resetZoomIcon = resetZoomIcon;

    resetZoomIcon.onmouseenter = this.resetZoom.bind(this);

    this.iconsContainer.appendChild(resetZoomIcon);
  }

  hideResetZoomIcon() {
    if (!this.resetZoomIcon) return;
    if (this.magnifierIcon) this.enableMagnifierIcon();
    if (this.fullscreenIcon) this.showFullscreenIcon();

    this.resetZoomIcon.style.display = 'none';
  }

  showResetZoomIcon() {
    if (!this.resetZoomIcon) return;
    if (this.magnifierIcon) this.disableMagnifierIcon();
    if (this.fullscreenIcon) this.hideFullscreenIcon();

    this.resetZoomIcon.style.display = 'block';
  }

  addLoader() {
    const loader = document.createElement('div');

    setLoaderStyles(loader);

    this.loader = loader;
    this.innerBox.appendChild(loader);
  }

  addBoxShadow() {
    const boxShadow = document.createElement('div');

    setBoxShadowStyles(boxShadow, this.boxShadow);

    this.innerBox.appendChild(boxShadow);
  }

  removeLoader() {
    if (!this.loader) return;

    this.innerBox.removeChild(this.loader);
    this.loader = null;
  }

  remove360ViewIcon() {
    if (!this.view360Icon) return;

    this.innerBox.removeChild(this.view360Icon);
    this.view360Icon = null;
  }

  play() {
    if (this.bottomCircle) this.hide360ViewCircleIcon();
    this.remove360ViewIcon();

    this.loopTimeoutId = window.setInterval(() => {
      this.loop(this.reversed);

      const isPlayedOnce = (
        (this.reversed && this.activeImage === 1) ||
        (!this.reversed && (this.activeImage === this.amount))
      );

      if (this.playOnce && isPlayedOnce) {
        window.clearTimeout(this.loopTimeoutId);
      }
    }, this.autoplaySpeed);
  }

  stop() {
    if (this.bottomCircle && !this.zoomIntensity) this.show360ViewCircleIcon();
    window.clearTimeout(this.loopTimeoutId);
  }

  getSrc(responsive, container, folder, filename, { ciToken, ciFilters, ciTransformation }) {
    let src = `${folder}${filename}`;

    if (responsive) {
      let imageOffsetWidth = container.offsetWidth;

      if (this.fullscreenView) {
        const containerRatio = container.offsetHeight / container.offsetWidth;

        if (this.ratio > containerRatio) {
          imageOffsetWidth = container.offsetHeight / this.ratio;
        }
      }
  
      const ciSizeNext = getSizeAccordingToPixelRatio(getResponsiveWidthOfContainer(imageOffsetWidth));

      src = `https://${ciToken}.cloudimg.io/v7/${src}?${ciTransformation ? ciTransformation : `width=${ciSizeNext}`}${ciFilters ? `&f=${ciFilters}` : ''}`
    }

    return src;
  }

  preloadImages(
    amount,
    src,
    orientation = ORIENTATIONS.X,
    lazyload,
    lazySelector,
    container,
    responsive,
    ciParams
    ) {
    if (this.imageList) {
      try {
        const images = JSON.parse(this.imageList);

        this.amount = images.length;
        images.forEach((src, index) => {
          const folder = /(http(s?)):\/\//gi.test(src) ? '' : this.folder;
          const resultSrc = this.getSrc(responsive, container, folder, src, ciParams);
          const lastIndex = resultSrc.lastIndexOf('//');
          const originalSrc = resultSrc.slice(lastIndex);

          this.addImage(resultSrc, originalSrc, lazyload, lazySelector, index);
        });
      } catch (error) {
        console.error(`Wrong format in image-list attribute: ${error.message}`);
      }
    } else {
      [...new Array(amount)].map((_item, index) => {
        const nextZeroFilledIndex = pad(index + 1, this.indexZeroBase);
        const resultSrc = src.replace('{index}', nextZeroFilledIndex);
        const lastIndex = resultSrc.lastIndexOf('//');
        const originalSrc = resultSrc.slice(lastIndex);

        this.addImage(
          resultSrc,
          originalSrc,
          orientation,
          lazyload,
          lazySelector,
          index
        );
      });
    }
  }

  addImage(
    resultSrc,
    originalSrc,
    orientation,
    lazyload,
    lazySelector,
    index
    ) {
    const image = new Image();
    const originalImage = new Image();

    if (lazyload && !this.fullscreenView) {
      image.setAttribute('data-src', resultSrc);
      image.className = image.className.length ? image.className + ` ${lazySelector}` : lazySelector;

      if (index === 0) {
        this.lazyloadInitImage = image;
        image.style.position = 'absolute';
        image.style.top = '0';
        image.style.left = '0';
        this.innerBox.appendChild(image);
      }
    } else {
      image.src = resultSrc;
      originalImage.src = originalSrc;
    }

    image.onload = this.onImageLoad.bind(this, index, orientation);
    image.onerror = this.onImageLoad.bind(this, index, orientation);
    
    if (orientation === ORIENTATIONS.Y) {
      this.imagesY.push(image)
      this.originalImagesY.push(originalImage)
    } else {
      this.images.push(image);
      this.originalImages.push(originalImage);
    }
  }

  destroy() {
    stop();

    const oldElement = this.container;
    const newElement = oldElement.cloneNode(true);
    const innerBox = newElement.querySelector('.cloudimage-inner-box');

    newElement.className = newElement.className.replace(' initialized', '');
    newElement.style.position = 'relative';
    newElement.style.width = '100%';
    newElement.style.cursor = 'default';
    newElement.setAttribute('draggable', 'false');
    newElement.style.minHeight = 'auto';
    newElement.removeChild(innerBox);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  initControls() {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
    const prev = this.container.querySelector('.cloudimage-360-prev');
    const next = this.container.querySelector('.cloudimage-360-next');

    if (!prev && !next) return;

    const onLeftStart = (event) => {
      event.stopPropagation();
      this.onSpin();
      this.prev();
      this.loopTimeoutId = window.setInterval(this.prev.bind(this), this.autoplaySpeed);
    };
    const onRightStart = (event) => {
      event.stopPropagation();
      this.onSpin();
      this.next();
      this.loopTimeoutId = window.setInterval(this.next.bind(this), this.autoplaySpeed);
    };
    const onLeftEnd = () => {
      this.onFinishSpin();
      window.clearTimeout(this.loopTimeoutId);
    };
    const onRightEnd = () => {
      this.onFinishSpin();
      window.clearTimeout(this.loopTimeoutId);
    };

    if (prev) {
      prev.style.display = 'block';
      prev.addEventListener('mousedown', isReverse ? onRightStart : onLeftStart);
      prev.addEventListener('touchstart', isReverse ? onRightStart : onLeftStart);
      prev.addEventListener('mouseup', isReverse ? onRightEnd : onLeftEnd);
      prev.addEventListener('touchend', isReverse ? onRightEnd : onLeftEnd);

      this.prevElem = prev;
    }

    if (next) {
      next.style.display = 'block';
      next.addEventListener('mousedown', isReverse ? onLeftStart : onRightStart);
      next.addEventListener('touchstart', isReverse ? onLeftStart : onRightStart);
      next.addEventListener('mouseup', isReverse ? onLeftEnd : onRightEnd);
      next.addEventListener('touchend', isReverse ? onLeftEnd : onRightEnd);

      this.nextElem = next;
    }

    if (isReverse ? next : prev) {
      if (this.stopAtEdges) {
        addClass(isReverse ? next : prev, 'not-active');
      }
    }
  }

  addInnerBox() {
    this.innerBox = document.createElement('div');
    this.innerBox.className = 'cloudimage-inner-box';
    this.container.appendChild(this.innerBox);
  }

  addIconsContainer() {
    this.iconsContainer = document.createElement('div');
    this.iconsContainer.className = 'cloudimage-icons-container';
    setIconsContainerStyles(this.iconsContainer);
    this.innerBox.appendChild(this.iconsContainer);
  }

  addCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.fontSize = '0';

    if (this.ratio) {
      this.container.style.minHeight = this.container.offsetWidth * this.ratio + 'px';
      this.canvas.height = parseInt(this.container.style.minHeight);
    }

    this.innerBox.appendChild(this.canvas);
  }

  attachEvents(draggable, swipeable, keys) {
    if ( (draggable) && (!this.disableDrag) ) {
      this.container.addEventListener('mousedown', this.mouseDown.bind(this));
      this.container.addEventListener('mousemove', this.mouseMove.bind(this));
      document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    if ( (swipeable) && (!this.disableDrag) ) {
      this.container.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
      this.container.addEventListener('touchend', this.touchEnd.bind(this), { passive: true });
      this.container.addEventListener('touchmove', this.touchMove.bind(this));
    }

    if ( (!this.disablePointerZoom) && (!this.fullscreenView) ) {
      this.container.addEventListener('wheel', this.mouseScroll.bind(this));
    }

    if (keys) {
      document.addEventListener('keydown', this.keyDown.bind(this));
      document.addEventListener('keyup', this.keyUp.bind(this));
    } else {
      document.addEventListener('keydown', this.keyDownGeneral.bind(this));
    }
  }

  applyStylesToContainer() {
    this.container.style.position = 'relative';
    this.container.style.width = '100%';
    this.container.style.cursor = 'wait';
    this.container.setAttribute('draggable', 'false');
    this.container.className = `${this.container.className} initialized`;
  }

  setMouseLeaveActions(actions) {
    const mouseLeaveActions = actions.split(',');

    mouseLeaveActions.forEach((action) => this.applyMouseLeaveAction(action));
  }

  applyMouseLeaveAction(action) {
    switch(action) {
      case MOUSE_LEAVE_ACTIONS.resetZoom:
        this.container.addEventListener('mouseleave', this.resetZoom.bind(this));
        break;
    }
  }

  init(container) {
    let {
      folder, filename, imageList, indexZeroBase, amount, imageOffset, draggable = true, swipeable = true, keys, bottomCircle, bottomCircleOffset, boxShadow,
      autoplay, playOnce, pointerZoomFactor, pinchZoomFactor, maxScale, toStartPointerZoom, onMouseLeave, disablePointerZoom = true, disablePinchZoom = true, speed, autoplayReverse, disableDrag = true, fullscreen, magnifier, magnifyInFullscreen, ratio, responsive, ciToken, ciFilters, ciTransformation,
      lazyload, lazySelector, spinReverse, dragSpeed, stopAtEdges, controlReverse, hide360Logo, logoSrc, magnifyIconSelector, fullscreenIconSelector, filenameY, amountY
    } = get360ViewProps(container);

    const ciParams = { ciToken, ciFilters, ciTransformation };

    this.addInnerBox();
    this.addIconsContainer();
    this.addLoader();

    this.folder = folder;
    this.filename = filename;
    this.imageList = imageList;
    this.indexZeroBase = indexZeroBase;
    this.amount = amount;
    this.amountY = amountY;
    this.imageOffset = imageOffset;
    this.bottomCircle = bottomCircle;
    this.bottomCircleOffset = bottomCircleOffset;
    this.boxShadow = boxShadow;
    this.autoplay = autoplay;
    this.playOnce = playOnce;
    this.toStartPointerZoom = toStartPointerZoom,
    this.disablePointerZoom = disablePointerZoom;
    this.disablePinchZoom = disablePinchZoom;
    this.pointerZoomFactor = pointerZoomFactor;
    this.pinchZoomFactor = pinchZoomFactor;
    this.maxScale = maxScale;
    this.speed = speed;
    this.reversed = autoplayReverse;
    this.disableDrag = disableDrag;
    this.fullscreen = fullscreen;
    this.magnifier = !this.isMobile && magnifier ? magnifier : false;
    this.magnifyInFullscreen = magnifyInFullscreen;
    this.lazyload = lazyload;
    this.ratio = ratio;
    this.spinReverse = spinReverse;
    this.controlReverse = controlReverse;
    this.dragSpeed = dragSpeed;
    this.autoplaySpeed = this.speed * 36 / this.amount;
    this.stopAtEdges = stopAtEdges;
    this.hide360Logo = hide360Logo;
    this.logoSrc = logoSrc;

    this.applyStylesToContainer();

    this.addCanvas();

    const src = this.getSrc(responsive, container, folder, filename, ciParams);
    const srcY = this.getSrc(responsive, container, folder, filenameY, ciParams);

    this.preloadImages(
      amount,
      src,
      ORIENTATIONS.X,
      lazyload,
      lazySelector,
      container,
      responsive,
      ciParams
    );

    if(amountY) {
      this.preloadImages(
        amountY,
        srcY,
        ORIENTATIONS.Y,
        lazyload,
        lazySelector,
        container,
        responsive,
        ciParams
      );
    }

    this.attachEvents(draggable, swipeable, keys);

    if (onMouseLeave) this.setMouseLeaveActions(onMouseLeave);
  }
}

export default CI360Viewer;
