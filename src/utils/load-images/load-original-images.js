import { loadImageAsPromise } from './load-image-as-promise';

export const loadOriginalImages = async (imagesSrcs, cb) => {
  await Promise.all(imagesSrcs.map(async (src, index) => {
    await loadImageAsPromise(src, index, cb);
  }));
};
