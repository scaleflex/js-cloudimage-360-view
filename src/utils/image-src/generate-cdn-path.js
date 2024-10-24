import { FALSY_VALUES } from '../constants';
import getSizeAccordingToPixelRatio from '../responsive/get-size-according-to-pixel-ratio';

const buildCdnUrl = (src, ciToken, finalApiVersion) => {
  const isCloudImageUrl = new URL(src).origin.includes('cloudimg');
  return isCloudImageUrl ? src : `https://${ciToken}.cloudimg.io/${finalApiVersion}${src}`;
};

const buildTransformationParams = ({ ciTransformation, responsiveWidth, ciFilters }) => {
  const sizeParam = `width=${responsiveWidth}`;
  const transformation = ciTransformation || sizeParam;
  const filters = ciFilters ? `&f=${ciFilters}` : '';
  return `${transformation}${filters}`;
};

export const generateCdnPath = (srcConfig, width) => {
  const { folder, apiVersion, filename = '', ciParams } = srcConfig;
  const { ciToken, ciFilters, ciTransformation } = ciParams || {};

  const src = `${folder}${filename}`;

  if (!ciToken) return src;

  const version = !FALSY_VALUES.includes(apiVersion) ? apiVersion : null;
  const finalApiVersion = version ? `${version}/` : '';
  const responsiveWidth = getSizeAccordingToPixelRatio(width);

  const cdn = buildCdnUrl(src, ciToken, finalApiVersion);
  const transformationParams = buildTransformationParams({
    ciTransformation,
    responsiveWidth,
    ciFilters,
  });

  return `${cdn}${transformationParams ? '?' : ''}${transformationParams}`;
};
