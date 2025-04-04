import 'server-only';

// Define the dictionary type
export type Dictionary = {
  [key: string]: string | Dictionary;
};

// Load dictionary based on locale
const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../../dictionaries/fr.json').then((module) => module.default),
  es: () => import('../../dictionaries/es.json').then((module) => module.default),
  de: () => import('../../dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Check if the locale is supported
  if (!dictionaries[locale]) {
    // Fallback to English if locale is not supported
    return dictionaries.en();
  }

  return dictionaries[locale]();
};
