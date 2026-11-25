import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/evaluate.js';

describe('evaluateGuess', () => {
  it('counts all bulls when the guess equals the secret', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zero when no digits match', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts all cows when digits match but positions differ', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1325')).toEqual({ bulls: 1, cows: 2 });
  });

  it('handles a leading zero', () => {
    expect(evaluateGuess('0123', '0321')).toEqual({ bulls: 2, cows: 2 });
  });

  it('works with the shortest binary secret', () => {
    expect(evaluateGuess('01', '01')).toEqual({ bulls: 2, cows: 0 });
    expect(evaluateGuess('01', '10')).toEqual({ bulls: 0, cows: 2 });
  });

  it('compares hex digits case-insensitively', () => {
    expect(evaluateGuess('1a2b', '1A2B')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('1a2b', 'B2A1')).toEqual({ bulls: 0, cows: 4 });
  });
});
