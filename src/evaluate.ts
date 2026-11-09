export type GuessResult = {
  readonly bulls: number;
  readonly cows: number;
};

export const evaluateGuess = (_secret: string, _guess: string): GuessResult => {
  throw new Error('Not implemented');
};
