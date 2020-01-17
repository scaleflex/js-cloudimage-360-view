'use strict';

import 'custom-event-polyfill';
import {
  getAttr,
  magnify,
  getClientHitPoint,
  isTrue,
  setDefault,
  contain,
} from "../utils/dom-helper";
import {
  IMAGE,
  FULLSCREEN_BUTTON,
  MAGNIFIER_BUTTON,
  IMG_MAGNIFIER_GLASS,
  BOTTOM_CIRCLE,
  CONTROLS,
  TOP_MENU,
  PREVIEW_ICON,
  TOP_LOADER,
  CENTER_LOADER,
} from './classes';
import { CONTAINER } from "../core/classes";
import { BOTTOM_CIRCLE_IMAGE_SRC, EVENTS } from "./constants";

import { getPercentage } from "../utils/number-helper";
import { KEYCODES } from '../utils/keys';
import { Core } from '../core';
import { EventEmitter } from '../utils/event-emitter';
import './stylesheets/main.scss';

export class Viewer {
  /**
   * @param {HTMLElement} container 
   */
  constructor(container) {
    this.container = container;

    this.folder = getAttr(container, 'folder') || getAttr(container, 'data-folder') || '/';
    this.fileNamePattern = getAttr(container, 'filename') || getAttr(container, 'data-filename') || 'container-{index}.jpg';
    this.indexZeroBase = parseInt(getAttr(container, 'index-zero-base') || getAttr(container, 'data-index-zero-base') || 1, 10);
    this.colsAmount = parseInt(getAttr(container, 'amount') || getAttr(container, 'data-amount') || 36, 10);
    this.rowsAmount = parseInt(getAttr(container, 'rows-amount') || getAttr(container, 'data-rows-amount') || 1, 10);
    this.speed = parseInt(getAttr(container, 'speed') || getAttr(container, 'data-speed') || 80, 10);
    this.dragSpeed = parseInt(getAttr(container, 'drag-speed') || getAttr(container, 'data-drag-speed') || 150, 10);
    this.keys = isTrue(getAttr(container, 'keys') || getAttr(container, 'data-keys'));
    this.container.style.boxShadow = getAttr(container, 'box-shadow') || getAttr(container, 'data-box-shadow');
    this.autoplay = isTrue(getAttr(container, 'autoplay') || getAttr(container, 'data-autoplay'));
    this.autoplaySpeed = this.speed * 36 / this.colsAmount;
    this.bottomCircle = isTrue(getAttr(container, 'bottom-circle') || getAttr(container, 'data-bottom-circle'));
    this.fullScreen = isTrue(getAttr(container, 'full-screen') || getAttr(container, 'data-full-screen'));
    this.magnifier = (getAttr(container, 'magnifier') || getAttr(container, 'data-magnifier')) &&
      parseInt(getAttr(container, 'magnifier') || getAttr(container, 'data-magnifier'), 10) || 3;

    this.bottomCircleOffset = parseInt(getAttr(container, 'bottom-circle-offset') || getAttr(container, 'data-bottom-circle-offset') || 5, 10);
    this.responsive = isTrue(getAttr(container, 'responsive') || getAttr(container, 'data-responsive'));
    this.ciToken = getAttr(container, 'responsive') || getAttr(container, 'data-responsive') || 'demo';
    this.ciSize = getAttr(container, 'size') || getAttr(container, 'data-size');
    this.ciOperation = getAttr(container, 'operation') || getAttr(container, 'data-operation') || 'width';
    this.ciFilters = getAttr(container, 'filters') || getAttr(container, 'data-filters') || 'q35';
    this.preloadImages = isTrue(setDefault(getAttr(container, 'preload-images') || getAttr(container, 'data-preload-images'), true));
    this.spinReverse = isTrue(getAttr(container, 'spin-reverse') || getAttr(container, 'data-spin-reverse'));
    this.controlReverse = isTrue(getAttr(container, 'control-reverse') || getAttr(container, 'data-control-reverse'));
    this.showControls = isTrue(getAttr(container, 'controls') || getAttr(container, 'data-controls'));
    this.stopAtEdges = isTrue(getAttr(container, 'stop-at-edges') || getAttr(container, 'data-stop-at-edges'));
    this.dragSensitivity = getAttr(container, 'drag-sensitivity') || getAttr(container, 'data-drag-sensitivity') || 1;
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);

    this.setInitialFlags();
    this.setBindings();

    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this._colIndex = this.indexZeroBase;
    this._rowIndex = this.indexZeroBase;

    this.maxColIndex = this.colsAmount - 1;
    this.maxRowIndex = this.rowsAmount - 1;

    this.cachedImages = {}; //using it as key-value pair

    this.isMobile = Boolean('ontouchstart' in window || navigator.maxTouchPoints);
    this.isInitalized = false;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  setBindings() {
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.onControlDown = this._onControlDown.bind(this);
    this.onControlUp = this._onControlUp.bind(this);

    this.onAddFullscreenButtonClick = this._onAddFullscreenButtonClick.bind(this);
    this.onAddMagnifierButtonClick = this._onAddMagnifierButtonClick.bind(this);


    this.onGoLeftDown = this._onGoLeftDown.bind(this);
    this.onGoLeftClick = this._onGoLeftClick.bind(this);
    this.onGoLeftUp = this._onGoLeftUp.bind(this);

    this.onGoRightDown = this._onGoRightDown.bind(this);
    this.onGoRightClick = this._onGoRightClick.bind(this);
    this.onGoRightUp = this._onGoRightUp.bind(this);
  }

  get colIndex() {
    return this._colIndex;
  }

  set colIndex(value) {
    if (this.stopAtEdges && (value < this.indexZeroBase || value > this.maxColIndex)) { return; }

    if (value < this.indexZeroBase) { this._colIndex = this.maxColIndex; }
    else if (value > this.maxColIndex) { this._colIndex = this.indexZeroBase; }
    else { this._colIndex = value; }

    this.changeImage();
    this.updateControls();
    this.eventEmitter.emit(EVENTS.SPINNING);
  }

  get rowIndex() {
    return this._rowIndex;
  }

  set rowIndex(value) {
    if (this.stopAtEdges && (value < this.indexZeroBase || value > this.maxRowIndex)) { return; }

    if (value < this.indexZeroBase) { this._rowIndex = this.maxRowIndex; }
    else if (value > this.maxRowIndex) { this._rowIndex = this.indexZeroBase; }
    else { this._rowIndex = value; }

    this.changeImage();
    this.updateControls();
    this.eventEmitter.emit(EVENTS.SPINNING);
  }

  get isBottomCircleVisible() {
    return Boolean(this.bottomCircleContainer) && this.bottomCircleContainer.classList.contains(BOTTOM_CIRCLE.HIDDEN) == false;
  }

  get isPreviewIconVisible() {
    return Boolean(this.previewIcon) && this.previewIcon.classList.contains(PREVIEW_ICON.HIDDEN) == false;
  }

  get isGoLeftDisabled() {
    return Boolean(this.controlsGoLeft) && this.controlsGoLeft.classList.contains(CONTROLS.DISABLED);
  }

  get isGoRightDisabled() {
    return Boolean(this.controlsGoRight) && this.controlsGoRight.classList.contains(CONTROLS.DISABLED);
  }

  get isTopLoaderVisible() {
    return Boolean(this.topLoader) && this.topLoader.classList.contains(TOP_LOADER.HIDDEN) == false;
  }

  get isCenterLoaderVisible() {
    return Boolean(this.centerLoader) && this.centerLoader.classList.contains(CENTER_LOADER.HIDDEN) == false;
  }

  init() {
    this.addCanvas();
    this.changeImage();// sets the initial image
    this.addLoaders();
    this.eventEmitter.addListener(EVENTS.LOADING, this.container, this.loadingEventHandler.bind(this));
    this.eventEmitter.addListener(EVENTS.INITIALIZING_FINISHED, this.container, this.initializingFinishedEventHandler.bind(this));
    this.eventEmitter.addListener(EVENTS.CONTAINER_RESIZED, this.container, this.resizeDebounced.bind(this));
    this.initializing(0);

    if (this.fullScreen || this.magnifier) {
      this.addMenu();
    }

    if (this.showControls) {
      this.addControls();
    }

    if (!this.autoplay) {
      this.addPreviewIcon();
    }

    if (this.bottomCircle) {
      this.addBottomCircle();
    }

    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.container, (() => {
      this.container.addEventListener('mousemove', this.onMouseMove);
      this.container.addEventListener('touchmove', this.onMouseMove);

      this.container.addEventListener('mouseup', this.onMouseUp);
      this.container.addEventListener('touchend', this.onMouseUp);

      this.container.addEventListener('mousedown', this.onMouseDown);
      this.container.addEventListener('touchstart', this.onMouseDown);

      if (this.keys) {
        this.container.addEventListener('keydown', this.onControlDown);
        this.container.addEventListener('keyup', this.onControlUp);
      }
    }).bind(this));

    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.container, (() => {
      this.container.removeEventListener('mousemove', this.onMouseMove);
      this.container.removeEventListener('touchmove', this.onMouseMove);

      this.container.removeEventListener('mouseup', this.onMouseUp);
      this.container.removeEventListener('touchend', this.onMouseUp);

      this.container.removeEventListener('mousedown', this.onMouseDown);
      this.container.removeEventListener('touchstart', this.onMouseDown);

      if (this.keys) {
        this.container.removeEventListener('keydown', this.onControlDown);
        this.container.removeEventListener('keyup', this.onControlUp);
      }
    }).bind(this));

    if (this.preloadImages) {
      this.preloadAllImages();
    } else {
      this.initializing(100);
    }
  }

  destroy() {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    Core.removeViewer(this);
    this.container.classList.remove(CONTAINER.INITIALIZED);
    this.isInitalized = false;
  }

  /**@param {Number} percentage */
  initializing(percentage) {
    this.eventEmitter.emit(EVENTS.LOADING, {
      percentage,
      onComplete: (() => {
        this.eventEmitter.emit(EVENTS.INITIALIZING_FINISHED);
      }).bind(this)
    });
  }

  initializingFinishedEventHandler() {
    if (this.autoplay) {
      this.startAutoSpinning();
    }

    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.container.classList.add(CONTAINER.INITIALIZED);
    this.isInitalized = true;
  }

  loadingEventHandler({ detail: { percentage, onComplete } }) {
    if (!this.isLoading) {
      this.eventEmitter.emit(EVENTS.LOADING_STARTED);
      this.isLoading = true;
    }
    if (!this.isTopLoaderVisible) {
      this.showTopLoader();
    }
    if (!this.isCenterLoaderVisible) {
      this.showCenterLoader();
    }

    this.setTopLoaderPercentage(percentage);
    this.setCenterLoaderPercentage(percentage);

    if (percentage >= 100) {
      this.isLoading = false;
      this.eventEmitter.emit(EVENTS.LOADING_COMPLETED);

      if (typeof onComplete === 'function')
        onComplete();
    }
  }

  addCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add(IMAGE.INDEX);
    this.canvas.draggable = false;
    this.container.appendChild(this.canvas);
  }

  /**
   * @param {Object} options 
   * @param {Boolean} options.goLeft 
   * @param {Boolean} options.goRight 
   * @param {Boolean} options.goUp 
   * @param {Boolean} options.goDown 
   */
  updateIndexes({ goLeft = false, goRight = false, goUp = false, goDown = false } = {}) {
    if (this.isDraggingUp || goUp) {
      this.controlReverse ? this.rowIndex++ : this.rowIndex--;
    }
    if (this.isDraggingDown || goDown) {
      this.controlReverse ? this.rowIndex-- : this.rowIndex++;
    }

    if (this.isDraggingLeft || goLeft) {
      this.controlReverse ? this.colIndex++ : this.colIndex--;
    }
    if (this.isDraggingRight || goRight) {
      this.controlReverse ? this.colIndex-- : this.colIndex++;
    }
  }

  onResize() {
    if (this.responsive && this.preloadImages) {
      this.stopAutoSpinning();
      this.preloadAllImages();

      if (this.autoplay) {
        this.startAutoSpinning();
      }
    }
  }

  onWindowResize() {
    this.eventEmitter.emit(EVENTS.CONTAINER_RESIZED);
  }

  resizeDebounced() {
    const { width, height } = this.container.getBoundingClientRect();
    if (this.containerWidth === width && this.containerHeight === height) { return; }

    this.changeImage();

    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.onResize.bind(this), 1000);
  }

  _onMouseUp() {
    this.setInitialFlags();
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  _onMouseDown() {
    this.isMouseDown = true;

    if (this.autoplay) {
      this.stopAutoSpinning();
    }

    if (this.previewIcon) {
      this.removePreviewIcon();
    }
  }

  _onMouseMove(event) {
    const { clientX, clientY } = getClientHitPoint(event);

    const distanceX = Math.abs(Math.abs(clientX) - Math.abs(this.prevMouseX));
    const distanceY = Math.abs(Math.abs(clientY) - Math.abs(this.prevMouseY));
    const minX = (this.container.clientWidth * this.dragSensitivity) / 100
    const minY = (this.container.clientHeight * this.dragSensitivity) / 100

    if (this.prevMouseX !== undefined && this.prevMouseY != undefined) {
      this.isDraggingLeft = this.isMouseDown && clientX < this.prevMouseX;
      this.isDraggingRight = this.isMouseDown && clientX > this.prevMouseX;

      this.isDraggingUp = this.isMouseDown && clientY < this.prevMouseY;
      this.isDraggingDown = this.isMouseDown && clientY > this.prevMouseY;
    }

    if (distanceX > minX || distanceY > minY) {
      this.prevMouseX = clientX;
      this.prevMouseY = clientY;

      this.updateIndexes();
    }
  }

  _onControlDown(event) {
    if (this.magnifierGlass) {
      this.removeMagnifierGlass();
    }

    switch (event.keyCode) {
      case KEYCODES.LEFT_ARROW:
        this.updateIndexes({ goLeft: true });
        break;
      case KEYCODES.RIGHT_ARROW:
        this.updateIndexes({ goRight: true });
        break;
    }
  }

  _onControlUp() {
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  setInitialFlags() {
    this.isMouseDown = false;
    this.isDraggingUp = false;
    this.isDraggingDown = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
  }

  changeImage() {
    this.currentImageSrc = this.getImageSrc();
    if (this.cachedImages[this.currentImageSrc]) {
      this.onImageLoad(this.currentImageSrc);
    } else {
      this.cacheImage(this.currentImageSrc, this.onImageLoad.bind(this, this.currentImageSrc));
    }
  }

  /**
   * @param {Number} col 
   * @param {Number} row 
   * @returns {String} file name
   */
  getImageFileName(col, row) {
    let file = this.fileNamePattern;

    file = file.replace('{index}', col);
    file = file.replace('{row}', row);
    file = file.replace('{col}', col);

    return file;
  }

  /** @param {String} src
   * @param {Function} callback
  */
  cacheImage(src, callback) {
    if (this.cachedImages[src]) { return; }

    const image = new Image();
    image.src = src;
    image.onload = this.onImageCached.bind(this, { callback, image, src });
    image.onerror = this.onCachingError.bind(this, src, callback);
  }

  onCachingError(src, callback) {
    setTimeout(this.cacheImage.bind(this, src, callback), 10000);
  }

  /**
   * @param {Object} params 
   * @param {Function} params.callback 
   * @param {String} params.src 
   */
  onImageCached({ callback, image, src }) {
    this.cachedImages[src] = image; // save the image instance to preserve it from the garbage collector(prevents countless network requests) 

    const loaderPercentage = getPercentage(this.rowsAmount * this.colsAmount, Object.keys(this.cachedImages).length);
    if (this.isInitalized) {
      this.eventEmitter.emit(EVENTS.LOADING, { percentage: loaderPercentage });
    } else {
      this.initializing(loaderPercentage);
    }

    if (typeof callback === 'function') {
      callback();
    }
  }

  preloadAllImages() {
    this.cachedImages = {};

    for (let row = this.indexZeroBase; row <= this.rowsAmount; row++) {
      for (let col = this.indexZeroBase; col <= this.colsAmount; col++) {
        this.cacheImage(this.getImageSrc(col, row));
      }
    }
  }

  /**
 * @param {Number} col 
 * @param {Number} row 
 * @returns {String}
 */
  getImageSrc(col = this.colIndex, row = this.rowIndex) {
    const filename = this.getImageFileName(col, row);

    const url = `${this.folder}${filename}`;
    let src = url;

    if (this.responsive) {
      const ciSizeNext = this.container.clientWidth;

      src = `https://${this.ciToken}.cloudimg.io/${this.ciOperation}/${ciSizeNext}/${this.ciFilters}/${url}`;
    }

    return src;
  }

  onImageLoad(src) {
    const image = this.cachedImages[src];
    const ctx = this.canvas.getContext('2d');
    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;

    this.canvas.width = containerWidth;
    this.canvas.style.width = `${containerWidth}px`;

    if (this.fullScreen) {
      this.canvas.height = containerHeight;
      this.canvas.style.height = `${containerHeight}px`;

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, image.width, image.height);

      ctx.drawImage(image, offsetX, offsetY, width, height);
    } else {
      this.canvas.height = containerWidth / image.width * image.height;
      this.canvas.style.height = `${containerWidth / image.width * image.height}px`;

      ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

  autoSpin() {
    if (this.spinReverse) {
      this.colIndex++;
    } else {
      this.colIndex--;
    }
  }

  startAutoSpinning() {
    this.autoplay = true;
    this.autoplayInterval = setInterval(this.autoSpin.bind(this), this.autoplaySpeed);
    this.eventEmitter.emit(EVENTS.SPINNING);
  }

  stopAutoSpinning() {
    clearInterval(this.autoplayInterval);
    this.autoplay = false;
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  addFullScreenButton() {
    this.fullscreenButton = document.createElement('div');
    this.fullscreenButton.draggable = false;
    this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.INDEX);
    if (this.fullScreen) {
      this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.FULLSCREEN_MODE);
      this.container.classList.add(CONTAINER.FULLSCREEN);
    }
    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.fullscreenButton, (() => {
      this.fullscreenButton.removeEventListener('click', this.onAddFullscreenButtonClick);
    }).bind(this));
    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.fullscreenButton, (() => {
      this.fullscreenButton.addEventListener('click', this.onAddFullscreenButtonClick);
    }).bind(this));
    this.menu.appendChild(this.fullscreenButton);
  }

  _onAddFullscreenButtonClick() {
    if (this.fullScreen) {
      this.exitFullscreen();
    } else {
      this.setFullscreen();
    }
  }

  exitFullscreen() {
    this.fullscreenButton.classList.remove(FULLSCREEN_BUTTON.FULLSCREEN_MODE);
    this.container.classList.remove(CONTAINER.FULLSCREEN);
    this.fullScreen = false;
    this.eventEmitter.emit(EVENTS.CONTAINER_RESIZED);
  }

  setFullscreen() {
    this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.FULLSCREEN_MODE);
    this.container.classList.add(CONTAINER.FULLSCREEN);
    this.fullScreen = true;
    this.eventEmitter.emit(EVENTS.CONTAINER_RESIZED);
  }

  addMagnifierButton() {
    this.magnifierButton = document.createElement('div');
    this.magnifierButton.draggable = false;
    this.magnifierButton.classList.add(MAGNIFIER_BUTTON.INDEX);
    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.magnifierButton, (() => {
      this.magnifierButton.removeEventListener('click', this.onAddMagnifierButtonClick);
    }).bind(this));
    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.magnifierButton, (() => {
      this.magnifierButton.addEventListener('click', this.onAddMagnifierButtonClick);
    }).bind(this));
    this.menu.appendChild(this.magnifierButton);
  }

  addMagnifierGlass() {
    this.magnifierGlass = new Image();
    this.magnifierGlass.classList.add(IMG_MAGNIFIER_GLASS.INDEX);
    this.magnifierGlass.addEventListener('mousedown', this.removeMagnifierGlass.bind(this));
    this.container.appendChild(this.magnifierGlass);
  }

  removeMagnifierGlass() {
    this.container.removeChild(this.magnifierGlass);
    delete this.magnifierGlass;
  }

  _onAddMagnifierButtonClick() {
    if (!this.magnifierGlass) {
      this.addMagnifierGlass();
    }

    magnify(this.container, this.getImageSrc(), this.magnifierGlass, this.magnifier);
  }

  addMenu() {
    this.menu = document.createElement('div');
    this.menu.draggable = false;
    this.menu.classList.add(TOP_MENU.INDEX);

    if (this.magnifier && !this.isMobile) {
      this.addMagnifierButton();
    }

    if (this.fullScreen) {
      this.fullScreen = this.container.classList.contains(CONTAINER.FULLSCREEN);
      this.addFullScreenButton();
    }

    this.container.appendChild(this.menu);
  }

  addLoaders() {
    this.addTopLoader();
    this.addCenterLoader();
  }

  addTopLoader() {
    this.topLoader = document.createElement('div');
    this.topLoader.draggable = false;
    this.topLoader.classList.add(TOP_LOADER.INDEX);
    this.topLoader.classList.add(TOP_LOADER.HIDDEN);

    this.container.appendChild(this.topLoader);
  }

  /**
   *  @param {Number} percentage
   *  @param {Boolean} hideOnCompletion
   */
  setTopLoaderPercentage(percentage, hideOnCompletion = true) {
    this.topLoader.style.width = `${percentage}%`;
    if (hideOnCompletion && percentage >= 100) {
      this.hideTopLoader();
    }
  }

  hideTopLoader() {
    if (!this.topLoader) { return; }
    this.topLoader.classList.add(TOP_LOADER.HIDDEN);
  }

  showTopLoader() {
    if (!this.topLoader) { return; }
    this.topLoader.classList.remove(TOP_LOADER.HIDDEN);
  }

  removeTopLoader() {
    if (!this.topLoader) { return; }
    this.container.removeChild(this.topLoader);
    delete this.topLoader;
  }

  addCenterLoader() {
    this.centerLoader = document.createElement('div');
    const span = document.createElement('span');
    this.centerLoader.appendChild(span);
    this.centerLoader.draggable = false;
    this.centerLoader.classList.add(CENTER_LOADER.INDEX);
    this.centerLoader.classList.add(CENTER_LOADER.HIDDEN);

    this.container.appendChild(this.centerLoader);
  }

  showCenterLoader() {
    if (!this.centerLoader) { return; }
    this.centerLoader.classList.remove(CENTER_LOADER.HIDDEN);
  }

  hideCenterLoader() {
    if (!this.centerLoader) { return; }
    this.centerLoader.classList.add(CENTER_LOADER.HIDDEN);
  }

  /**
   *  @param {Number} percentage 
   *  @param {Boolean} hideOnCompletion
  */
  setCenterLoaderPercentage(percentage, hideOnCompletion = true) {
    this.centerLoader.children[0].innerHTML = `${parseInt(percentage, 10)}%`;
    if (hideOnCompletion && percentage >= 100) {
      this.hideCenterLoader();
    }
  }

  removeCenterLoader() {
    if (!this.centerLoader) { return; }
    this.container.removeChild(this.centerLoader);
    delete this.centerLoader;
  }

  addPreviewIcon() {
    this.previewIcon = document.createElement('div');
    this.previewIcon.draggable = false;
    this.previewIcon.classList.add(PREVIEW_ICON.INDEX);
    this.previewIcon.classList.add(PREVIEW_ICON.HIDDEN);

    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.previewIcon, (() => {
      if (!this.previewIcon || !this.isPreviewIconVisible) { return; }
      this.hidePreviewIcon();
    }).bind(this))

    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.previewIcon, (() => {
      if (!this.previewIcon) { return; }
      this.showPreviewIcon();
    }).bind(this))

    this.container.appendChild(this.previewIcon);
  }

  removePreviewIcon() {
    this.container.removeChild(this.previewIcon);
    delete this.previewIcon;
  }

  hidePreviewIcon() {
    this.previewIcon.classList.add(PREVIEW_ICON.HIDDEN);
  }

  showPreviewIcon() {
    this.previewIcon.classList.remove(PREVIEW_ICON.HIDDEN);
  }

  addBottomCircle() {
    this.bottomCircleContainer = new Image();
    this.bottomCircleContainer.draggable = false;
    this.bottomCircleContainer.src = BOTTOM_CIRCLE_IMAGE_SRC;
    this.bottomCircleContainer.classList.add(BOTTOM_CIRCLE.INDEX);
    if (this.autoplay) {
      this.bottomCircleContainer.classList.add(BOTTOM_CIRCLE.HIDDEN);
    }
    this.bottomCircleContainer.style.top = `${80 - this.bottomCircleOffset}%`;
    this.bottomCircleContainer.style.bottom = `${this.bottomCircleOffset}%`;

    this.eventEmitter.addListener(EVENTS.SPINNING, this.bottomCircleContainer, (() => {
      if (!this.isBottomCircleVisible) { return; }
      this.hideBottomCircle();
    }).bind(this));

    this.eventEmitter.addListener(EVENTS.SPINNING_STOPPED, this.bottomCircleContainer, (() => {
      if (this.isBottomCircleVisible) { return; }
      this.showBottomCircle();
    }).bind(this));

    this.container.appendChild(this.bottomCircleContainer);
  }

  hideBottomCircle() {
    this.bottomCircleContainer.classList.add(BOTTOM_CIRCLE.HIDDEN);
  }

  showBottomCircle() {
    this.bottomCircleContainer.classList.remove(BOTTOM_CIRCLE.HIDDEN);
  }

  updateControls() {
    if (!this.controls || !this.stopAtEdges) { return; }

    if (this.colIndex === this.indexZeroBase) {
      this.disableGoLeftControl();
    } else {
      this.enableGoLeftControl();
    }

    if (this.colIndex === this.maxColIndex) {
      this.disableGoRightControl();
    }
    else {
      this.enableGoRightControl();
    }
  }

  disableGoLeftControl() {
    this.controlsGoLeft.classList.add(CONTROLS.DISABLED);
  }

  enableGoLeftControl() {
    this.controlsGoLeft.classList.remove(CONTROLS.DISABLED);
  }

  disableGoRightControl() {
    this.controlsGoRight.classList.add(CONTROLS.DISABLED);
  }

  enableGoRightControl() {
    this.controlsGoRight.classList.remove(CONTROLS.DISABLED);
  }

  addControls() {
    this.controls = document.createElement('div');
    this.controls.draggable = false;
    this.controls.classList.add(CONTROLS.INDEX);

    this.controlsGoLeft = document.createElement('button');
    this.controlsGoLeft.draggable = false;
    this.controlsGoLeft.classList.add(CONTROLS.LEFT);

    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.controlsGoLeft, (() => {
      this.controlsGoLeft.removeEventListener('mousedown', this.onGoLeftDown);
      this.controlsGoLeft.removeEventListener('click', this.onGoLeftClick);
      this.controlsGoLeft.removeEventListener('touchstart', this.onGoLeftDown);
      this.controlsGoLeft.removeEventListener('mouseout', this.onGoLeftUp);
      this.controlsGoLeft.removeEventListener('touchend', this.onGoLeftUp);
      this.controlsGoLeft.removeEventListener('mouseup', this.onGoLeftUp);
      this.controlsGoLeft.removeEventListener('touchcancel', this.onGoLeftUp);
    }).bind(this));
    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.controlsGoLeft, (() => {
      this.controlsGoLeft.addEventListener('mousedown', this.onGoLeftDown);
      this.controlsGoLeft.addEventListener('click', this.onGoLeftClick);
      this.controlsGoLeft.addEventListener('touchstart', this.onGoLeftDown);
      this.controlsGoLeft.addEventListener('mouseout', this.onGoLeftUp);
      this.controlsGoLeft.addEventListener('touchend', this.onGoLeftUp);
      this.controlsGoLeft.addEventListener('mouseup', this.onGoLeftUp);
      this.controlsGoLeft.addEventListener('touchcancel', this.onGoLeftUp);
    }).bind(this));
    this.controls.appendChild(this.controlsGoLeft);

    this.controlsGoRight = document.createElement('button');
    this.controlsGoRight.draggable = false;
    this.controlsGoRight.classList.add(CONTROLS.RIGHT);

    this.eventEmitter.addListener(EVENTS.LOADING_STARTED, this.controlsGoRight, (() => {
      this.controlsGoRight.removeEventListener('mousedown', this.onGoRightDown);
      this.controlsGoRight.removeEventListener('click', this.onGoRightClick);
      this.controlsGoRight.removeEventListener('touchstart', this.onGoRightDown);
      this.controlsGoRight.removeEventListener('mouseout', this.onGoRightUp);
      this.controlsGoRight.removeEventListener('touchend', this.onGoRightUp);
      this.controlsGoRight.removeEventListener('mouseup', this.onGoRightUp);
      this.controlsGoRight.removeEventListener('touchcancel', this.onGoRightUp);
    }).bind(this));

    this.eventEmitter.addListener(EVENTS.LOADING_COMPLETED, this.controlsGoRight, (() => {
      this.controlsGoRight.addEventListener('mousedown', this.onGoRightDown);
      this.controlsGoRight.addEventListener('click', this.onGoRightClick);
      this.controlsGoRight.addEventListener('touchstart', this.onGoRightDown);
      this.controlsGoRight.addEventListener('mouseout', this.onGoRightUp);
      this.controlsGoRight.addEventListener('touchend', this.onGoRightUp);
      this.controlsGoRight.addEventListener('mouseup', this.onGoRightUp);
      this.controlsGoRight.addEventListener('touchcancel', this.onGoRightUp);
    }).bind(this));
    this.controls.appendChild(this.controlsGoRight);

    this.container.appendChild(this.controls);
  }

  _onGoLeftClick() {
    if (this.isGoLeftDisabled) { return; }
    this.updateIndexes({ goLeft: true });
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  _onGoRightClick() {
    if (this.isGoRightDisabled) { return; }
    this.updateIndexes({ goRight: true });
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  _onGoLeftDown() {
    this.goLeftInterval = setInterval((() => {
      if (this.isGoLeftDisabled) {
        this._onGoLeftUp();
        return;
      }

      this.updateIndexes({ goLeft: true });
    }).bind(this), this.autoplaySpeed);
  }

  _onGoLeftUp() {
    clearInterval(this.goLeftInterval);
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }

  _onGoRightDown() {
    this.goRightInterval = setInterval((() => {
      if (this.isGoRightDisabled) {
        this._onGoRightUp();
        return;
      }

      this.updateIndexes({ goRight: true });
    }).bind(this), this.autoplaySpeed);
  }

  _onGoRightUp() {
    clearInterval(this.goRightInterval);
    this.eventEmitter.emit(EVENTS.SPINNING_STOPPED);
  }
}