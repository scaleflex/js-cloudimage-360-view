import { generateCdnPath } from '../../image-src/generate-cdn-path';

export const prepareImagesFromList = (images, srcConfig, loadOriginalImages) => {
  const { folder } = srcConfig;

  return images.map((src) => {
    const nextSrcConfig = { ...srcConfig };
    nextSrcConfig.folder = /(http(s?)):\/\//gi.test(src) ? '' : folder;
    nextSrcConfig.filename = src;

    return generateCdnPath(nextSrcConfig, loadOriginalImages);
  });
};
