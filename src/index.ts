const createRegexFor = (abbreviation) => {
  const escapedAbbreviation = abbreviation.replace('.', '\\.');
  return new RegExp(`(${escapedAbbreviation})(?![^<>]*<\/)`, 'gi'); // eslint-disable-line
};

export const abbreviate = (abbreviation: string, explanation: string, content: string): string => {
  if (abbreviation === undefined || explanation === undefined || content === undefined) throw new Error('Missing argument: expects three strings as function arguments');

  if (!abbreviation) {
    return content;
  }

  const regex = createRegexFor(abbreviation);
  return content.replace(regex, `<abbr title="${explanation}">${abbreviation}</abbr>`);
};

export default {
  abbreviate,
};
