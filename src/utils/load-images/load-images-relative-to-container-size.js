import { loadImageAsPromise } from "./load-image-as-promise";

/**
 * Loads images relative to container size.
 * @param {Array} imagesSrc - Array of image sources.
 * @param {Function} cb - Callback function to be executed after each image is loaded.
 */
export const loadImagesRelativeToContainerSize = (imagesSrc, cb) => {
  let currentIndex = 0;

  const handleImageLoad = (image) => {
    cb(image, currentIndex);

    currentIndex++;

    loadNextImage();
  };

  const loadNextImage = () => {
    if (currentIndex >= imagesSrc.length) {
      return;
    }

    loadImageAsPromise(imagesSrc[currentIndex], handleImageLoad);
  };

  loadNextImage();
};
