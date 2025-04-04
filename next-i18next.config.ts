import type { UserConfig } from 'next-i18next';

export const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de'],
  },
  // Set to false to avoid reloading the page on locale changes
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
