import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

// Export the sitemap config separately to be used by next-sitemap
export { sitemapConfig } from './next-sitemap.config';

// Configure the bundle analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mdx', '.md'],
    },
  },
};

export default bundleAnalyzer(nextConfig);
