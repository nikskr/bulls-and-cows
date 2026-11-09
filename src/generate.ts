import type { Base } from './digits.js';

export const generateSecret = (_length: number, _base: Base, _random: () => number = Math.random): string => {
  throw new Error('Not implemented');
};
