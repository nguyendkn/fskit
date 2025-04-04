import { getDictionary, Dictionary } from '@/lib/i18n/dictionary';
import { Metadata } from 'next';
import Link from 'next/link';

// Define the params type
interface PageProps {
  params: {
    lang: string;
  };
}

// Helper function to safely access nested dictionary properties
function getDictValue(dict: Dictionary, path: string): string {
  const keys = path.split('.');
  let current: Dictionary | string = dict;

  for (const key of keys) {
    if (typeof current === 'string' || current[key] === undefined) {
      return key; // Fallback to the key name if not found
    }
    current = current[key];
  }

  return typeof current === 'string' ? current : JSON.stringify(current);
}

// Generate metadata with proper translations
export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(lang);

  return {
    title: getDictValue(dict, 'app_name'),
    description: getDictValue(dict, 'description'),
  };
}

export default async function Home({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
          {getDictValue(dict, 'welcome')}
        </p>
      </div>

      <div className='mb-32 mt-16 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
          <h2 className='mb-3 text-2xl font-semibold'>{getDictValue(dict, 'nav.home')}</h2>
          <p className='m-0 max-w-[30ch] text-sm opacity-50'>{getDictValue(dict, 'description')}</p>
        </div>
      </div>

      <div className='mt-8 flex gap-4'>
        {/* Language switcher */}
        <Link href='/en' className={lang === 'en' ? 'font-bold' : ''}>
          English
        </Link>
        <Link href='/fr' className={lang === 'fr' ? 'font-bold' : ''}>
          Français
        </Link>
        <Link href='/es' className={lang === 'es' ? 'font-bold' : ''}>
          Español
        </Link>
        <Link href='/de' className={lang === 'de' ? 'font-bold' : ''}>
          Deutsch
        </Link>
      </div>
    </main>
  );
}
