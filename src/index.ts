export const abbreviate = (abbreviation: string, explanation: string, content: string): string => {
  if (abbreviation === undefined || explanation === undefined || content === undefined) throw new Error('Missing argument: expects two strings as function arguments');

  if (!abbreviation) {
    return content;
  }

  return content.split(abbreviation).join(`<abbr title="${explanation}">${abbreviation}</abbr>`);
};

export default {
  abbreviate,
};
