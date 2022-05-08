import { get360ViewProps } from '../../ci360.utils';
import { ORIENTATIONS } from '../../constants';


export const getSrcYConfig = (container, innerBox, fullscreenView) => {
  const {
    folder,
    filenameY,
    imageListY,
    apiVersion,
    ciParams,
    lazySelector,
    amountY,
    indexZeroBase,
  } = get360ViewProps(container);

  return {
    folder,
    filename: filenameY,
    imageList: imageListY,
    container,
    innerBox,
    apiVersion,
    ciParams,
    lazySelector,
    amount: amountY,
    orientation: ORIENTATIONS.Y,
    indexZeroBase,
    fullscreen: fullscreenView,
  };
};
