import { loadImageAsPromise } from './load-image-as-promise';

export const loadOriginalImages = async (imagesSrcs, onImageLoadCallback) => {
  await Promise.all(imagesSrcs.map(async (src, index) => {
    await loadImageAsPromise(src, index, null, onImageLoadCallback);
  }));
};
