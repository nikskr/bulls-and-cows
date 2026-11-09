export type GuessResult = {
  readonly bulls: number;
  readonly cows: number;
};

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const secretDigits = [...secret.toLowerCase()];
  const guessDigits = [...guess.toLowerCase()];
  const secretSet = new Set(secretDigits);

  const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;
  const matches = guessDigits.filter((digit) => secretSet.has(digit)).length;

  return { bulls, cows: matches - bulls };
};
