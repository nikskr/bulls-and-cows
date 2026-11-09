import { evaluateGuess } from './evaluate.js';
import { generateSecret } from './generate.js';
import { isValidGuess } from './validation.js';
export const startGame = (settings, now, random = Math.random) => ({
    settings,
    secret: generateSecret(settings.length, settings.base, random),
    history: [],
    status: 'playing',
    startedAt: now,
    finishedAt: null,
});
export const makeGuess = (state, guess, now) => {
    const normalized = guess.toLowerCase();
    const { length, base } = state.settings;
    const isRepeat = state.history.some((entry) => entry.guess === normalized);
    const canGuess = state.status === 'playing' && isValidGuess(normalized, length, base) && !isRepeat;
    if (!canGuess)
        return state;
    const result = evaluateGuess(state.secret, normalized);
    const isWon = result.bulls === length;
    return {
        ...state,
        history: [...state.history, { guess: normalized, ...result }],
        status: isWon ? 'won' : 'playing',
        finishedAt: isWon ? now : null,
    };
};
//# sourceMappingURL=state.js.map