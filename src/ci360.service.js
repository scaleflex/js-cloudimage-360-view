import {
  get360ViewProps, set360ViewIconStyles, set360ViewCircleIconStyles, setLoaderStyles, setBoxShadowStyles,
  setView360Icon, contain, magnify, setMagnifyIconStyles, setFullScreenModalStyles,
  setFullScreenIconStyles, setCloseFullScreenViewStyles, getResponsiveWidthOfContainer, getSizeAccordingToPixelRatio
} from './ci360.utils';


class CI360Viewer {
  constructor(container, fullScreen, ratio) {
    this.container = container;
    this.activeImage = 1;
    this.movementStart = 0;
    this.isClicked = false;
    this.loadedImages = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullScreenView = !!fullScreen;
    this.ratio = ratio;
    this.images = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);

    this.init(container);
  }

  mousedown(event) {
    event.preventDefault();

    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay) {
      this.stop();
      this.autoplay = false;
    }

    this.movementStart = event.pageX;
    this.isClicked = true;
    this.container.style.cursor = 'grabbing';
  }

  mouseup() {
    if (!this.imagesLoaded) return;

    this.movementStart = 0;
    this.isClicked = false;
    this.container.style.cursor = 'grab';

    if (this.bottomCircle) {
      this.show360ViewCircleIcon();
    }
  }

  mousemove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    this.onMove(event.pageX);
  }

  touchstart(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay) {
      this.stop();
      this.autoplay = false;
    }

    this.movementStart = event.touches[0].clientX;
    this.isClicked = true;
  }

  touchend() {
    if (!this.imagesLoaded) return;

    this.movementStart = 0;
    this.isClicked = false;

    if (this.bottomCircle) this.show360ViewCircleIcon();
  }

  touchmove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    this.onMove(event.touches[0].clientX);
  }

  keydownGeneral() {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }
  }

  keydown(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if ([37, 39].includes(event.keyCode)) {
      const reversed = 37 === event.keyCode;

      reversed ? this.prev() : this.next();

      if (this.bottomCircle) {
        this.hide360ViewCircleIcon();
      }

      if (this.view360Icon) {
        this.remove360ViewIcon();
      }

      if (this.autoplay) {
        this.stop();
        this.autoplay = false;
      }

      this.loopTimeoutId = window.setTimeout(() => {
        this.loop(reversed);
      }, 300);
    }
  }

  keyup(event) {
    if (!this.imagesLoaded) return;

    if ([37, 39].includes(event.keyCode)) {
      if (this.bottomCircle) this.show360ViewCircleIcon();
      window.clearTimeout(this.loopTimeoutId);
    }
  }

  onMove(pageX) {
    if (pageX - this.movementStart >= this.speedFactor) {
      let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;

      this.movementStart = pageX;

      if (this.spinReverse) {
        this.moveActiveIndexDown(itemsSkippedRight);
      } else {
        this.moveActiveIndexUp(itemsSkippedRight);
      }

      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.update(this.activeImage);
    } else if (this.movementStart - pageX >= this.speedFactor) {
      let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;

      this.movementStart = pageX;

      if (this.spinReverse) {
        this.moveActiveIndexUp(itemsSkippedLeft);
      } else {
        this.moveActiveIndexDown(itemsSkippedLeft);
      }

      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.update(this.activeImage);
    }
  }

  moveActiveIndexUp(itemsSkipped) {
    this.activeImage = (this.activeImage + itemsSkipped) % this.amount || 1;
  }

  moveActiveIndexDown(itemsSkipped) {
    if (this.activeImage - itemsSkipped < 1) {
      this.activeImage = this.amount + (this.activeImage - itemsSkipped);
    } else {
      this.activeImage = this.activeImage - itemsSkipped;
    }
  }

  loop(reversed) {
    reversed ? this.prev() : this.next();
  }

  next() {
    this.activeImage = this.activeImage % this.amount + 1;

    this.update(this.activeImage);
  }

  prev() {
    if (this.activeImage - 1 === 0) {
      this.activeImage = this.amount;
    } else {
      this.activeImage -= 1;
    }

    this.update(this.activeImage);
  }

  update(activeImage) {
    const image = this.images[activeImage - 1];
    const ctx = this.canvas.getContext("2d");

    ctx.scale(this.devicePixelRatio,this.devicePixelRatio);

    if (this.fullScreenView) {
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

      ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }
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
    this.removeLoader();

    if (!this.fullScreenView) {
      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * this.container.offsetWidth / 1500) || 1;
    } else {
      const containerRatio = this.container.offsetHeight / this.container.offsetWidth;
      let imageOffsetWidth = this.container.offsetWidth;

      if (this.ratio > containerRatio) {
        imageOffsetWidth = this.container.offsetHeight / this.ratio;
      }

      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * imageOffsetWidth / 1500) || 1;
    }

    if (this.autoplay) {
      this.play();
    }

    if (this.view360Icon) {
      this.view360Icon.innerText = '';
      setView360Icon(this.view360Icon);
    }
  }

  onFirstImageLoaded(event) {
    this.add360ViewIcon();

    if (this.fullScreenView) {
      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      const ctx = this.canvas.getContext("2d");

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, event.target.width, event.target.height);

      ctx.drawImage(event.target, offsetX, offsetY, width, height);
    } else {
      this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
      this.canvas.style.width = this.container.offsetWidth + 'px';
      this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / event.target.width * event.target.height;
      this.canvas.style.height = this.container.offsetWidth / event.target.width * event.target.height + 'px';

      const ctx = this.canvas.getContext("2d");

      ctx.drawImage(event.target, 0, 0, this.canvas.width, this.canvas.height);
    }

    if (this.lazyload && !this.fullScreenView) {
      this.images
        .forEach((image, index) => {
          if (index === 0) {
            this.container.removeChild(this.lazyloadInitImage);
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

    if (this.magnifier && !this.fullScreenView) {
      this.addMagnifier();
    }

    if (this.boxShadow && !this.fullScreenView) {
      this.addBoxShadow();
    }

    if (this.bottomCircle && !this.fullScreenView) {
      this.add360ViewCircleIcon();
    }

    if (this.fullScreen && !this.fullScreenView) {
      this.addFullScreenIcon();
    } else if (this.fullScreenView) {
      this.addCloseFullScreenView();
    }
  }

  onImageLoad(event) {
    const percentage = Math.round(this.loadedImages / this.amount * 100);

    this.loadedImages += 1;
    this.updatePercentageInLoader(percentage);

    if (this.loadedImages === this.amount) {
      this.onAllImagesLoaded(event);
    } else if (this.loadedImages === 1) {
      this.onFirstImageLoaded(event);
    }
  }

  addCloseFullScreenView() {
    const closeFullScreenIcon = document.createElement('div');

    setCloseFullScreenViewStyles(closeFullScreenIcon);

    closeFullScreenIcon.onclick = this.closeFullScreenModal.bind(this);

    this.container.appendChild(closeFullScreenIcon);
  }

  add360ViewIcon() {
    const view360Icon = document.createElement('div');

    set360ViewIconStyles(view360Icon);

    view360Icon.innerText = '0%';

    this.view360Icon = view360Icon;
    this.container.appendChild(view360Icon);
  }

  addFullScreenIcon() {
    const fullScreenIcon = document.createElement('div');

    setFullScreenIconStyles(fullScreenIcon);

    fullScreenIcon.onclick = this.openFullScreenModal.bind(this);

    this.container.appendChild(fullScreenIcon);
  }

  addMagnifier() {
    const magnifyIcon = document.createElement('div');

    setMagnifyIconStyles(magnifyIcon, this.fullScreen);

    magnifyIcon.onclick = this.magnify.bind(this);

    this.container.appendChild(magnifyIcon);
  }

  magnify() {
    const src = `${this.folder}${this.filename.replace('{index}', this.activeImage)}`;
    const image = new Image();

    image.src = src;
    image.onload = () => {
      if (this.glass) {
        this.glass.style.cursor = 'none';
      }
    };

    this.glass = document.createElement('div');
    this.container.style.overflow = 'hidden';
    magnify(this.container, this.container.children[this.activeImage], src, this.glass, this.magnifier || 3);
  }

  closeMagnifier() {
    if (!this.glass) return;

    this.container.style.overflow = 'visible';
    this.container.removeChild(this.glass);
    this.glass = null;
  }

  openFullScreenModal() {
    const fullScreenModal = document.createElement('div');

    setFullScreenModalStyles(fullScreenModal);

    const fullScreenContainer = this.container.cloneNode();
    const image = this.images[0];
    const ratio = image.height / image.width;

    fullScreenContainer.style.height = '100%';
    fullScreenContainer.style.maxHeight = '100%';

    fullScreenModal.appendChild(fullScreenContainer);

    window.document.body.appendChild(fullScreenModal);

    new CI360Viewer(fullScreenContainer, true, ratio);
  }

  closeFullScreenModal() {
    document.body.removeChild(this.container.parentNode);
  }

  add360ViewCircleIcon() {
    const view360CircleIcon = new Image();

    set360ViewCircleIconStyles(view360CircleIcon, this.bottomCircleOffset);

    this.view360CircleIcon = view360CircleIcon;
    this.container.appendChild(view360CircleIcon);
  }

  hide360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = 0;
  }

  show360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.view360CircleIcon.style.opacity = 1;
  }

  remove360ViewCircleIcon() {
    if (!this.view360CircleIcon) return;

    this.container.removeChild(this.view360CircleIcon);
    this.view360CircleIcon = null;
  }

  addLoader() {
    const loader = document.createElement('div');

    setLoaderStyles(loader);

    this.loader = loader;
    this.container.appendChild(loader);
  }

  addBoxShadow() {
    const boxShadow = document.createElement('div');

    setBoxShadowStyles(boxShadow, this.boxShadow);

    this.container.appendChild(boxShadow);
  }

  removeLoader() {
    if (!this.loader) return;

    this.container.removeChild(this.loader);
    this.loader = null;
  }

  remove360ViewIcon() {
    if (!this.view360Icon) return;

    this.container.removeChild(this.view360Icon);
    this.view360Icon = null;
  }

  play() {
    if (this.bottomCircle) this.hide360ViewCircleIcon();
    this.remove360ViewIcon();

    this.loopTimeoutId = window.setInterval(() => {
      this.loop(this.reversed);
    }, this.speed * 36 / this.amount);
  }

  stop() {
    if (this.bottomCircle) this.show360ViewCircleIcon();
    window.clearTimeout(this.loopTimeoutId);
  }

  getSrc(responsive, container, folder, filename, ciSize, ciToken, ciOperation, ciFilters) {
    let src = `${folder}${filename}`;

    if (responsive) {
      let imageOffsetWidth = container.offsetWidth;

      if (this.fullScreenView) {
        const containerRatio = container.offsetHeight / container.offsetWidth;

        if (this.ratio > containerRatio) {
          imageOffsetWidth = container.offsetHeight / this.ratio;
        }
      }

      const ciSizeNext = getSizeAccordingToPixelRatio(ciSize || getResponsiveWidthOfContainer(imageOffsetWidth));

      src = `https://${ciToken}.cloudimg.io/${ciOperation}/${ciSizeNext}/${ciFilters}/${src}`;
    }

    return src;
  }

  preloadImages(amount, src, lazyload, lazySelector) {
    [...new Array(amount)].map((item, index) => {
      const image = new Image();
      const resultSrc = src.replace('{index}', index + 1);

      if (lazyload && !this.fullScreenView) {
        image.setAttribute('data-src', resultSrc);
        image.className = image.className.length ? image.className + ` ${lazySelector}` : lazySelector;

        if (index === 0) {
          this.lazyloadInitImage = image;
          image.style.position = 'absolute';
          image.style.top = '0';
          image.style.left = '0';
          this.container.appendChild(image);
        }
      } else {
        image.src = resultSrc;
      }

      image.onload = this.onImageLoad.bind(this);
      image.onerror = this.onImageLoad.bind(this);

      this.images.push(image);
    });
  }

  destroy() {
    stop();

    const oldElement = this.container;
    const newElement = oldElement.cloneNode(false);

    newElement.className = newElement.className.replace(' initialized', '');
    newElement.style.position = 'relative';
    newElement.style.width = '100%';
    newElement.style.cursor = 'default';
    newElement.setAttribute('draggable', 'false');
    newElement.style.minHeight = 'auto';
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  init(container) {
    let {
      folder, filename, amount, draggable = true, swipeable = true, keys, bottomCircle, bottomCircleOffset, boxShadow,
      autoplay, speed, autoplayReverse, fullScreen, magnifier, ratio, responsive, ciToken, ciSize, ciOperation,
      ciFilters, lazyload, lazySelector, spinReverse, dragSpeed
    } = get360ViewProps(container);

    this.addLoader();

    this.folder = folder;
    this.filename = filename;
    this.amount = amount;
    this.bottomCircle = bottomCircle;
    this.bottomCircleOffset = bottomCircleOffset;
    this.boxShadow = boxShadow;
    this.autoplay = autoplay && !this.isMobile;
    this.speed = speed;
    this.reversed = autoplayReverse;
    this.fullScreen = fullScreen;
    this.magnifier = !this.isMobile && magnifier ? magnifier : false;
    this.lazyload = lazyload;
    this.ratio = ratio;
    this.spinReverse = spinReverse;
    this.dragSpeed = dragSpeed;

    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.cursor = 'wait';
    container.setAttribute('draggable', 'false');
    container.className = `${container.className} initialized`;

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.fontSize = '0';

    if (ratio) {
      container.style.minHeight = container.offsetWidth * ratio + 'px';
      this.canvas.height = container.style.minHeight;
    }

    this.container.appendChild(this.canvas);

    let src = this.getSrc(responsive, container, folder, filename, ciSize, ciToken, ciOperation, ciFilters);

    this.preloadImages(amount, src, lazyload, lazySelector);

    if (draggable) {
      container.addEventListener('mousedown', this.mousedown.bind(this));
      container.addEventListener('mouseup', this.mouseup.bind(this));
      container.addEventListener('mousemove', this.mousemove.bind(this));
    }

    if (swipeable) {
      container.addEventListener('touchstart', this.touchstart.bind(this), { passive: true });
      container.addEventListener('touchend', this.touchend.bind(this), { passive: true });
      container.addEventListener('touchmove', this.touchmove.bind(this));
    }

    if (keys) {
      document.addEventListener('keydown', this.keydown.bind(this));
      document.addEventListener('keyup', this.keyup.bind(this));
    } else {
      document.addEventListener('keydown', this.keydownGeneral.bind(this));
    }
  }
}

export default CI360Viewer;