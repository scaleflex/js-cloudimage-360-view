import { AND_SYMBOL_REGEX, ORGINAL_SIZE_REGEX } from '../../../constants/regex';
import { pad } from '../pad';

export const prepareImagesFromFolder = (imagesSrc, srcConfig, loadOriginalImages) => {
  const { amount, indexZeroBase } = srcConfig || {};

  return [...new Array(amount)].map((_item, index) => {
    const nextZeroFilledIndex = pad(index + 1, indexZeroBase);
    let imageSrc;
    if (srcConfig.modeXY) {
      const x = index % srcConfig.amountX;
      const y = Math.floor(index / srcConfig.amountX);
      imageSrc = imagesSrc;
      imageSrc = imageSrc.replace('{x}', x);
      imageSrc = imageSrc.replace('{y}', y);
    } else {
      imageSrc = imagesSrc.replace('{index}', nextZeroFilledIndex);
    }

    if (loadOriginalImages) {
      const imageOriginalSrc = imageSrc
        .replace(ORGINAL_SIZE_REGEX, '')
        .replace(AND_SYMBOL_REGEX, '?');

      return imageOriginalSrc;
    }

    return imageSrc;
  });
};
