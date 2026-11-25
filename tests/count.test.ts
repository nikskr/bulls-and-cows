import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../src/count.js';

describe('countPossibleSecrets', () => {
  it('returns 1 for zero length', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns base for length 1', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  it('counts permutations without repetition', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(3, 8)).toBe(336);
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns 2 for binary length 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns the same result on repeated calls', () => {
    expect(countPossibleSecrets(5, 10)).toBe(30240);
    expect(countPossibleSecrets(5, 10)).toBe(30240);
  });
});
