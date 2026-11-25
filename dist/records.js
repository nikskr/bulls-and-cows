export const MAX_RECORDS = 10;
export const createRecord = (state) => state.status === 'won' && state.finishedAt !== null
    ? {
        attempts: state.history.length,
        timeMs: state.finishedAt - state.startedAt,
        settings: state.settings,
    }
    : null;
const compareRecords = (a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs;
export const addRecord = (records, record) => [...records, record].sort(compareRecords).slice(0, MAX_RECORDS);
//# sourceMappingURL=records.js.map