export const getItemSkipped = (currentPosition, movementStart, speedFactor) => {
  const itemsSkipped = Math.floor(
    (currentPosition - movementStart) / speedFactor,
  ) || 1;

  return itemsSkipped;
};
