import type { Base } from './digits.js';
import { evaluateGuess, type GuessResult } from './evaluate.js';
import { generateSecret } from './generate.js';
import { isValidGuess } from './validation.js';

export type Settings = {
  readonly length: number;
  readonly base: Base;
};

export type HistoryEntry = GuessResult & {
  readonly guess: string;
};

export type GameState = {
  readonly settings: Settings;
  readonly secret: string;
  readonly history: readonly HistoryEntry[];
  readonly status: 'playing' | 'won';
  readonly startedAt: number;
  readonly finishedAt: number | null;
};

export const startGame = (settings: Settings, now: number, random: () => number = Math.random): GameState => ({
  settings,
  secret: generateSecret(settings.length, settings.base, random),
  history: [],
  status: 'playing',
  startedAt: now,
  finishedAt: null,
});

export const makeGuess = (state: GameState, guess: string, now: number): GameState => {
  const normalized = guess.toLowerCase();
  const { length, base } = state.settings;

  const isRepeat = state.history.some((entry) => entry.guess === normalized);
  const canGuess = state.status === 'playing' && isValidGuess(normalized, length, base) && !isRepeat;

  if (!canGuess) return state;

  const result = evaluateGuess(state.secret, normalized);
  const isWon = result.bulls === length;

  return {
    ...state,
    history: [...state.history, { guess: normalized, ...result }],
    status: isWon ? 'won' : 'playing',
    finishedAt: isWon ? now : null,
  };
};
