import { loadImageAsPromise } from './load-image-as-promise';

export const loadImagesRelativeToContainerSize = async (imagesSrcs, srcConfig, onImageLoadCallback) => {
  await Promise.all(imagesSrcs.map(async (src, index) => {
    await loadImageAsPromise(src, index, srcConfig, onImageLoadCallback);
  }));
};
