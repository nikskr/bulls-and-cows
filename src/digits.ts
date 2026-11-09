export type Base = 2 | 8 | 10 | 16;

const ALL_DIGITS = '0123456789abcdef';

export const getDigits = (base: Base): string[] => [...ALL_DIGITS.slice(0, base)];

export const createDigitValidator = (base: Base) => {
  const allowedDigits = ALL_DIGITS.slice(0, base);

  return (char: string): boolean => char.length === 1 && allowedDigits.includes(char.toLowerCase());
};
