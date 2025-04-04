// This file is no longer needed as we're using a cookie-based language selection
// The app can be reorganized to remove the [lang] directory structure later

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { locales } from '../../../middleware';

const inter = Inter({ subsets: ['latin'] });

// Define the params type for the layout
export interface LayoutProps {
  children: ReactNode;
  params: {
    lang: string;
  };
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function RootLayout({ children, params: { lang } }: LayoutProps) {
  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
