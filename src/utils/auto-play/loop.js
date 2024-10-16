import { AUTOPLAY_BEHAVIOR } from '../constants';

const handleSpinY = (reversed, { bottom, top }) => {
  if (reversed) {
    bottom();
  } else {
    top();
  }
};

const handleSpinX = (reversed, { left, right }) => {
  if (reversed) {
    left();
  } else {
    right();
  }
};

export const loop = ({ autoplayBehavior, spinY, reversed, loopTriggers }) => {
  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_XY:
    case AUTOPLAY_BEHAVIOR.SPIN_YX:
      if (spinY) {
        handleSpinY(reversed, loopTriggers);
      } else {
        handleSpinX(reversed, loopTriggers);
      }
      break;

    case AUTOPLAY_BEHAVIOR.SPIN_Y:
      handleSpinY(reversed, loopTriggers);
      break;

    case AUTOPLAY_BEHAVIOR.SPIN_X:
    default:
      handleSpinX(reversed, loopTriggers);
  }
};
