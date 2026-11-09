import { getDigits } from './digits.js';
const pickDigits = (available, count, random) => {
    if (count === 0)
        return '';
    const index = Math.floor(random() * available.length);
    const rest = available.filter((_, i) => i !== index);
    return available[index] + pickDigits(rest, count - 1, random);
};
export const generateSecret = (length, base, random = Math.random) => pickDigits(getDigits(base), length, random);
//# sourceMappingURL=generate.js.map