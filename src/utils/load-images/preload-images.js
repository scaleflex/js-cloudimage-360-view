/* eslint-disable no-console */
import { loadImagesRelativeToContainerSize } from './load-images-relative-to-container-size';
import { prepareImagesFromFolder } from './images-from-folder/prepare-images-from-folder';
import { prepareImagesFromList } from './images-from-list/prepare-images-from-list';

export const preloadImages = (srcConfig, imagesSrc, cb) => {
  const { imageList } = srcConfig || {};
  let imagesSrcs = [];

  if (imageList) {
    try {
      const images = JSON.parse(imageList);

      imagesSrcs = prepareImagesFromList(images, srcConfig);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  } else {
    imagesSrcs = prepareImagesFromFolder(imagesSrc, srcConfig);
  }

  loadImagesRelativeToContainerSize(imagesSrcs, cb);
};
