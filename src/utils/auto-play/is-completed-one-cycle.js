import { AUTOPLAY_BEHAVIOR } from '../constants';

export const isCompletedOneCycle = ({
  autoplayBehavior,
  activeImageX,
  activeImageY,
  amountX,
  amountY,
  autoplayReverse,
}) => {
  const checkEdge = (activeImage, amount) => {
    const lastIndex = amount - 1; // Calculate the last index
    return autoplayReverse ? activeImage === 0 : activeImage === lastIndex;
  };

  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_XY:
    case AUTOPLAY_BEHAVIOR.SPIN_Y:
      return checkEdge(activeImageY, amountY);

    case AUTOPLAY_BEHAVIOR.SPIN_X:
    case AUTOPLAY_BEHAVIOR.SPIN_YX:
    default:
      return checkEdge(activeImageX, amountX);
  }
};
