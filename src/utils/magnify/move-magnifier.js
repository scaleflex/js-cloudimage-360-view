import { getCursorPosition } from './get-cursor-position';

export const moveMagnifier = (e, containerConfig, glass) => {
  const {
    container, w, h, zoom, bw, offsetX, offsetY,
  } = containerConfig;

  let x; let y;

  const pos = getCursorPosition(e, container);
  x = pos.x;
  y = pos.y;

  if (x > container.offsetWidth - (w / zoom)) {
    x = container.offsetWidth - (w / zoom);
  }

  if (x < w / zoom) {
    x = w / zoom;
  }

  if (y > container.offsetHeight - (h / zoom)) {
    y = container.offsetHeight - (h / zoom);
  }

  if (y < h / zoom) {
    y = h / zoom;
  }

  glass.style.left = `${x - w}px`;
  glass.style.top = `${y - h}px`;

  const backgroundPosX = (
    (x - offsetX) * zoom
  ) - w + bw;

  const backgroundPosY = (
    (y - offsetY) * zoom
  ) - h + bw;

  glass.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
};
