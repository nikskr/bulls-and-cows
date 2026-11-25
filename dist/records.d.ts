import type { GameState, Settings } from './state.js';
export type RecordEntry = {
    readonly attempts: number;
    readonly timeMs: number;
    readonly settings: Settings;
};
export declare const MAX_RECORDS = 10;
export declare const createRecord: (state: GameState) => RecordEntry | null;
export declare const addRecord: (records: readonly RecordEntry[], record: RecordEntry) => RecordEntry[];
//# sourceMappingURL=records.d.ts.map