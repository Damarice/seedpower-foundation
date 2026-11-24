/**
 * Sitemap — /sitemap.xml
 * App Router metadata route. Next.js generates /sitemap.xml from this file.
 *
 * Architecture v1.2 — Section 11.4.
 * Base URL: https://seedpowerfoundation.org (confirmed production domain).
 *
 * Includes the 17 canonical routes currently implemented.
 * Conditional/deferred routes are excluded per Architecture Section 11.4:
 *   - /what-we-do/turkana   — pending client decision
 *   - /give/events          — pending client decision
 * Redirect-source URLs are not included (they are not canonical pages).
 *
 * No lastModified dates are included; no reliable per-page modification date
 * source is available in this project at this time.
 */
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://seedpowerfoundation.org';
  return [
    { url: base,                                      changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/who-we-are`,                      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/what-we-do`,                      changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/what-we-do/education`,            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/what-we-do/womens-empowerment`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/what-we-do/teacher-training`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/what-we-do/wash`,                 changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/what-we-do/food-project`,         changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/what-we-do/community-outreach`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/impact`,                          changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/impact/success-stories`,          changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/get-involved/volunteer`,          changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/get-involved/sponsor-a-child`,    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/get-involved/visit-your-child`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/give`,                            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/give/donate`,                     changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,                         changeFrequency: 'monthly', priority: 0.7 },
  ];
}
