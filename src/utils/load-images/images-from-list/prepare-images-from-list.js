import { generateImagesPath } from '../../image-src/generate-images-path';

export const prepareImagesFromList = (images, srcConfig) => {
  const { folder } = srcConfig;
  const resultSrc = [];
  const originalSrc = [];

  images.forEach((src) => {
    const nextSrcConfig = { ...srcConfig };
    nextSrcConfig.folder = /(http(s?)):\/\//gi.test(src) ? '' : folder;
    nextSrcConfig.filename = src;
    const lastIndex = resultSrc.lastIndexOf('//');

    resultSrc.push(generateImagesPath(nextSrcConfig));
    originalSrc.push(resultSrc.slice(lastIndex));
  });

  return {
    resultSrc,
    originalSrc,
  };
};
