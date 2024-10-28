import { addOrUpdateParam } from './add-or-update-param';

export const generateHighPreviewCdnUrl = (url, width) => addOrUpdateParam(url, 'width', width);
