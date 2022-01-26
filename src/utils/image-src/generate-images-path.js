import { FALSY_VALUES } from '../../constants/falsy-values';
import { getResponsiveWidthOfContainer } from '../responsive/get-responsive-width-of-container';
import { getSizeAccordingToPixelRatio } from '../responsive/get-size-according-to-pixel-ratio';

export const generateImagesPath = (srcConfig) => {
  const {
    container, folder, apiVersion, filename = '', ciParams,
  } = srcConfig;

  const { ciToken, ciFilters, ciTransformation } = ciParams || {};

  let src = `${folder}${filename}`;

  if (ciToken) {
    const imageOffsetWidth = container.offsetWidth;

    const vesrion = FALSY_VALUES.includes(apiVersion) ? null : apiVersion;
    const finalApiVersion = vesrion ? `${vesrion}/` : '';
    const ciSizeNext = getSizeAccordingToPixelRatio(getResponsiveWidthOfContainer(imageOffsetWidth));

    src = `https://${ciToken}.cloudimg.io/${finalApiVersion}${src}?${ciTransformation || `width=${ciSizeNext}`}${ciFilters ? `&f=${ciFilters}` : ''}`;
  }

  return src;
};
