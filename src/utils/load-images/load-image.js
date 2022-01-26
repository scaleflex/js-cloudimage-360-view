export const loadImage = (src, index, srcConfig) => {
  const { lazyload, lazySelector, fullscreenView } = srcConfig || {};
  const image = new Image();

  if (lazyload && !fullscreenView) {
    image.setAttribute('data-src', src);
    image.className = image.className.length ? `${image.className} ${lazySelector}` : lazySelector;
  } else {
    image.src = src;
  }

  return image;
};
