export const getItemSkipped = (previousPosition, currentPosition, speedFactor = 1) =>
  Math.abs(Math.floor((currentPosition - previousPosition) / speedFactor)) || 1;
