import { generateCdnPath } from '../../../image-src/generate-cdn-path';

const getFirstCdnImageFromList = (images, srcConfig) => {
  const [firstImageSrc] = images;
  const isAbsoluteUrl = /(https?):\/\//i.test(firstImageSrc);

  return generateCdnPath({
    ...srcConfig,
    folder: isAbsoluteUrl ? '' : srcConfig.folder,
    filename: firstImageSrc,
  });
};

export default getFirstCdnImageFromList;
