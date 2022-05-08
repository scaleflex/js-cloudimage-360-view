import { get360ViewProps } from '../../ci360.utils';


export const getSrcXConfig = (container, innerBox, fullscreenView) => {
  const {
    folder,
    filenameX,
    imageListX,
    apiVersion,
    ciParams,
    lazySelector,
    amountX,
    indexZeroBase,
  } = get360ViewProps(container);

  return {
    folder,
    filename: filenameX,
    imageList: imageListX,
    container,
    innerBox,
    apiVersion,
    ciParams,
    lazySelector,
    amount: amountX,
    indexZeroBase,
    fullscreen: fullscreenView,
  };
};
