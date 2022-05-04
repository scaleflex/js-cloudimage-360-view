import { FALSY_VALUES } from '../../constants/falsy-values';
import { getResponsiveWidthOfContainer } from '../responsive/get-responsive-width-of-container';
import { getSizeAccordingToPixelRatio } from '../responsive/get-size-according-to-pixel-ratio';

export const generateImagesPath = (srcConfig, loadOriginalImages) => {
  const {
    container, folder, apiVersion, filename = '', ciParams,
  } = srcConfig;

  const { ciToken, ciFilters, ciTransformation } = ciParams || {};

  let src = `${folder}${filename}`;

  if (ciToken) {
    const imageOffsetWidth = container.offsetWidth;

    const version = !FALSY_VALUES.includes(apiVersion) ? apiVersion : null;

    const finalApiVersion = version ? `${version}/` : '';
    const ciSizeNext = getSizeAccordingToPixelRatio(getResponsiveWidthOfContainer(imageOffsetWidth));

    const isCloudImageUrl = new URL(src).origin.includes('cloudimg');
    const cdn = isCloudImageUrl ? src
      : `https://${ciToken}.cloudimg.io/${finalApiVersion}${src}`;

    src = `${cdn}?${ciTransformation || `${!loadOriginalImages ? `width=${ciSizeNext}`: ''} `}${ciFilters ? `&f=${ciFilters}` : ''}`;
  }

  return src;
};
