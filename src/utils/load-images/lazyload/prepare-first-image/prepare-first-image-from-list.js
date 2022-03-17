import { generateImagesPath } from "../../../image-src/generate-images-path";

export const prepareFirstImageFromList =  (images, srcConfig) => {
  const { folder } = srcConfig;

  const firstImageSrc = images[0];

  const nextSrcConfig = { ...srcConfig };
  nextSrcConfig.folder = /(http(s?)):\/\//gi.test(firstImageSrc) ? '' : folder;
  nextSrcConfig.filename = firstImageSrc;

  return generateImagesPath(nextSrcConfig);
}