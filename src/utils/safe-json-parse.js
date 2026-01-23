export const safeJsonParse = (input, fallback = []) => {
  if (!input) return fallback;

  // If already an array, return it directly (for JS API usage)
  if (Array.isArray(input)) return input;

  // Parse JSON string (for HTML attribute usage)
  try {
    return JSON.parse(input);
  } catch (error) {
    console.warn('CloudImage 360: Failed to parse JSON:', error.message);
    return fallback;
  }
};
