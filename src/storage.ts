import type { RecordEntry } from './records.js';

const STORAGE_KEY = 'bulls-and-cows:records';

export const loadRecords = (): RecordEntry[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as RecordEntry[]) : [];
  } catch {
    return [];
  }
};

export const saveRecords = (records: readonly RecordEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    console.log('Storage is unavailable');
  }
};
