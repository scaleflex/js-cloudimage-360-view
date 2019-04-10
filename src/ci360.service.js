import {
  get360ViewProps, set360ViewIconStyles, set360ViewCircleIconStyles, setLoaderStyles, setBoxShadowStyles,
  setView360Icon, setFullScreenImageStyles, magnify, setMagnifyIconStyles, setFullScreenModalStyles,
  setFullScreenIconStyles, setCloseFullScreenViewStyles, getResponsiveWidthOfContainer, getSizeAccordingToPixelRatio
} from './ci360.utils';

class CI360Viewer {
  constructor(container, fullScreen, ratio) {
    this.container = container;
    this.activeImage = 1;
    this.previousActiveImage = 1;
    this.movementStart = 0;
    this.isClicked = false;
    this.loadedImages = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullScreenView = !!fullScreen;
    this.ratio = ratio

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

    event.preventDefault();
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
    if (pageX - this.movementStart > this.speedFactor) {
      const itemsSkipped = Math.floor((event.pageX - this.movementStart) / this.speedFactor) || 1;

      this.movementStart = pageX;
      this.previousActiveImage = this.activeImage;

      this.activeImage = (this.activeImage + itemsSkipped) % this.amount || 1;

      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.update(this.activeImage);
    } else if (pageX - this.movementStart <= -this.speedFactor) {
      const itemsSkipped = Math.abs(Math.floor((pageX - this.movementStart) / this.speedFactor)) || 1;

      this.movementStart = pageX;
      this.previousActiveImage = this.activeImage;

      if (this.activeImage - itemsSkipped < 1) {
        this.activeImage = this.amount + (this.activeImage - itemsSkipped);
      } else {
        this.activeImage = this.activeImage - itemsSkipped;
      }

      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.update(this.activeImage);
    }
  }

  loop(reversed) {
    reversed ? this.prev() : this.next();
  }

  next() {
    this.previousActiveImage = this.activeImage;
    this.activeImage = this.activeImage % this.amount + 1;

    this.update(this.activeImage);
  }

  prev() {
    this.previousActiveImage = this.activeImage;
    if (this.activeImage - 1 === 0) {
      this.activeImage = this.amount;
    } else {
      this.activeImage -= 1;
    }

    this.update(this.activeImage);
  }

  update(activeImage) {
    const prevImage = this.container.children[this.previousActiveImage - 1];
    const nextImage = this.container.children[activeImage - 1];

    prevImage.style.display = 'none';
    nextImage.style.display = 'block';
  }

  onImageLoad() {
    this.loadedImages += 1;

    const percentage = Math.round(this.loadedImages / this.amount * 100);

    if (this.loader) {
      this.loader.style.width = percentage + '%';
    }

    if (this.view360Icon) {
      this.view360Icon.innerText = percentage + '%';
    }

    if (this.loadedImages === this.amount) {
      this.imagesLoaded = true;
      this.container.style.cursor = 'grab';
      this.removeLoader();

      if (!this.fullScreenView) {
        this.speedFactor = Math.floor(36 / this.amount * 25 * this.container.offsetWidth / 1500) || 1;
      } else {
        const containerRatio = this.container.offsetHeight / this.container.offsetWidth;
        let imageOffsetWidth = this.container.offsetWidth;

        if (this.ratio > containerRatio) {
          imageOffsetWidth = this.container.offsetHeight / this.ratio;
        }

        this.speedFactor = Math.floor(36 / this.amount * 25 * imageOffsetWidth / 1500) || 1;
      }

      if (this.autoplay) {
        this.play();
      }

      if (this.view360Icon) {
        this.view360Icon.innerText = '';
        setView360Icon(this.view360Icon);
      }

    } else if (this.loadedImages === 1) {
      this.add360ViewIcon();

      if (this.lazyload) {
        [].slice.call(this.container.children)
          .filter(image => image.nodeName === 'IMG')
          .forEach((image, index) => {
          if (index === 0) return;

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
    const image = this.container.children[0];
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

  init(container) {
    let {
      folder, filename, amount, draggable = true, swipeable = true, keys, bottomCircle, bottomCircleOffset, boxShadow,
      autoplay, speed, autoplayReverse, fullScreen, magnifier, ratio, responsive, ciToken, ciSize, ciOperation,
      ciFilters, lazyload, lazySelector
    } = get360ViewProps(container);

    this.addLoader();

    [...new Array(amount)].map((item, index) => {
      const image = new Image();
      let src = `${folder}${filename.replace('{index}', index + 1)}`;

      if (responsive) {
        let imageOffsetWidth = container.offsetWidth;

        if (this.fullScreenView) {
          const containerRatio = this.container.offsetHeight / this.container.offsetWidth;

          if (this.ratio > containerRatio) {
            imageOffsetWidth = this.container.offsetHeight / this.ratio;
          }
        }

        const ciSizeNext = getSizeAccordingToPixelRatio(ciSize || getResponsiveWidthOfContainer(imageOffsetWidth));

        src = `https://${ciToken}.cloudimg.io/${ciOperation}/${ciSizeNext}/${ciFilters}/${src}`;
      }

      if (lazyload) {
        image.setAttribute('data-src', src);
        image.className = image.className.length ? image.className + ` ${lazySelector}` : lazySelector;
      } else {
        image.src = src;
      }

      image.style.height = 'auto';
      image.style.width = '100%';
      image.style.display = index === 0 ? 'block' : 'none';
      image.onload = this.onImageLoad.bind(this);
      image.onerror = this.onImageLoad.bind(this);

      this.folder = folder;
      this.filename = filename;
      this.amount = amount;
      this.bottomCircle = bottomCircle;
      this.bottomCircleOffset = bottomCircleOffset;
      this.boxShadow = boxShadow;
      this.autoplay = autoplay;
      this.speed = speed;
      this.reversed = autoplayReverse;
      this.fullScreen = fullScreen;
      this.magnifier = magnifier;
      this.lazyload = lazyload;

      container.style.position = 'relative';
      container.style.cursor = 'wait';

      if (this.fullScreenView) {
        const imageBackground = document.createElement('div');
        setFullScreenImageStyles(imageBackground, src, index);
        container.appendChild(imageBackground);
      } else {
        this.ratio = ratio;

        if (ratio) {
          container.style.minHeight = container.offsetWidth * ratio + 'px';
        }

        container.appendChild(image);
      }
    });

    if (draggable) {
      container.addEventListener('mousedown', this.mousedown.bind(this));
      container.addEventListener('mouseup', this.mouseup.bind(this));
      container.addEventListener('mousemove', this.mousemove.bind(this));
    }

    if (swipeable) {
      container.addEventListener('touchstart', this.touchstart.bind(this));
      container.addEventListener('touchend', this.touchend.bind(this));
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