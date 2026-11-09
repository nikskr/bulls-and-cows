import { createDigitValidator } from './digits.js';
import { countPossibleSecrets } from './count.js';
import { startGame, makeGuess } from './state.js';
import { createRecord, addRecord } from './records.js';
import { loadRecords, saveRecords } from './storage.js';
import { el } from './ui/dom.js';
const BASES = [
    { label: 'bin', value: 2 },
    { label: 'oct', value: 8 },
    { label: 'dec', value: 10 },
    { label: 'hex', value: 16 },
];
const LENGTHS = [2, 3, 4, 5, 6];
const baseLabel = (base) => BASES.find((item) => item.value === base)?.label ?? '';
const formatTime = (ms) => `${Math.round(ms / 1000)}s`;
let settings = { length: 4, base: 10 };
let game = null;
let message = '';
const app = el('main');
document.body.append(app);
const renderRecords = () => {
    const records = loadRecords();
    return el('section', {}, [
        el('h2', { textContent: 'Records' }),
        records.length === 0
            ? el('p', { textContent: 'No records yet' })
            : el('ol', {}, records.map((record) => el('li', {
                textContent: `${record.attempts} attempts · ${formatTime(record.timeMs)} · length ${record.settings.length}, ${baseLabel(record.settings.base)}`,
            }))),
    ]);
};
const renderSettings = () => {
    const baseSelect = el('select', {}, BASES.map(({ label, value }) => el('option', { value: String(value), textContent: label, selected: value === settings.base })));
    baseSelect.addEventListener('change', () => {
        const base = Number(baseSelect.value);
        settings = { base, length: Math.min(settings.length, base) };
        render();
    });
    const lengthSelect = el('select', {}, LENGTHS.map((length) => el('option', {
        value: String(length),
        textContent: String(length),
        selected: length === settings.length,
        disabled: length > settings.base,
    })));
    lengthSelect.addEventListener('change', () => {
        settings = { ...settings, length: Number(lengthSelect.value) };
        render();
    });
    const startButton = el('button', { type: 'button', textContent: 'Start' });
    startButton.addEventListener('click', () => {
        game = startGame(settings, Date.now());
        message = '';
        render();
    });
    return [
        el('h1', { textContent: 'Bulls and Cows' }),
        el('label', {}, ['Base: ', baseSelect]),
        el('label', {}, [' Length: ', lengthSelect]),
        el('p', {
            textContent: `Possible secrets: ${countPossibleSecrets(settings.length, settings.base)}`,
        }),
        startButton,
        renderRecords(),
    ];
};
const renderGame = (state) => {
    const { length, base } = state.settings;
    const isDigit = createDigitValidator(base);
    const input = el('input', { type: 'text', maxLength: length, autocomplete: 'off' });
    input.addEventListener('input', () => {
        input.value = [...input.value].filter(isDigit).join('');
    });
    const form = el('form', {}, [input, el('button', { type: 'submit', textContent: 'Guess' })]);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const next = makeGuess(state, input.value, Date.now());
        if (next === state) {
            message = `Enter ${length} unique digits you haven't tried yet`;
        }
        else {
            message = '';
            game = next;
            const record = createRecord(next);
            if (record)
                saveRecords(addRecord(loadRecords(), record));
        }
        render();
    });
    const newGameButton = el('button', { type: 'button', textContent: 'New game' });
    newGameButton.addEventListener('click', () => {
        game = null;
        message = '';
        render();
    });
    const isWon = state.status === 'won';
    const result = isWon && state.finishedAt !== null
        ? el('p', {
            textContent: `You won in ${state.history.length} attempts, ${formatTime(state.finishedAt - state.startedAt)}`,
        })
        : form;
    return [
        el('h1', { textContent: 'Bulls and Cows' }),
        el('p', { textContent: `Length ${length}, ${baseLabel(base)}` }),
        result,
        el('p', { textContent: message }),
        el('ol', {}, state.history.map((entry) => el('li', { textContent: `${entry.guess} — bulls: ${entry.bulls}, cows: ${entry.cows}` }))),
        newGameButton,
        ...(isWon ? [renderRecords()] : []),
    ];
};
function render() {
    app.replaceChildren(...(game ? renderGame(game) : renderSettings()));
    app.querySelector('input')?.focus();
}
render();
//# sourceMappingURL=main.js.map