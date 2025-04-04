'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { GlobeIcon } from 'lucide-react';
import { locales } from '../../../middleware';

export function LanguageSelector() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Check if we have a locale in the cookie
    const storedLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];

    if (storedLocale) {
      setCurrentLocale(storedLocale);
    }
  }, []);

  const handleLanguageChange = (locale: string) => {
    // Update the cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days

    // Update state
    setCurrentLocale(locale);

    // Refresh the page to apply the new language
    router.refresh();
  };

  const getLanguageName = (locale: string) => {
    const names: Record<string, string> = {
      en: 'English',
      fr: 'Français',
      es: 'Español',
      de: 'Deutsch',
    };
    return names[locale] || locale;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <GlobeIcon className='h-4 w-4' />
          <span className='sr-only'>Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={locale === currentLocale ? 'bg-muted' : ''}
          >
            {getLanguageName(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
