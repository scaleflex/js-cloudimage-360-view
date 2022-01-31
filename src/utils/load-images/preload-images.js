/* eslint-disable no-console */
import { loadImagesRelativeToContainerSize } from './load-images-relative-to-container-size';
import { prepareImagesFromFolder } from './images-from-folder/prepare-images-from-folder';
import { prepareImagesFromList } from './images-from-list/prepare-images-from-list';

export const preloadImages = (srcConfig, imagesSrc, onImageLoadCallback) => {
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

  const { resultSrc } = imagesSets || {};

  loadImagesRelativeToContainerSize(resultSrc, srcConfig, onImageLoadCallback);
};
