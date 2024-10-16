import { FALSY_VALUES } from '../constants';
import getSizeAccordingToPixelRatio from '../responsive/get-size-according-to-pixel-ratio';

const buildCdnUrl = (src, ciToken, finalApiVersion) => {
  const isCloudImageUrl = new URL(src).origin.includes('cloudimg');
  return isCloudImageUrl ? src : `https://${ciToken}.cloudimg.io/${finalApiVersion}${src}`;
};

const buildTransformationParams = ({ ciTransformation, loadOriginalImages, responsiveWidth, ciFilters }) => {
  const sizeParam = loadOriginalImages ? '' : `width=${responsiveWidth}`;
  const transformation = ciTransformation || sizeParam;
  const filters = ciFilters ? `&f=${ciFilters}` : '';
  return `${transformation}${filters}`;
};

export const generateCdnPath = (srcConfig, loadOriginalImages) => {
  const { container, folder, apiVersion, filename = '', ciParams } = srcConfig;
  const { ciToken, ciFilters, ciTransformation } = ciParams || {};

  const src = `${folder}${filename}`;

  if (!ciToken) return src;

  const version = !FALSY_VALUES.includes(apiVersion) ? apiVersion : null;
  const finalApiVersion = version ? `${version}/` : '';
  const responsiveWidth = getSizeAccordingToPixelRatio(container.offsetWidth);

  const cdn = buildCdnUrl(src, ciToken, finalApiVersion);
  const transformationParams = buildTransformationParams({
    ciTransformation,
    loadOriginalImages,
    responsiveWidth,
    ciFilters,
  });

  return `${cdn}${transformationParams ? '?' : ''}${transformationParams}`;
};
