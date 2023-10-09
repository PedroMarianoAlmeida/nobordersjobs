import kebabCase from "lodash.kebabcase";

export const urlFormatter = (text: string): string => {
  return kebabCase(text);
};
