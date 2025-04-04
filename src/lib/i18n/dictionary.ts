import 'server-only';
import { defaultLocale } from '../../../middleware';

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

export const getDictionary = async (localeParam?: string): Promise<Dictionary> => {
  // Use the locale passed or default to English
  const locale = localeParam || defaultLocale;

  // Check if the locale is supported
  if (!dictionaries[locale]) {
    // Fallback to English if locale is not supported
    return dictionaries.en();
  }

  return dictionaries[locale]();
};
