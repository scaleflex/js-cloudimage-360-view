/**
 * Main-thread canvas renderer - fallback for mobile devices where OffscreenCanvas
 * + Web Worker causes memory issues. This mimics the worker's postMessage interface.
 */
import { calculateZoomedDimensions, calculateZoomOffsets } from './utils';

export class MainThreadCanvasRenderer {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.dpr = 1;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.wideImage = false;
  }

  /**
   * Mimics worker.postMessage() interface
   */
  postMessage(data) {
    const {
      action,
      offscreen, // Will be a regular canvas on main thread
      devicePixelRatio,
      imageData,
      zoomScale,
      pointerX,
      pointerY,
      imageAspectRatio,
      containerWidth,
      containerHeight,
    } = data;

    switch (action) {
      case 'initCanvas':
        this.initCanvas(offscreen, devicePixelRatio);
        break;
      case 'adaptCanvasSize':
        this.adaptCanvasSize(imageAspectRatio, containerWidth, containerHeight);
        break;
      case 'drawImageOnCanvas':
        this.drawImageOnCanvas(imageData, zoomScale, pointerX, pointerY);
        break;
      default:
        break;
    }
  }

  /**
   * Mimics worker.terminate() - cleans up resources
   */
  terminate() {
    if (this.ctx) {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
    }
    this.canvas = null;
    this.ctx = null;
  }

  initCanvas(canvasElement, devicePixelRatio) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.dpr = devicePixelRatio;
  }

  adaptCanvasSize(imageAspectRatio, containerWidth, containerHeight) {
    if (!this.canvas || !this.ctx) return;

    const containerAspectRatio = containerWidth / containerHeight;
    this.wideImage = imageAspectRatio > containerAspectRatio;

    this.canvas.width = containerWidth * this.dpr;
    this.canvas.height = containerHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    if (this.wideImage) {
      this.drawWidth = containerWidth;
      this.drawHeight = containerWidth / imageAspectRatio;
    } else {
      this.drawHeight = containerHeight;
      this.drawWidth = containerHeight * imageAspectRatio;
    }

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  drawImageOnCanvas(imageData = {}, zoomScale = 1, pointerX = 0, pointerY = 0) {
    const { bitmapImage } = imageData;
    if (!this.canvas || !this.ctx || !bitmapImage) return;

    let offsetX, offsetY;
    if (this.wideImage) {
      offsetX = 0;
      offsetY = (this.canvas.height / this.dpr - this.drawHeight) / 2;
    } else {
      offsetX = (this.canvas.width / this.dpr - this.drawWidth) / 2;
      offsetY = 0;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (zoomScale !== 1) {
      const { naturalWidth, naturalHeight } = imageData;
      const { zoomedWidth, zoomedHeight } = calculateZoomedDimensions(naturalWidth, naturalHeight, zoomScale);

      const { zoomOffsetX, zoomOffsetY } = calculateZoomOffsets({
        pointerX,
        pointerY,
        imageData,
        zoomedWidth,
        zoomedHeight,
        drawWidth: this.drawWidth,
        drawHeight: this.drawHeight,
      });

      this.ctx.drawImage(
        bitmapImage,
        zoomOffsetX,
        zoomOffsetY,
        zoomedWidth,
        zoomedHeight,
        offsetX,
        offsetY,
        this.drawWidth,
        this.drawHeight
      );
    } else {
      this.ctx.drawImage(bitmapImage, offsetX, offsetY, this.drawWidth, this.drawHeight);
    }
  }
}

export default MainThreadCanvasRenderer;
