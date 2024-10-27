export const getMovingDirection = ({ deltaX, deltaY, allowSpinX, allowSpinY, threshold = 2 }) => {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  // X-axis movement logic
  if (allowSpinX && absDeltaX - threshold > absDeltaY) {
    return deltaX > 0 ? 'right' : 'left';
  }

  // Y-axis movement logic
  if (allowSpinY && absDeltaY - threshold > absDeltaX) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return null;
};
