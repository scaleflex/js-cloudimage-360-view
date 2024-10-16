import { pad } from './pad';

export const generateImagesCdnLinks = (cdnPath, { amount = 0, indexZeroBase = 0 } = {}) =>
  Array.from({ length: amount }, (_, index) => cdnPath.replace('{index}', pad(index + 1, indexZeroBase)));
