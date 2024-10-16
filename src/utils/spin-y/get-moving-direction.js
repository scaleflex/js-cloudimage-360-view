export const getMovingDirection = (deltaX, deltaY, allowSpinY, threshold = 1) => {
  // Check if the movement along the X-axis is greater than along the Y-axis
  if (Math.abs(deltaX) - threshold > Math.abs(deltaY) || !allowSpinY) {
    return deltaX > 0 ? 'right' : 'left';
  }

  // If Y-axis movement is allowed
  if (Math.abs(deltaY) - threshold > Math.abs(deltaX) && allowSpinY) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return null; // Return null if no valid direction is determined
};
