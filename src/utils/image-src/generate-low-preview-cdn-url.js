import removeParamByRegex from './removeParamByRegex';

const generateLowPreviewCdnUrl = (cdnUrl) => {
  const cleanedCdnUrl = removeParamByRegex(cdnUrl, 'width');
  const separator = cleanedCdnUrl.includes('?') ? '&' : '?';

  return `${cleanedCdnUrl}${separator}width=${150 * devicePixelRatio}`;
};

export default generateLowPreviewCdnUrl;
