/* eslint-disable no-console */
import { loadImagesRelativeToContainerSize } from "./load-images-relative-to-container-size";
import { prepareImagesFromFolder } from "./images-from-folder/prepare-images-from-folder";
import { prepareImagesFromList } from "./images-from-list/prepare-images-from-list";

export const preloadImages = ({ config, imagesSrcPlaceholder, cb }) => {
  const { imageList } = config || {};
  let imagesSrc = [];

  if (imageList) {
    try {
      const images = JSON.parse(imageList);

      imagesSrc = prepareImagesFromList(images, config);
    } catch (error) {
      console.error(`Wrong format in image-list attribute: ${error.message}`);
    }
  } else {
    imagesSrc = prepareImagesFromFolder(imagesSrcPlaceholder, config);
  }

  loadImagesRelativeToContainerSize(imagesSrc, cb);
};
