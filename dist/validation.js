import { createDigitValidator } from './digits.js';
export const isValidGuess = (guess, length, base) => {
    const isDigit = createDigitValidator(base);
    const digits = [...guess.toLowerCase()];
    const hasCorrectLength = digits.length === length;
    const hasOnlyValidDigits = digits.every(isDigit);
    const hasNoRepeats = new Set(digits).size === digits.length;
    return hasCorrectLength && hasOnlyValidDigits && hasNoRepeats;
};
//# sourceMappingURL=validation.js.map