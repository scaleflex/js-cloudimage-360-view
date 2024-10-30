export const getMovingDirection = ({ deltaX, deltaY, reversed, allowSpinX, allowSpinY, threshold = 0 }) => {
  const appliedThreshold = (allowSpinX && !allowSpinY) || (allowSpinY && !allowSpinX) ? 0 : threshold;
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (allowSpinX && absDeltaX - appliedThreshold > absDeltaY) {
    if (reversed) return deltaX > 0 ? 'left' : 'right';

    return deltaX > 0 ? 'right' : 'left';
  }

  if (allowSpinY && absDeltaY - appliedThreshold > absDeltaX) {
    if (reversed) return deltaY > 0 ? 'up' : 'down';

    return deltaY > 0 ? 'down' : 'up';
  }

  return null;
};
