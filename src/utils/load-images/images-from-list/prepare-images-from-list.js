import { generateImagesPath } from '../../image-src/generate-images-path';

export const prepareImagesFromList = (images, srcConfig, loadOriginalImages ) => {
  const { folder } = srcConfig;

  return images.map((src) => {
    const nextSrcConfig = { ...srcConfig };
    nextSrcConfig.folder = /(http(s?)):\/\//gi.test(src) ? '' : folder;
    nextSrcConfig.filename = src;

    if (loadOriginalImages) {
      const lastIndex = resultSrc.lastIndexOf('//');

      return resultSrc.slice(lastIndex);
    }

    return generateImagesPath(nextSrcConfig);
  });
};
