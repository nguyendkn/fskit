import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { defaultLocale } from '../../middleware';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FSKit',
  description: 'Full Stack Starter Kit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // In Next.js 15, we can't use cookies() in a Client Component
  // Will use client-side JS for language switching instead

  return (
    <html lang={defaultLocale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
