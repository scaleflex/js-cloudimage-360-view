'use strict';

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
} from './classes';
import { CONTAINER } from "../core/classes";
import { BOTTOM_CIRCLE_IMAGE_SRC } from "./constants";

import './stylesheets/main.scss';

export class Viewer {
  /**
   * @param {HTMLElement} container 
   */
  constructor(container) {
    this.container = container;

    this.imageList = getAttr(container, 'image-list') || getAttr(container, 'data-image-list');
    this.folder = getAttr(container, 'folder') || getAttr(container, 'data-folder') || '/';
    this.fileNamePattern = getAttr(container, 'filename') || getAttr(container, 'data-filename') || 'container-{index}.jpg';
    this.containerList = getAttr(container, 'container-list') || getAttr(container, 'data-container-list');
    this.indexZeroBase = parseInt(getAttr(container, 'index-zero-base') || getAttr(container, 'data-index-zero-base') || 0, 10);
    this.amount = parseInt(getAttr(container, 'amount') || getAttr(container, 'data-amount') || 36, 10);
    this.speed = parseInt(getAttr(container, 'speed') || 80, 10);
    this.dragSpeed = parseInt(getAttr(container, 'drag-speed') || getAttr(container, 'data-drag-speed') || 150, 10);
    this.keys = Boolean(getAttr(container, 'keys') || getAttr(container, 'data-keys'));
    this.container.style.boxShadow = getAttr(container, 'box-shadow') || getAttr(container, 'data-box-shadow');
    this.autoplay = Boolean(getAttr(container, 'autoplay') || getAttr(container, 'data-autoplay'));
    this.autoplaySpeed = this.speed * 36 / this.amount;
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

    this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.container.addEventListener('touchmove', this.onMouseMove.bind(this));

    this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.container.addEventListener('touchend', this.onMouseUp.bind(this));

    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.container.addEventListener('touchstart', this.onMouseDown.bind(this));

    this.container.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.container.addEventListener('touchcancel', this.onMouseOut.bind(this));

    this.setInitialFlags();

    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this._colIndex = this.indexZeroBase;
    this._rowIndex = this.indexZeroBase;

    this.maxColIndex = this.amount - 1;
    this.maxRowIndex = this.amount - 1;

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
  }

  get isBottomCircleVisible() {
    return Boolean(this.bottomCircleContainer && this.bottomCircleContainer.classList.contains('hidden')) == false;
  }

  get isGoLeftDisabled() {
    return Boolean(this.controlsGoLeft && this.controlsGoLeft.classList.contains('disabled'));
  }

  get isGoRightDisabled() {
    return Boolean(this.controlsGoRigth && this.controlsGoRigth.classList.contains('disabled'));
  }

  init() {
    this.container.appendChild(this.image);
    this.changeImage();// sets the initial image

    if (this.keys) {
      this.container.addEventListener('keydown', this.onKeyDown.bind(this));
      this.container.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    if (this.preloadImages) {
      this.preloadAllImages();
    }

    if (this.autoplay) {
      this.autoplayInterval = setInterval(this.spin.bind(this), this.autoplaySpeed);
    }

    if (this.fullScreen || this.magnifier) {
      this.addMenu();
    }

    if (this.showControls) {
      this.addControls();
    }

    if (this.bottomCircle) {
      this.addPreviewIcon();
      this.addBottomCircle();
    }

    this.container.classList.add(CONTAINER.INITIALIZED);
  }

  destroy() {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    this.container.classList.remove(CONTAINER.INITIALIZED);
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

    if (this.bottomCircleContainer && !this.isBottomCircleVisible) {
      this.showBottomCircle();
    }
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

    if (this.isMouseDown && this.isBottomCircleVisible) {
      this.hideBottomCircle();
    }
  }

  onKeyDown(event) {
    if (this.magnifierGlass) {
      this.removeMagnifierGlass();
    }

    switch (event.keyCode) {
      case 37://left arrow
        this.onGoLeftDown();
        break;
      case 39://rigth arrow
        this.onGoRightDown();
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 37://left arrow
        this.onGoLeftUp();
        break;
      case 39://rigth arrow
        this.onGoRightUp();
        break;
    }
  }

  setInitialFlags() {
    this.isMouseDown = false;
    this.isDraggingUp = false;
    this.isDraggingDown = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
  }

  onMouseOut() {
    this.setInitialFlags();
  }

  changeImage() {
    const src = this.getImageSrc();

    if (this.cachedImages[src]) {
      this.onImageLoad(src);
    } else {
      this.cacheImage(src);
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

  /** @param {String} src*/
  cacheImage(src) {
    if (this.cachedImages[src]) { return; }

    const image = new Image();
    image.onload = this.onImageLoad.bind(this, src);
    image.src = src;
    this.cachedImages[src] = image;
  }

  preloadAllImages() {
    for (let col = this.indexZeroBase; col <= this.maxColIndex; col++) {
      for (let row = this.indexZeroBase; row <= this.maxRowIndex; row++) {
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
      const ciSizeNext = this.container.style.width;

      src = `https://${this.ciToken}.cloudimg.io/${this.ciOperation}/${ciSizeNext}/${this.ciFilters}/${url}`;
    }

    return src;
  }

  onImageLoad(src) {
    this.image.src = src;
  }

  spin() {
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
    this.bottomCircleContainer.style.bottom = `${this.bottomCircleOffset}%`;

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
    this.controlsGoRigth.classList.add(CONTROLS.DISABLED);
  }

  enableGoRightControl() {
    this.controlsGoRigth.classList.remove(CONTROLS.DISABLED);
  }

  addControls() {
    this.controls = document.createElement('div');
    this.controls.draggable = false;
    this.controls.classList.add(CONTROLS.INDEX);

    this.controlsGoLeft = document.createElement('button');
    this.controlsGoLeft.draggable = false;
    this.controlsGoLeft.classList.add(CONTROLS.LEFT);
    this.controlsGoLeft.addEventListener('mousedown', this.onGoLeftDown.bind(this));
    this.controlsGoLeft.addEventListener('touchstart', this.onGoLeftDown.bind(this));

    this.controlsGoLeft.addEventListener('mouseout', this.onGoLeftUp.bind(this));
    this.controlsGoLeft.addEventListener('touchend', this.onGoLeftUp.bind(this));

    this.controlsGoLeft.addEventListener('mouseup', this.onGoLeftUp.bind(this));
    this.controlsGoLeft.addEventListener('touchcancel', this.onGoLeftUp.bind(this));

    this.controls.appendChild(this.controlsGoLeft);


    this.controlsGoRigth = document.createElement('button');
    this.controlsGoRigth.draggable = false;
    this.controlsGoRigth.classList.add(CONTROLS.RIGHT);
    this.controlsGoRigth.addEventListener('mousedown', this.onGoRightDown.bind(this));
    this.controlsGoRigth.addEventListener('touchstart', this.onGoRightDown.bind(this));

    this.controlsGoRigth.addEventListener('mouseout', this.onGoRightUp.bind(this));
    this.controlsGoRigth.addEventListener('touchend', this.onGoRightUp.bind(this));

    this.controlsGoRigth.addEventListener('mouseup', this.onGoRightUp.bind(this));
    this.controlsGoRigth.addEventListener('touchcancel', this.onGoRightUp.bind(this));
    this.controls.appendChild(this.controlsGoRigth);

    this.container.appendChild(this.controls);
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
  }
}