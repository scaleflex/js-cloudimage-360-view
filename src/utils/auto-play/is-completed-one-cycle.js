import { AUTOPLAY_BEHAVIOR } from '../../constants/auto-play-behavior';

export const isCompletedOneCycle = (autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed) => {
  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_XY:
    case AUTOPLAY_BEHAVIOR.SPIN_Y: {
      const isReachedTheEdge = isReversed ? (activeImageY === 1)
        : (activeImageY === amountY);

      if (isReachedTheEdge) return true;

      return false;
    }

    case AUTOPLAY_BEHAVIOR.SPIN_X:
    case AUTOPLAY_BEHAVIOR.SPIN_YX:
    default: {
      const isReachedTheEdge = isReversed ? (activeImageX === 1)
        : (activeImageX === amountX);

      if (isReachedTheEdge) return true;

      return false;
    }
  }
};
