import { getCursorPosition } from './get-cursor-position';

export const moveMagnifier = (e, containerConfig, glass) => {
  const { container, w, h, zoom, bw, offsetX, offsetY } = containerConfig;

  const pos = getCursorPosition(e, container);
  let x = pos.x;
  let y = pos.y;

  // Ensure the magnifier doesn't move outside container bounds
  x = Math.max(w / zoom, Math.min(x, container.offsetWidth - w / zoom));
  y = Math.max(h / zoom, Math.min(y, container.offsetHeight - h / zoom));

  // Update the magnifier glass position
  glass.style.left = `${x - w}px`;
  glass.style.top = `${y - h}px`;

  // Calculate background position (where the magnified image should show)
  const backgroundPosX = (x - offsetX) * zoom - w + bw;
  const backgroundPosY = (y - offsetY) * zoom - h + bw;

  // Apply background position to simulate zoom effect
  glass.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
};
