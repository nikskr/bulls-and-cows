import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../src/digits';

describe('createDigitValidator', () => {
  it('validates binary digits', () => {
    const isDigit = createDigitValidator(2);

    expect(isDigit('0')).toBe(true);
    expect(isDigit('1')).toBe(true);
    expect(isDigit('2')).toBe(false);
  });

  it('validates octal digits', () => {
    const isDigit = createDigitValidator(8);

    expect(isDigit('7')).toBe(true);
    expect(isDigit('8')).toBe(false);
  });

  it('validates decimal digits', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('9')).toBe(true);
    expect(isDigit('a')).toBe(false);
  });

  it('validates hex digits case-insensitively', () => {
    const isDigit = createDigitValidator(16);

    expect(isDigit('f')).toBe(true);
    expect(isDigit('F')).toBe(true);
    expect(isDigit('g')).toBe(false);
  });

  it('rejects non-digit characters', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('-')).toBe(false);
    expect(isDigit(' ')).toBe(false);
  });

  it('rejects empty and multi-character strings', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('')).toBe(false);
    expect(isDigit('12')).toBe(false);
  });
});
