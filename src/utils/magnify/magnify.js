import { moveMagnifier } from './move-magnifier';

export const magnify = (clickEvent, container, offset, currentImage, glass, zoom) => {
  const { x: offsetX = 0, y: offsetY = 0 } = offset || {};
  const backgroundSizeX = (container.offsetWidth - offsetX * 2) * zoom;
  const backgroundSizeY = (container.offsetHeight - offsetY * 2) * zoom;

  if (!glass) return;

  glass.setAttribute('class', 'cloudimage-360-img-magnifier-glass');
  container.prepend(glass);

  glass.style.backgroundImage = `url('${currentImage.src}')`;
  glass.style.backgroundSize = `${backgroundSizeX}px ${backgroundSizeY}px`;

  const bw = 3;
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  const containerConfig = {
    container,
    w,
    h,
    zoom,
    bw,
    offsetX,
    offsetY,
  };

  moveMagnifier(clickEvent, containerConfig, glass);

  const MouseMoveHandler = (event) => {
    moveMagnifier(event, containerConfig, glass);
  };

  const touchHandler = (event) => {
    event.preventDefault();

    moveMagnifier(event, containerConfig, glass);
  };

  glass.addEventListener('mousemove', MouseMoveHandler);
  container.addEventListener('mousemove', MouseMoveHandler);

  container.addEventListener('touchmove', touchHandler);
};
