/* eslint-disable no-console */
import { prepareImagesFromFolder } from './images-from-folder/prepare-images-from-folder';
import { prepareImagesFromList } from './images-from-list/prepare-images-from-list';
import { loadOriginalImages } from './load-original-images';

export const preloadOriginalImages = (srcConfig, imagesSrc, onImageLoadCallback) => {
  const { imageList } = srcConfig || {};
  let imagesSets = {};

  if (imageList) {
    try {
      const images = JSON.parse(imageList);

      imagesSets = prepareImagesFromList(images, srcConfig);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  } else {
    imagesSets = prepareImagesFromFolder(imagesSrc, srcConfig);
  }

  const { originalSrc } = imagesSets || {};

  loadOriginalImages(originalSrc, onImageLoadCallback);
};
