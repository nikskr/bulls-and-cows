export const evaluateGuess = (secret, guess) => {
    const secretDigits = [...secret.toLowerCase()];
    const guessDigits = [...guess.toLowerCase()];
    const secretSet = new Set(secretDigits);
    const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;
    const matches = guessDigits.filter((digit) => secretSet.has(digit)).length;
    return { bulls, cows: matches - bulls };
};
//# sourceMappingURL=evaluate.js.map