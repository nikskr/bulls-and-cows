import { getDigits, type Base } from './digits.js';

const pickDigits = (available: string[], count: number, random: () => number): string => {
  if (count === 0) return '';

  const index = Math.floor(random() * available.length);
  const rest = available.filter((_, i) => i !== index);

  return available[index] + pickDigits(rest, count - 1, random);
};

export const generateSecret = (length: number, base: Base, random: () => number = Math.random): string =>
  pickDigits(getDigits(base), length, random);
