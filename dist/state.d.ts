import type { Base } from './digits.js';
import { type GuessResult } from './evaluate.js';
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
export declare const startGame: (settings: Settings, now: number, random?: () => number) => GameState;
export declare const makeGuess: (state: GameState, guess: string, now: number) => GameState;
//# sourceMappingURL=state.d.ts.map