import { pad } from "../../pad";

export const prepareFirstImageFromFolder = (imagesSrcs, srcConfig) => {
  const {indexZeroBase } = srcConfig || {};
  const nextZeroFilledIndex = pad(1, indexZeroBase);

  return imagesSrcs.replace('{index}', nextZeroFilledIndex);
}