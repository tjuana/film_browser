/**
 * Extracts the 4-digit year from a date string, Date object, or timestamp.
 * Returns `null` if the value is invalid or cannot produce a year.
 */
export function yearOf(input?: string | Date | number): string | null {
  if (!input) return null;

  try {
    const date = input instanceof Date ? input : new Date(input);
    const year = date.getFullYear();
    return Number.isNaN(year) ? null : String(year);
  } catch {
    return null;
  }
}
