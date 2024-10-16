import { AUTOPLAY_BEHAVIOR } from '../constants';

export const shouldSwitchSpinDirection = ({
  autoplayBehavior,
  activeImageX,
  activeImageY,
  amountX,
  amountY,
  autoplayReverse,
  spinDirection,
}) => {
  const reachedEdgeX = activeImageX === (autoplayReverse ? 0 : amountX);
  const reachedEdgeY = activeImageY === (autoplayReverse ? 0 : amountY);

  if (
    autoplayBehavior === AUTOPLAY_BEHAVIOR.SPIN_XY ||
    autoplayBehavior === AUTOPLAY_BEHAVIOR.SPIN_YX
  ) {
    return (spinDirection === 'x' && reachedEdgeX) || (spinDirection === 'y' && reachedEdgeY);
  }

  return false;
};
