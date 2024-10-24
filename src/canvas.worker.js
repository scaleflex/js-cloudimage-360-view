import { calculateZoomedDimensions, calculateZoomOffsets } from './utils';

let canvas, ctx, dpr, drawWidth, drawHeight, wideImage;

self.onmessage = async (event) => {
  const {
    action,
    offscreen,
    devicePixelRatio,
    imageData,
    zoomScale,
    pointerX,
    pointerY,
    imageAspectRatio,
    containerWidth,
    containerHeight,
  } = event.data;

  switch (action) {
    case 'initCanvas':
      initCanvas(offscreen, devicePixelRatio);
      break;
    case 'adaptCanvasSize':
      adaptCanvasSize(imageAspectRatio, containerWidth, containerHeight);
      break;
    case 'drawImageOnCanvas':
      await drawImageOnCanvas(imageData, zoomScale, pointerX, pointerY);
      break;
    default:
      break;
  }
};

const initCanvas = (offscreenCanvas, devicePixelRatio) => {
  canvas = offscreenCanvas;
  ctx = canvas.getContext('2d');
  dpr = devicePixelRatio;
};

const adaptCanvasSize = (imageAspectRatio, containerWidth, containerHeight) => {
  const containerAspectRatio = containerWidth / containerHeight;
  wideImage = imageAspectRatio > containerAspectRatio;

  canvas.width = containerWidth * dpr;
  canvas.height = containerHeight * dpr;
  ctx.scale(dpr, dpr);

  if (wideImage) {
    drawWidth = containerWidth;
    drawHeight = containerWidth / imageAspectRatio;
  } else {
    drawHeight = containerHeight;
    drawWidth = containerHeight * imageAspectRatio;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
};

// Draw the image on the OffscreenCanvas
const drawImageOnCanvas = (imageData = {}, zoomScale = 1, pointerX = 0, pointerY = 0) => {
  const { bitmapImage } = imageData;
  if (!canvas || !bitmapImage) return;

  let offsetX, offsetY;
  if (wideImage) {
    offsetX = 0;
    offsetY = (canvas.height / dpr - drawHeight) / 2;
  } else {
    offsetX = (canvas.width / dpr - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (zoomScale !== 1) {
    const { zoomedWidth, zoomedHeight } = calculateZoomedDimensions(drawWidth, drawHeight, zoomScale);

    const { zoomOffsetX, zoomOffsetY } = calculateZoomOffsets({
      pointerX,
      pointerY,
      imageData,
      zoomedWidth,
      zoomedHeight,
      drawWidth,
      drawHeight,
    });

    ctx.drawImage(
      bitmapImage,
      zoomOffsetX,
      zoomOffsetY,
      zoomedWidth,
      zoomedHeight,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  } else {
    ctx.drawImage(bitmapImage, offsetX, offsetY, drawWidth, drawHeight);
  }
};
