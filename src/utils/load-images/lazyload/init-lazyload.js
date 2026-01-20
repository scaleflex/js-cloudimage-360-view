import { removeElementFromContainer } from '../../container-elements';
import { safeJsonParse } from '../../safe-json-parse';
import generateLowPreviewCdnUrl from '../../image-src/generate-low-preview-cdn-url';
import lazyLoadImages from './lazyload-image';
import getFirstCdnImage from './prepare-first-image/get-first-cdn-image';
import getFirstCdnImageFromList from './prepare-first-image/get-first-cdn-mage-from-list';

const getFirstImageSrc = (imagesSrc, srcConfig) => {
  const { imageList, indexZeroBase } = srcConfig;

  if (imageList.length) {
    const images = safeJsonParse(imageList, null);
    if (images) {
      return getFirstCdnImageFromList(images, srcConfig);
    }
  }

  return getFirstCdnImage(imagesSrc, indexZeroBase);
};

const createImage = (src, lazyload, className) => {
  const image = new Image();
  image.setAttribute(lazyload ? 'data-src' : 'src', src);
  image.className = className;
  image.style.cssText = `
    position: ${lazyload ? 'absolute' : 'static'};
    width: 100%;
    inset: 0;
    height: 100%;
    object-fit: contain;
    object-position: center;
    filter: blur(10px);
  `;

  return image;
};

export const initLazyload = (cdnPath, srcConfig, onLoad) => {
  const { innerBox, imageList, lazyload } = srcConfig || {};
  const [firstImageSrcInList] = imageList;
  const firstImageSrc = firstImageSrcInList || getFirstImageSrc(cdnPath, srcConfig);
  const lowPreviewSrc = generateLowPreviewCdnUrl(firstImageSrc);
  const lazyloadImage = createImage(lowPreviewSrc, lazyload, 'cloudimage-lazy');
  const placeholderImage = createImage(lowPreviewSrc, false, 'cloudimage-360-placeholder');

  const loadImageCallback = (event) => {
    removeElementFromContainer(innerBox, '.cloudimage-lazy');

    if (onLoad) {
      onLoad({
        event: event,
        width: lazyloadImage.width,
        height: lazyloadImage.height,
        naturalWidth: lazyloadImage.naturalWidth,
        naturalHeight: lazyloadImage.naturalHeight,
        src: lowPreviewSrc,
      });
    }
  };

  lazyloadImage.onload = loadImageCallback;
  innerBox.appendChild(lazyloadImage);
  innerBox.appendChild(placeholderImage);

  lazyLoadImages(lazyloadImage);
};
