import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../src/validation.js';

describe('isValidGuess', () => {
  it('accepts a correct guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('accepts hex digits in any case', () => {
    expect(isValidGuess('ab12', 4, 16)).toBe(true);
    expect(isValidGuess('AB12', 4, 16)).toBe(true);
  });

  it('rejects a guess with wrong length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  it('rejects digits not allowed in the base', () => {
    expect(isValidGuess('12', 2, 2)).toBe(false);
    expect(isValidGuess('1238', 4, 8)).toBe(false);
    expect(isValidGuess('12a4', 4, 10)).toBe(false);
  });

  it('rejects non-digit characters', () => {
    expect(isValidGuess('12-4', 4, 10)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('1231', 4, 10)).toBe(false);
  });

  it('treats hex digits in different case as repeated', () => {
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
  });
});
