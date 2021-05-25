import { abbreviate } from '../src';

describe('Abbreviator tests', () => {
  test('Throws error on missing argument -> abbreviation', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abbreviate(undefined as any, 'explanation', 'content');
    }).toThrow('Missing argument: expects three strings as function arguments');
  });

  test('Throws error on missing argument -> explanation', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abbreviate('abbreviation', undefined as any, 'content');
    }).toThrow('Missing argument: expects three strings as function arguments');
  });

  test('Throws error on missing argument -> content', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abbreviate('abbreviation', 'explanation', undefined as any);
    }).toThrow('Missing argument: expects three strings as function arguments');
  });

  test('Throws error on missing argument -> all', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abbreviate(undefined as any, undefined as any, undefined as any);
    }).toThrow('Missing argument: expects three strings as function arguments');
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

  test('Does not abbreviate content inside html tags.', () => {
    const original = 'pres. l. spyr, spyrjum, <abbr title="plural">pl.</abbr> spurði';
    const expected = 'pres. <abbr title="line">l.</abbr> spyr, spyrjum, <abbr title="plural">pl.</abbr> spurði';
    const result = abbreviate('l.', 'line', original);
    expect(result).toEqual(expected);
  });

  test('Does not abbreviate content inside html attributes.', () => {
    const original = 'pres. n. <abbr title="modern.">mod.</abbr>';
    const expected = 'pres. <abbr title="neuter">n.</abbr> <abbr title="modern.">mod.</abbr>';
    const result = abbreviate('n.', 'neuter', original);
    expect(result).toEqual(expected);
  });
});
