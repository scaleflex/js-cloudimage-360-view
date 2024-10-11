import { loadImageAsPromise } from './load-image-as-promise';

export const loadImagesRelativeToContainerSize = (imagesSrcs, cb, index = 0) => {
  const imageSrc = imagesSrcs[index];

  // If index exceeds the number of images, exit the recursion
  if (index > (imagesSrcs.length - 1)) return;

  const imageLoadCallback = (image) => {
    const _index = index + 1;

    // Apply lazyload class and data-src for lazysizes
    image.classList.add('lazyload'); // Add lazysizes class
    image.setAttribute('data-src', imageSrc); // Use data-src instead of src

    // Callback to process the image
    cb(image, index);

    // Recursively load the next image
    loadImagesRelativeToContainerSize(imagesSrcs, cb, _index);
  };

  // Load the image with a promise and apply the callback
  loadImageAsPromise(imageSrc, imageLoadCallback);
};
