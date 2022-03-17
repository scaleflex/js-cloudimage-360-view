/* eslint-disable no-console */
import { prepareImagesFromFolder } from './images-from-folder/prepare-images-from-folder';
import { prepareImagesFromList } from './images-from-list/prepare-images-from-list';
import { loadOriginalImages } from './load-original-images';

export const preloadOriginalImages = (srcConfig, imagesSrc, cb) => {
  const { imageList } = srcConfig || {};
  let imagesSrcs = [];

  if (imageList) {
    try {
      const images = JSON.parse(imageList);

      imagesSrcs = prepareImagesFromList(images, srcConfig, true);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  } else {
    imagesSrcs = prepareImagesFromFolder(imagesSrc, srcConfig, true);
  }

  loadOriginalImages(imagesSrcs, cb);
};
