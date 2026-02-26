/**
 * Convert seconds to time format (HH:MM:SS).
 *
 * @param {number} time - The time in seconds.
 * @return {string} The time in HH:MM:SS format.
 */
export default function displayTime(time: number) {
  const hour: number = Math.floor(time / 3600);
  const minute: number = Math.floor((time % 3600) / 60);
  const second: number = time % 60;
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}
