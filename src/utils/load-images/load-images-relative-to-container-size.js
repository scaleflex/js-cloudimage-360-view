import { loadImageAsPromise } from './load-image-as-promise';


export const loadImagesRelativeToContainerSize = (imagesSrcs, cb, index = 0) => {
  const imageSrc = imagesSrcs[index];

  if (index > (imagesSrcs.length - 1)) return;

  const imageLoadCallback = (image) => {
    const _index = index + 1;


    cb(image, index);
    loadImagesRelativeToContainerSize(imagesSrcs, cb, _index);
  }

  loadImageAsPromise(imageSrc, imageLoadCallback);
};
