export const getThrottleTime = (dragSpeed, amount, containerOffset) => {
  const baseThrottle = 15; // Base throttle time in ms
  const minThrottle = 1; // Minimum throttle time
  const maxThrottle = 30; // Maximum throttle time

  // Calculate factors based on input parameters
  const containerFactor = Math.max(1, containerOffset / 100); // Adjust the scale factor
  const amountFactor = Math.max(1, 100 / amount); // Use a higher divisor to adjust sensitivity
  const speedFactor = Math.max(1, dragSpeed / 1000); // Higher divisor for drag speed

  // Dynamic throttle time calculation
  let throttleTime = baseThrottle + (containerFactor * amountFactor) / speedFactor;

  // Ensure throttle time is within min and max bounds
  throttleTime = Math.min(Math.max(throttleTime, minThrottle), maxThrottle);

  return Math.floor(throttleTime);
};
