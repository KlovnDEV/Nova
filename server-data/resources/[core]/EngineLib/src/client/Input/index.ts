export * from './Control';
export * from './DisabledControl';
export * from './types';

export const InstructionalButtonText: Record<number, string> = {
  100: 'LEFT CLICK',
  101: 'RIGHT CLICK',
  102: 'MIDDLE MOUSE',
  103: 'MOUSE 4',
  104: 'MOUSE 5',
  108: 'MOUSE LEFT',
  109: 'MOUSE RIGHT',
  110: 'MOUSE UP',
  111: 'MOUSE DOWN',
  112: 'MOUSE R/L',
  113: 'MOUSE U/D',
  115: 'MOUSE WHEEL UP',
  116: 'MOUSE WHEEL DOWN',
  117: 'MOUSE WHEEL UP/DOWN',
  130: 'NUM -',
  131: 'NUM +',
  132: 'NUM .',
  134: 'NUM *',
  135: 'NUM ENTER',
  136: 'NUM 0',
  137: 'NUM 1',
  138: 'NUM 2',
  139: 'NUM 3',
  140: 'NUM 4',
  141: 'NUM 5',
  142: 'NUM 6',
  143: 'NUM 7',
  144: 'NUM 8',
  145: 'NUM 9',
  170: 'F1',
  171: 'F2',
  172: 'F3',
  173: 'F4',
  174: 'F5',
  175: 'F6',
  176: 'F7',
  177: 'F8',
  178: 'F9',
  179: 'F10',
  180: 'F11',
  181: 'F12',
  194: 'UP ARROW',
  195: 'DOWN ARROW',
  196: 'LEFT ARROW',
  197: 'RIGHT ARROW',
  198: 'DEL',
  199: 'ESC',
  200: 'INSERT',
  201: 'END',
  995: '???',
  1000: 'LEFT SHIFT',
  1001: 'RIGHT SHIFT',
  1002: 'TAB',
  1003: 'ENTER',
  1004: 'BACKSPACE',
  1006: 'SCROLL LOCK',
  1007: 'PAUSE',
  1008: 'HOME',
  1009: 'PG UP',
  1010: 'PG DN',
  1011: 'NUM LOCK',
  1012: 'CAPS',
  1013: 'LEFT CTRL',
  1014: 'RIGHT CTRL',
  1015: 'LEFT ALT',
  2000: 'SPACE',
};

export function getInstructionalButtonText(keymap: string) {
  const val = GetControlInstructionalButton(2, GetHashKey('+inventory') | 0x80000000, true);

  return val
    .split('%')
    .map(part => {
      if (part.startsWith('t_')) return part.substr(2);
      if (part.startsWith('b_')) return InstructionalButtonText[part.substr(2)] || part;
      return part;
    })
    .filter(v => v)
    .join(' / ');
}
