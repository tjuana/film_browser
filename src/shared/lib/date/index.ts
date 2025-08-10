/**
 * Extracts the 4-digit year from a date string, Date object, or timestamp.
 * Returns `undefined` if the value is invalid or cannot produce a year.
 *
 * Handles:
 * - ISO date strings (2024-01-15)
 * - Year-first formats (2024-01-15T10:30:00Z)
 * - Simple year strings (2024)
 * - Date objects and timestamps
 */
export function getYear(
  input?: string | Date | number | null
): string | undefined {
  if (input === null || input === undefined || input === '') return undefined;

  try {
    // Handle simple year string (4 digits)
    if (typeof input === 'string') {
      const yearMatch = input.match(/^\d{4}/);
      if (yearMatch) {
        const yearNum = parseInt(yearMatch[0], 10);
        if (yearNum >= 1900 && yearNum <= 2100) {
          return yearMatch[0];
        }
      }
    }

    // Handle Date objects and other formats
    const date = input instanceof Date ? input : new Date(input);
    const year = date.getFullYear();

    if (Number.isNaN(year) || year < 1900 || year > 2100) {
      return undefined;
    }

    return String(year);
  } catch {
    return undefined;
  }
}
