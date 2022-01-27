export const getSpeedFactor = (dragSpeed, amount, containerOffset) => {
  const containerOffsetWidth = Math.max(containerOffset, 600);
  const speedFactor = (dragSpeed / 150) * (36 / amount) * 25 * (containerOffsetWidth / 1500) || 1;

  return Math.floor(speedFactor);
};
