export const getSpeedFactor = (dragSpeed, amount, containerOffset) => {
  return Math.floor(((((dragSpeed / 150) * 36) / amount) * 25 * containerOffset) / 1500) || 1;
};
