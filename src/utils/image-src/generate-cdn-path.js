import { FALSY_VALUES } from '../constants';
import getSizeAccordingToPixelRatio from '../responsive/get-size-according-to-pixel-ratio';

const buildCdnUrl = (src, ciToken, finalApiVersion) => {
  const isCloudImageUrl = new URL(src).origin.includes('cloudimg');
  return isCloudImageUrl ? src : `https://${ciToken}.cloudimg.io/${finalApiVersion}${src}`;
};

const buildCropParams = (cropAspectRatio, cropGravity) =>
  cropAspectRatio ? `ar=${cropAspectRatio}&gravity=${cropGravity || 'auto'}` : '';

const buildTransformationParams = ({ ciTransformation, responsiveWidth, ciFilters }) => {
  const sizeParam = `width=${responsiveWidth}`;
  const transformation = ciTransformation || sizeParam;
  const filters = ciFilters ? `&f=${ciFilters}` : '';
  return `${transformation}${filters}`;
};

export const generateCdnPath = (srcConfig, width) => {
  const { folder, apiVersion, filename = '', ciParams } = srcConfig;
  const { ciToken, ciFilters, ciTransformation, cropAspectRatio, cropGravity } = ciParams || {};

  const src = `${folder}${filename}`;

  // If no ciToken or width is 0/falsy, return src without CDN transformation
  // Width can be 0 when container hasn't rendered yet (mobile, hidden elements)
  // Still append crop params — Filerobot URLs support ?ar=&gravity= natively
  if (!ciToken || !width) {
    const cropParams = buildCropParams(cropAspectRatio, cropGravity);
    if (!cropParams) return src;
    const sep = src.includes('?') ? '&' : '?';
    return `${src}${sep}${cropParams}`;
  }

  const version = !FALSY_VALUES.includes(apiVersion) ? apiVersion : null;
  const finalApiVersion = version ? `${version}/` : '';
  const responsiveWidth = getSizeAccordingToPixelRatio(width);

  const cdn = buildCdnUrl(src, ciToken, finalApiVersion);
  const transformationParams = buildTransformationParams({
    ciTransformation,
    responsiveWidth,
    ciFilters,
  });

  const cropParams = buildCropParams(cropAspectRatio, cropGravity);

  const params = [transformationParams, cropParams].filter(Boolean).join('&');

  return `${cdn}${params ? '?' : ''}${params}`;
};
