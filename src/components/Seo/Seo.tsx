import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

const siteName = 'FSKit';
const defaultDescription =
  'A modern full-stack starter kit built with Next.js, TypeORM, Hono, and Zod.';
const defaultOgImage = '/og-image.png'; // Default OG image path

export function SEO({
  title,
  description = defaultDescription,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  jsonLd,
}: SEOProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageUrl = canonical || `${siteUrl}${router.asPath}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={pageUrl} />

      {/* Open Graph */}
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:image' content={ogImageUrl} />
      <meta property='og:site_name' content={siteName} />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImageUrl} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
