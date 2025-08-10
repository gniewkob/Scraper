import { describe, expect, it } from 'vitest';
import { getPages } from './pagination';

describe('getPages', () => {
  it('returns all pages when count is small', () => {
    expect(getPages(5, 3)).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles start of range', () => {
    expect(getPages(10, 1)).toEqual([1, 2, 3, '...', 10]);
  });

  it('handles middle range', () => {
    expect(getPages(10, 5)).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 10]);
  });

  it('handles end of range', () => {
    expect(getPages(10, 9)).toEqual([1, '...', 7, 8, 9, 10]);
  });
});
