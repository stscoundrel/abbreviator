import { abbreviate } from '../src';

describe('Abbreviator tests', () => {
  test('Throws error on missing argument', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abbreviate(undefined as any, undefined as any, undefined as any);
    }).toThrow('Missing argument: expects two strings as function arguments');
  });

  test('Handles empty abbr correctly', () => {
    const original = 'f. the night, and náttar-, see nótt.';
    const result = abbreviate('', 'feminine', original);
    expect(result).toEqual(original);
  });

  test('Returns a string', () => {
    const original = 'f. the night, and náttar-, see nótt.';
    const result = abbreviate('f.', 'feminine', original);
    expect(typeof result === 'string').toBeTruthy();
  });

  test('Does not edit string if no matches', () => {
    const original = 'And if the day would only come, then you might just appear, even though you\'d soon be gone';
    const result = abbreviate('abbreviation', 'explanation', original);
    expect(result).toEqual(original);
  });

  test('Adds abbr if a match is found', () => {
    const original = 'f. the night, and náttar-, see nótt.';
    const expected = '<abbr title="feminine">f.</abbr> the night, and náttar-, see nótt.';
    const result = abbreviate('f.', 'feminine', original);
    expect(result).toEqual(expected);
  });

  test('Adds markup for all instances of the word', () => {
    const original = 'f. the night, and náttar-, see f. nótt.';
    const expected = '<abbr title="feminine">f.</abbr> the night, and náttar-, see <abbr title="feminine">f.</abbr> nótt.';
    const result = abbreviate('f.', 'feminine', original);
    expect(result).toEqual(expected);
  });
});
