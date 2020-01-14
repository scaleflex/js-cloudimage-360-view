'use strict';

import 'custom-event-polyfill';
import {
  getAttr,
  magnify,
  getClientHitPoint,
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
import './stylesheets/main.scss';
import { KEYCODES } from '../utils/keys';

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
    this.keys = Boolean(getAttr(container, 'keys') || getAttr(container, 'data-keys'));
    this.container.style.boxShadow = getAttr(container, 'box-shadow') || getAttr(container, 'data-box-shadow');
    this.autoplay = Boolean(getAttr(container, 'autoplay') || getAttr(container, 'data-autoplay'));
    this.autoplaySpeed = this.speed * 36 / this.colsAmount;
    this.bottomCircle = Boolean(getAttr(container, 'bottom-circle') || getAttr(container, 'data-bottom-circle'));
    this.fullScreen = Boolean(getAttr(container, 'full-screen') || getAttr(container, 'data-full-screen'));
    this.magnifier = (getAttr(container, 'magnifier') || getAttr(container, 'data-magnifier')) &&
      parseInt(getAttr(container, 'magnifier') || getAttr(container, 'data-magnifier'), 10) || 3;

    this.bottomCircleOffset = parseInt(getAttr(container, 'bottom-circle-offset') || getAttr(container, 'data-bottom-circle-offset') || 5, 10);
    this.responsive = Boolean(getAttr(container, 'responsive') || getAttr(container, 'data-responsive'));
    this.ciToken = getAttr(container, 'responsive') || getAttr(container, 'data-responsive') || 'demo';
    this.ciSize = getAttr(container, 'size') || getAttr(container, 'data-size');
    this.ciOperation = getAttr(container, 'operation') || getAttr(container, 'data-operation') || 'width';
    this.ciFilters = getAttr(container, 'filters') || getAttr(container, 'data-filters') || 'q35';
    this.preloadImages = Boolean(getAttr(container, 'preload-images', true) || getAttr(container, 'data-preload-images', true));
    this.spinReverse = Boolean(getAttr(container, 'spin-reverse') || getAttr(container, 'data-spin-reverse'));
    this.controlReverse = Boolean(getAttr(container, 'control-reverse') || getAttr(container, 'data-control-reverse'));
    this.showControls = Boolean(getAttr(container, 'controls') || getAttr(container, 'data-controls'));
    this.stopAtEdges = Boolean(getAttr(container, 'stop-at-edges') || getAttr(container, 'data-stop-at-edges'));
    this.dragSensitivity = getAttr(container, 'drag-sensitivity') || getAttr(container, 'data-drag-sensitivity') || 1;

    this.setInitialFlags();

    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this._colIndex = this.indexZeroBase;
    this._rowIndex = this.indexZeroBase;

    this.maxColIndex = this.colsAmount - 1;
    this.maxRowIndex = this.rowsAmount - 1;

    this.cachedImages = {}; //using it as key-value pair
    this.image = new Image();
    this.image.classList.add(IMAGE.INDEX);
    this.image.draggable = false;

    this.isMobile = Boolean('ontouchstart' in window || navigator.maxTouchPoints);

    this.init();
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
    this.isSpinning = true;
    if (this.isSpinning && this.isBottomCircleVisible) {
      this.hideBottomCircle();
    }
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
    this.isSpinning = true;
    if (this.isSpinning && this.isBottomCircleVisible) {
      this.hideBottomCircle();
    }
  }

  get isBottomCircleVisible() {
    return Boolean(this.bottomCircleContainer) && this.bottomCircleContainer.classList.contains(BOTTOM_CIRCLE.HIDDEN) == false;
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
    this.container.appendChild(this.image);
    this.changeImage();// sets the initial image

    this.addLoaders();
    this.container.addEventListener(EVENTS.LOADING, this.loadingEventHandler.bind(this));
    this.container.addEventListener(EVENTS.LOADED, this.loadedEventHandler.bind(this));
    this.container.dispatchEvent(new CustomEvent(EVENTS.LOADING, { detail: 0 }));

    if (this.preloadImages) {
      this.preloadAllImages();
    }

    if (this.fullScreen || this.magnifier) {
      this.addMenu();
    }

    if (this.showControls) {
      this.addControls();
    }

    if (this.bottomCircle) {
      this.addBottomCircle();
    }
  }

  destroy() {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    this.container.classList.remove(CONTAINER.INITIALIZED);
  }

  loadingEventHandler({ detail: percentage }) {
    if (!this.isTopLoaderVisible) {
      this.showTopLoader();
    }
    if (!this.isCenterLoaderVisible) {
      this.showCenterLoader();
    }

    this.setTopLoaderPercentage(percentage);
    this.setCenterLoaderPercentage(percentage);

    if (percentage === 100) {
      this.container.dispatchEvent(new CustomEvent(EVENTS.LOADED));
    }
  }

  loadedEventHandler() {
    if (this.autoplay) {
      this.autoplayInterval = setInterval(this.autoSpin.bind(this), this.autoplaySpeed);
    } else {
      this.addPreviewIcon();
    }

    this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.container.addEventListener('touchmove', this.onMouseMove.bind(this));

    this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.container.addEventListener('touchend', this.onMouseUp.bind(this));

    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.container.addEventListener('touchstart', this.onMouseDown.bind(this));

    if (this.keys) {
      this.container.addEventListener('keydown', this.onControlDown.bind(this));
    }

    this.container.classList.add(CONTAINER.INITIALIZED);
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

  onMouseUp() {
    this.setInitialFlags();
    this.showBottomCircle();
    this.isSpinning = false;
  }

  onMouseDown() {
    this.isMouseDown = true;

    if (this.autoplay) {
      this.stopSpinning();
    }

    if (this.previewIcon) {
      this.removePreviewIcon();
    }
  }

  onMouseMove(event) {
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

  onControlDown(event) {
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

  setInitialFlags() {
    this.isMouseDown = false;
    this.isDraggingUp = false;
    this.isDraggingDown = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
    this.isSpinning = false;
  }

  changeImage() {
    const src = this.getImageSrc();
    if (this.cachedImages[src]) {
      this.onImageLoad(src);
    } else {
      this.cacheImage(src, this.onImageLoad.bind(this, src));
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
    image.onload = this.onImageCached.bind(this, callback, src);
  }

  /**
   * @param {Function} callback 
   * @param {String} src 
   */
  onImageCached(callback, src) {
    this.cachedImages[src] = true;

    const loaderPercentage = getPercentage(this.rowsAmount * this.colsAmount, Object.keys(this.cachedImages).length);
    this.container.dispatchEvent(new CustomEvent(EVENTS.LOADING, { detail: loaderPercentage }));

    if (callback) {
      callback();
    }
  }

  preloadAllImages() {
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
    this.image.src = src;
  }

  autoSpin() {
    if (this.spinReverse) {
      this.colIndex--;
    } else {
      this.colIndex++;
    }
  }

  stopSpinning() {
    clearInterval(this.autoplayInterval);
    this.autoplay = false;
  }

  addFullScreenButton() {
    this.fullscreenButton = document.createElement('div');
    this.fullscreenButton.draggable = false;
    this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.INDEX);
    if (this.fullScreen) {
      this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.FULLSCREEN_MODE);
      this.container.classList.add(CONTAINER.FULLSCREEN);
    }
    this.fullscreenButton.addEventListener('click', this.onAddFullscreenButtonClick.bind(this));
    this.menu.appendChild(this.fullscreenButton);
  }

  onAddFullscreenButtonClick() {
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
  }

  setFullscreen() {
    this.fullscreenButton.classList.add(FULLSCREEN_BUTTON.FULLSCREEN_MODE);
    this.container.classList.add(CONTAINER.FULLSCREEN);
    this.fullScreen = true;
  }

  addMagnifierButton() {
    this.magnifierButton = document.createElement('div');
    this.magnifierButton.draggable = false;
    this.magnifierButton.classList.add(MAGNIFIER_BUTTON.INDEX);
    this.magnifierButton.addEventListener('click', this.onAddMagnifierButtonClick.bind(this));
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

  onAddMagnifierButtonClick() {
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

    this.container.appendChild(this.topLoader);
  }

  /**
   *  @param {Number} percentage
   *  @param {Boolean} hideOnCompletion
   */
  setTopLoaderPercentage(percentage, hideOnCompletion = true) {
    this.topLoader.style.width = `${percentage}%`;
    if (hideOnCompletion && percentage === 100) {
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
    this.centerLoader.draggable = false;
    this.centerLoader.classList.add(CENTER_LOADER.INDEX);

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
    this.centerLoader.innerHTML = `${Math.floor(percentage)}%`;
    if (hideOnCompletion && percentage === 100) {
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

    this.container.appendChild(this.previewIcon);
  }

  removePreviewIcon() {
    this.container.removeChild(this.previewIcon);
    delete this.previewIcon;
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

    this.container.appendChild(this.bottomCircleContainer);
  }

  hideBottomCircle() {
    this.bottomCircleContainer.classList.add(BOTTOM_CIRCLE.HIDDEN);
  }

  showBottomCircle() {
    if (this.bottomCircleContainer && !this.isBottomCircleVisible) {
      this.bottomCircleContainer.classList.remove(BOTTOM_CIRCLE.HIDDEN);
    }
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
    this.container.addEventListener(EVENTS.LOADED, (() => {
      this.controlsGoLeft.addEventListener('mousedown', this.onGoLeftDown.bind(this));
      this.controlsGoLeft.addEventListener('click', this.onGoLeftClick.bind(this));
      this.controlsGoLeft.addEventListener('touchstart', this.onGoLeftDown.bind(this));

      this.controlsGoLeft.addEventListener('mouseout', this.onGoLeftUp.bind(this));
      this.controlsGoLeft.addEventListener('touchend', this.onGoLeftUp.bind(this));

      this.controlsGoLeft.addEventListener('mouseup', this.onGoLeftUp.bind(this));
      this.controlsGoLeft.addEventListener('touchcancel', this.onGoLeftUp.bind(this));
    }).bind(this));

    this.controls.appendChild(this.controlsGoLeft);

    this.controlsGoRight = document.createElement('button');
    this.controlsGoRight.draggable = false;
    this.controlsGoRight.classList.add(CONTROLS.RIGHT);
    this.container.addEventListener(EVENTS.LOADED, (() => {
      this.controlsGoRight.addEventListener('mousedown', this.onGoRightDown.bind(this));
      this.controlsGoRight.addEventListener('click', this.onGoRightClick.bind(this));
      this.controlsGoRight.addEventListener('touchstart', this.onGoRightDown.bind(this));

      this.controlsGoRight.addEventListener('mouseout', this.onGoRightUp.bind(this));
      this.controlsGoRight.addEventListener('touchend', this.onGoRightUp.bind(this));

      this.controlsGoRight.addEventListener('mouseup', this.onGoRightUp.bind(this));
      this.controlsGoRight.addEventListener('touchcancel', this.onGoRightUp.bind(this));
    }).bind(this));

    this.controls.appendChild(this.controlsGoRight);

    this.container.appendChild(this.controls);
  }

  onGoLeftClick() {
    if (this.isGoLeftDisabled) { return; }
    this.updateIndexes({ goLeft: true });
  }

  onGoRightClick() {
    if (this.isGoRightDisabled) { return; }
    this.updateIndexes({ goRight: true });
  }

  onGoLeftDown() {
    this.goLeftInterval = setInterval((() => {
      if (this.isGoLeftDisabled) {
        this.onGoLeftUp();
        return;
      }

      this.updateIndexes({ goLeft: true });
    }).bind(this), this.autoplaySpeed);
  }

  onGoLeftUp() {
    clearInterval(this.goLeftInterval);
    this.showBottomCircle();
  }

  onGoRightDown() {
    this.goRightInterval = setInterval((() => {
      if (this.isGoRightDisabled) {
        this.onGoRightUp();
        return;
      }

      this.updateIndexes({ goRight: true });
    }).bind(this), this.autoplaySpeed);
  }

  onGoRightUp() {
    clearInterval(this.goRightInterval);
    this.showBottomCircle();
  }
}