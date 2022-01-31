import { AUTOPLAY_BEHAVIOR } from '../../constants/auto-play-behavior';

export const loop = (autoplayBehavior, spinY, reversed, loopTriggers) => {
  const {
    bottom, top, left, right,
  } = loopTriggers;

  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_Y:
      if (reversed) {
        bottom();
      } else {
        top();
      }
      break;

    case AUTOPLAY_BEHAVIOR.SPIN_XY:
      if (spinY) {
        if (reversed) {
          bottom();
        } else {
          top();
        }
      } else if (reversed) {
        left();
      } else {
        right();
      }
      break;

    case AUTOPLAY_BEHAVIOR.SPIN_YX:
      if (spinY) {
        if (reversed) {
          bottom();
        } else {
          top();
        }
      } else if (reversed) {
        left();
      } else {
        right();
      }
      break;

    case AUTOPLAY_BEHAVIOR.SPIN_X:
    default:
      if (reversed) {
        left();
      } else {
        right();
      }
  }
};
