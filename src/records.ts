import type { GameState, Settings } from './state.js';

export type RecordEntry = {
  readonly attempts: number;
  readonly timeMs: number;
  readonly settings: Settings;
};

export const MAX_RECORDS = 10;

export const createRecord = (state: GameState): RecordEntry | null =>
  state.status === 'won' && state.finishedAt !== null
    ? {
        attempts: state.history.length,
        timeMs: state.finishedAt - state.startedAt,
        settings: state.settings,
      }
    : null;

const compareRecords = (a: RecordEntry, b: RecordEntry): number => a.attempts - b.attempts || a.timeMs - b.timeMs;

export const addRecord = (records: readonly RecordEntry[], record: RecordEntry): RecordEntry[] =>
  [...records, record].sort(compareRecords).slice(0, MAX_RECORDS);
