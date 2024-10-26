/**
 * Generates a unique tracker ID
 * @returns {string} - A unique tracker ID
 */
export const generateTrackerId = () => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
  const randomNum = Math.random().toString(36).substring(2, 8); // Random string of 6 characters
  return `${timestamp}-${randomNum}`;
};