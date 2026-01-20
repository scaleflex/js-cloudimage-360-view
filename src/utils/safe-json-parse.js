export const safeJsonParse = (jsonString, fallback = []) => {
  if (!jsonString) return fallback;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('CloudImage 360: Failed to parse JSON:', error.message);
    return fallback;
  }
};
