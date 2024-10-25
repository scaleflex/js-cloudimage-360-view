import { removeParamByRegex } from './remove-param-by-regex';

export const generateHighPreviewCdnUrl = (url) => removeParamByRegex(url, 'width');
