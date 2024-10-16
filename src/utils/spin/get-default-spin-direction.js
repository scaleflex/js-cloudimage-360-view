import { AUTOPLAY_BEHAVIOR } from '../constants';

export const getDefaultSpinDirection = (autoplayBehavior) => {
  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_XY:
      return 'x';
    case AUTOPLAY_BEHAVIOR.SPIN_YX:
      return 'y';
    case AUTOPLAY_BEHAVIOR.SPIN_Y:
      return 'y';
    case AUTOPLAY_BEHAVIOR.SPIN_X:
    default:
      return 'x';
  }
};
