import { pad } from '../../pad';

const getFirstCdnImage = (cdnPath, indexZeroBase) => {
  const nextZeroFilledIndex = pad(1, indexZeroBase);

  return cdnPath.replace('{index}', nextZeroFilledIndex);
};

export default getFirstCdnImage;
