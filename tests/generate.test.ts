import { describe, it, expect } from 'vitest';
import { generateSecret } from '../src/generate.js';
import { isValidGuess } from '../src/validation.js';

describe('generateSecret', () => {
  it('takes the first available digit when random returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
    expect(generateSecret(3, 16, () => 0)).toBe('012');
  });

  it('takes the last available digit when random returns almost 1', () => {
    expect(generateSecret(4, 10, () => 0.99)).toBe('9876');
    expect(generateSecret(3, 16, () => 0.99)).toBe('fed');
  });

  it('picks from the remaining digits only', () => {
    expect(generateSecret(4, 10, () => 0.5)).toBe('5463');
  });

  it('generates both binary secrets', () => {
    expect(generateSecret(2, 2, () => 0)).toBe('01');
    expect(generateSecret(2, 2, () => 0.99)).toBe('10');
  });

  it('returns a valid secret for different random values', () => {
    expect(
      isValidGuess(
        generateSecret(6, 16, () => 0.3),
        6,
        16,
      ),
    ).toBe(true);
    expect(
      isValidGuess(
        generateSecret(5, 8, () => 0.7),
        5,
        8,
      ),
    ).toBe(true);
  });

  it('uses Math.random by default', () => {
    expect(isValidGuess(generateSecret(4, 10), 4, 10)).toBe(true);
  });
});
