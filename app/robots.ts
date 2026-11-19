/**
 * Robots — /robots.txt
 * App Router metadata route. Next.js generates /robots.txt from this file.
 *
 * Architecture v1.2 — Section 11.5.
 * Policy:
 *   - Allow all crawlers to index public pages.
 *   - Disallow /api/ (form submission endpoints; no crawlable content).
 * Sitemap reference: https://seedpowerfoundation.org/sitemap.xml
 */
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://seedpowerfoundation.org/sitemap.xml',
  };
}
