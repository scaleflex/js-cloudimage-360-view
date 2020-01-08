'use strict';

import { getAttr } from "./utils";

export class Viewer {
  /**
   * @param {HTMLElement} container 
   */
  constructor(container) {
    this.container = container;

    this.folder = getAttr(container, 'data-folder') || '/';
    this.filenamePattern = getAttr(container, 'data-filename') || 'container-{index}.jpg';
    this.containerList = getAttr(container, 'data-container-list');
    this.indexZeroBase = parseInt(getAttr(container, 'data-index-zero-base') || 0, 10);
    this.amount = parseInt(getAttr(container, 'data-amount') || 36, 10);
    this.speed = parseInt(getAttr(container, 'data-speed') || 80, 10);
    this.dragSpeed = parseInt(getAttr(container, 'data-drag-speed') || 150, 10);
    this.keys = Boolean(getAttr(container, 'data-keys'));
    this.container.style.boxShadow = getAttr(container, 'data-box-shadow');
    this.autoplay = Boolean(getAttr(container, 'data-autoplay'));
    this.autoplaySpeed = this.speed * 36 / this.amount;
    this.bottomCircle = Boolean(getAttr(container, 'data-bottom-circle'));
    this.fullScreen = Boolean(getAttr(container, 'data-full-screen'));
    this.magnifier = getAttr(container, 'data-magnifier') !== null &&
      parseInt(getAttr(container, 'data-magnifier'), 10);

    this.bottomCircleOffset = parseInt(getAttr(container, 'data-bottom-circle-offset') || 5, 10);
    this.ratio = (getAttr(container, 'data-ratio') || 0) || false;
    this.responsive = Boolean(getAttr(container, 'data-responsive'));
    this.ciToken = getAttr(container, 'data-responsive') || 'demo';
    this.ciSize = getAttr(container, 'data-size');
    this.ciOperation = getAttr(container, 'data-operation') || 'width';
    this.ciFilters = getAttr(container, 'data-filters') || 'q35';
    this.lazyload = Boolean(getAttr(container, 'data-lazyload'));
    this.lazySelector = Boolean(getAttr(container, 'data-lazyload-selector') || 'lazyload');
    this.spinReverse = Boolean(getAttr(container, 'data-spin-reverse'));
    this.controlReverse = Boolean(getAttr(container, 'data-control-reverse'));
    this.stopAtEdges = Boolean(getAttr(container, 'data-stop-at-edges'));

    this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.container.addEventListener('mouseout', this.onMouseOut.bind(this));

    this.isMouseDown = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
    this.isDraggingUp = false;
    this.isDraggingDown = false;

    this.dragThresoldPerc = getAttr(container, 'data-drag-threshold') || 1;

    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this._colIndex = getAttr(container, 'data-start-col') || this.indexZeroBase;
    this._rowIndex = getAttr(container, 'data-start-row') || this.indexZeroBase;

    this.maxColIndex = this.amount - 1;
    this.maxRowIndex = this.amount - 1;

    this.cachedImages = {}; //using it as key-value pair
    this.image = new Image();
    this.image.classList.add('image');
    this.image.draggable = false;

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
  }

  init() {
    this.container.appendChild(this.image);
    this.changeImage();// sets the initial image

    if (!this.lazyload) {
      this.preloadImages();
    }

    if (this.autoplay) {
      this.autoplayInterval = setInterval(this.spin.bind(this), this.autoplaySpeed);
    }

    if (this.bottomCircle) {
      this.addPreviewIcon();
    }

    if (this.fullScreen || this.magnifier) {
      this.addMenu();
    }
  }

  updateIndexes() {
    if (this.isDraggingUp) {
      this.controlReverse ? this.rowIndex++ : this.rowIndex--;
    }
    if (this.isDraggingDown) {
      this.controlReverse ? this.rowIndex-- : this.rowIndex++;
    }

    if (this.isDraggingLeft) {
      this.controlReverse ? this.colIndex++ : this.colIndex--;
    }
    if (this.isDraggingRight) {
      this.controlReverse ? this.colIndex-- : this.colIndex++;
    }
  }

  onMouseUp() {
    this.resetDragging();
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

  onMouseMove({ clientX, clientY }) {
    const distanceX = Math.abs(Math.abs(clientX) - Math.abs(this.prevMouseX));
    const distanceY = Math.abs(Math.abs(clientY) - Math.abs(this.prevMouseY));
    const minX = (this.container.clientWidth * this.dragThresoldPerc) / 100
    const minY = (this.container.clientHeight * this.dragThresoldPerc) / 100

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

  resetDragging() {
    this.isMouseDown = false;
    this.isDraggingUp = false;
    this.isDraggingDown = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
  }

  onMouseOut() {
    this.resetDragging();
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
    let file = this.filenamePattern;

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

  preloadImages() {
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
    this.fullscreenButton.classList.add('fullscreen-button');
    this.fullscreenButton.onclick = this.onFullscreenClick.bind(this);
    this.menu.appendChild(this.fullscreenButton);
  }

  onFullscreenClick() {
    if (this.fullScreen) {
      this.fullscreenButton.classList.remove('fullscreen-mode');
      this.container.classList.remove('fullscreen');
    } else {
      this.fullscreenButton.classList.add('fullscreen-mode');
      this.container.classList.add('fullscreen');
    }

    this.fullScreen = this.container.classList.contains('fullscreen');
  }

  addMagnifierButton() {
    this.magnifierButton = document.createElement('div');
    this.magnifierButton.classList.add('magnifier-button');
    this.menu.appendChild(this.magnifierButton);
  }

  addMenu() {
    this.menu = document.createElement('div');
    this.menu.classList.add('menu');

    if (this.magnifier) {
      this.addMagnifierButton();
    }

    if (this.fullScreen) {
      this.fullScreen = false;
      this.addFullScreenButton();
    }

    this.container.appendChild(this.menu);
  }

  addPreviewIcon() {
    const previewIcon = document.createElement('div');
    previewIcon.classList.add('preview-icon');
    previewIcon.draggable = false;

    this.container.appendChild(previewIcon);
    this.previewIcon = previewIcon;
  }

  removePreviewIcon() {
    this.container.removeChild(this.previewIcon);
    delete this.previewIcon;
  }

}