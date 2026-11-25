const ALL_DIGITS = '0123456789abcdef';
export const getDigits = (base) => [...ALL_DIGITS.slice(0, base)];
export const createDigitValidator = (base) => {
    const allowedDigits = ALL_DIGITS.slice(0, base);
    return (char) => char.length === 1 && allowedDigits.includes(char.toLowerCase());
};
//# sourceMappingURL=digits.js.map