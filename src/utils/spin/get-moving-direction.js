export const getMovingDirection = ({ deltaX, deltaY, allowSpinX, allowSpinY, threshold = 1 }) => {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (allowSpinX && absDeltaX - threshold > absDeltaY) {
    return deltaX > 0 ? 'right' : 'left';
  }

  if (allowSpinY && absDeltaY - threshold > absDeltaX) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return null;
};
