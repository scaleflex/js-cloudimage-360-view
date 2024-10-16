import removeParamByRegex from './removeParamByRegex';

export const generateHighPreviewCdnUrl = (url) => removeParamByRegex(url, 'width');
