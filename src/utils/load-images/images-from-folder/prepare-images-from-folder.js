import { AND_SYMBOL_REGEX, ORGINAL_SIZE_REGEX } from '../../../constants/regex';
import { pad } from '../pad';

export const prepareImagesFromFolder = (imagesSrc, srcConfig) => {
  const { amount, indexZeroBase } = srcConfig || {};

  const resultSrc = [];
  const originalSrc = [];

  [...new Array(amount)].forEach((_item, index) => {
    const nextZeroFilledIndex = pad(index + 1, indexZeroBase);
    const imageResultSrc = imagesSrc.replace('{index}', nextZeroFilledIndex);
    const imageOriginalSrc = imageResultSrc
      .replace(ORGINAL_SIZE_REGEX, '')
      .replace(AND_SYMBOL_REGEX, '?');

    resultSrc.push(imageResultSrc);
    originalSrc.push(imageOriginalSrc);
  });

  return {
    resultSrc,
    originalSrc,
  };
};
