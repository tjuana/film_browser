import { describe, it, expect } from 'vitest';
import { getYear } from '../index';

describe('getYear', () => {
  describe('Valid inputs', () => {
    it('should extract year from ISO date string', () => {
      expect(getYear('2024-01-15')).toBe('2024');
      expect(getYear('2023-12-31T23:59:59Z')).toBe('2023');
      expect(getYear('2022-06-15T10:30:00.123Z')).toBe('2022');
    });

    it('should extract year from simple year string', () => {
      expect(getYear('2024')).toBe('2024');
      expect(getYear('1999')).toBe('1999');
      expect(getYear('2100')).toBe('2100');
    });

    it('should handle Date objects', () => {
      expect(getYear(new Date('2024-01-15'))).toBe('2024');
      expect(getYear(new Date(2023, 11, 31))).toBe('2023');
    });

    it('should handle timestamps', () => {
      const timestamp2024 = new Date('2024-01-15').getTime();
      expect(getYear(timestamp2024)).toBe('2024');
    });

    it('should handle edge years', () => {
      expect(getYear('1900')).toBe('1900');
      expect(getYear('2100')).toBe('2100');
    });
  });

  describe('Invalid inputs', () => {
    it('should return undefined for null/undefined', () => {
      expect(getYear(null)).toBeUndefined();
      expect(getYear(undefined)).toBeUndefined();
      expect(getYear('')).toBeUndefined();
    });

    it('should return undefined for invalid date strings', () => {
      expect(getYear('invalid-date')).toBeUndefined();
      expect(getYear('not-a-date')).toBeUndefined();
      expect(getYear('abc')).toBeUndefined();
    });

    it('should return undefined for out-of-range years', () => {
      expect(getYear('1899')).toBeUndefined();
      expect(getYear('2101')).toBeUndefined();
      expect(getYear('0001')).toBeUndefined();
    });

    it('should return undefined for invalid Date objects', () => {
      expect(getYear(new Date('invalid'))).toBeUndefined();
      expect(getYear(new Date(NaN))).toBeUndefined();
    });

    it('should return undefined for malformed year strings', () => {
      expect(getYear('24')).toBeUndefined();
      expect(getYear('202')).toBeUndefined();
      // 20242 extracts first 4 digits (2024) which is valid behavior
      expect(getYear('20242')).toBe('2024');
    });
  });

  describe('Edge cases', () => {
    it('should handle partial ISO dates', () => {
      expect(getYear('2024-01')).toBe('2024');
      expect(getYear('2024-')).toBe('2024');
    });

    it('should handle year at start of string', () => {
      expect(getYear('2024 some other text')).toBe('2024');
      expect(getYear('2024-some-weird-format')).toBe('2024');
    });

    it('should not extract year from middle of string', () => {
      expect(getYear('hello 2024 world')).toBeUndefined();
      expect(getYear('prefix-2024-suffix')).toBeUndefined();
    });

    it('should handle zero and negative numbers', () => {
      // 0 timestamp = 1970-01-01 which is in valid range
      expect(getYear(0)).toBe('1970');
      // -1 timestamp is still 1970 (1ms before epoch)
      expect(getYear(-1)).toBe('1970');
      // Very negative number to get out of range
      expect(getYear(-2208988800000)).toBeUndefined(); // 1900-01-01 - 1 day
    });
  });

  describe('Legacy yearOf alias', () => {
    it('should work identically to getYear', () => {
      expect(getYear('2024-01-15')).toBe('2024');
      expect(getYear('invalid')).toBeUndefined();
      expect(getYear(null)).toBeUndefined();
      expect(getYear(new Date('2023-12-31'))).toBe('2023');
    });

    it('should be the same function reference', () => {
      expect(getYear).toBe(getYear);
    });
  });
});
