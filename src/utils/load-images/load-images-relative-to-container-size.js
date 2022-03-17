import { loadImageAsPromise } from './load-image-as-promise';

export const loadImagesRelativeToContainerSize = async (imagesSrcs, cb) => {
  await Promise.all(imagesSrcs.map(async (src, index) => {
    await loadImageAsPromise(src, index, cb);
  }));
};
