import { prepareFirstImageFromFolder } from "./prepare-first-image/prepare-first-image-from-folder";
import { prepareFirstImageFromList } from "./prepare-first-image/prepare-first-image-from-list";

export const initLazyload = (imagesSrc, srcConfig, cb) => {
  const { imageList, lazySelector, innerBox } = srcConfig || {};
  let firstImageSrc;

  if (imageList) {
    try {
      const images = JSON.parse(imageList);

      firstImageSrc = prepareFirstImageFromList(images, srcConfig);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  } else {
    firstImageSrc = prepareFirstImageFromFolder(imagesSrc, srcConfig);
  }

  const image = new Image();

  image.setAttribute('data-src', firstImageSrc);
  image.style.position = 'absolute';
  image.style.top = 0;
  image.style.left = 0;
  image.style.width = '100%';
  image.style.maxWidth = '100%';
  image.style.maxHeight = '100%';


  if (lazySelector) image.className = lazySelector;

  innerBox.appendChild(image);

  if (cb) {
    image.onload = () => cb(image);
  }
}