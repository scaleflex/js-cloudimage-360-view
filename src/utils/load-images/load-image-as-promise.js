import { ORIENTATIONS } from '../../constants/orientations';

export const loadImageAsPromise = async (src, index, srcConfig, onImageLoadCallback = () => {}) => {
  const {
    lazyload, lazySelector, fullscreenView, innerBox, orientation,
  } = srcConfig || {};
  const image = new Image();

  if (lazyload && !fullscreenView) {
    image.setAttribute('data-src', src);
    image.className = image.className.length ? `${image.className} ${lazySelector}` : lazySelector;

    if (index === 0 && orientation !== ORIENTATIONS.Y) {
      image.style.position = 'absolute';
      image.style.top = '0';
      image.style.left = '0';

      innerBox.appendChild(image);
    }

    image.onload = () => onImageLoadCallback(image, index);
  } else {
    image.src = src;
  }

  return new Promise((reslove) => {
    image.onload = () => {
      onImageLoadCallback(image, index);
      reslove(image);
    };

    image.onerror = () => {
      onImageLoadCallback(image, index);
      reslove(image);
    };
  });
};
