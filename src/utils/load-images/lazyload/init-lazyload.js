import generateLowPreviewCdnUrl from '../../image-src/generate-low-preview-cdn-url';
import getFirstCdnImage from './prepare-first-image/get-first-cdn-image';
import getFirstCdnImageFromList from './prepare-first-image/get-first-cdn-mage-from-list';

const getFirstImageSrc = (imagesSrc, srcConfig) => {
  const { imageList, indexZeroBase } = srcConfig;

  if (imageList) {
    try {
      const images = JSON.parse(imageList);
      return getFirstCdnImageFromList(images, srcConfig);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  }

  return getFirstCdnImage(imagesSrc, indexZeroBase);
};

const createImage = (src, lazySelector) => {
  const image = new Image();
  image.setAttribute('data-src', src);
  image.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    filter: blur(10px);
  `;

  if (lazySelector) image.className = `${lazySelector} cloudimage-lazy`;

  return image;
};

export const initLazyload = (cdnPath, srcConfig, onLoad) => {
  const { lazySelector, innerBox } = srcConfig || {};

  const firstImageSrc = getFirstImageSrc(cdnPath, srcConfig);
  const lowPreviewSrc = generateLowPreviewCdnUrl(firstImageSrc);
  const image = createImage(lowPreviewSrc, lazySelector);

  image.onload = (event) => {
    if (onLoad) {
      onLoad({
        event: event,
        width: image.width,
        height: image.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        src: lowPreviewSrc,
      });
    }
  };

  innerBox.appendChild(image);
};
