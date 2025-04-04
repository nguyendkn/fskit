import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { i18nConfig } from './next-i18next.config';

// Export the sitemap config separately to be used by next-sitemap
export { sitemapConfig } from './next-sitemap.config';

// Configure the bundle analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  // Any other Next.js config options
};

export default bundleAnalyzer(nextConfig);
