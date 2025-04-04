import type { IConfig } from 'next-sitemap';

export const sitemapConfig: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add any additional sitemaps here
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  outDir: './public',
};
