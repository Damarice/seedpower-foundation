import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  /**
   * Security headers — applied to every route.
   * Architecture v1.2 — Section 8.6.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  /**
   * 301 redirects from old WordPress URLs.
   * Architecture v1.2 — Section 5.2.
   * Only confirmed redirects from the verified route map are included.
   */
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/about-us/:path*',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/elementor-2202',
        destination: '/what-we-do/womens-empowerment',
        permanent: true,
      },
      {
        source: '/ways-to-donate',
        destination: '/give',
        permanent: true,
      },
      {
        source: '/ways-to-donate/donate',
        destination: '/give/donate',
        permanent: true,
      },
      {
        source: '/ways-to-donate/online-fundraising',
        destination: '/give',
        permanent: true,
      },
      {
        source: '/fundraise',
        destination: '/give/events',
        permanent: true,
      },
      {
        source: '/what-we-do/teacher-outreach-training',
        destination: '/what-we-do/teacher-training',
        permanent: true,
      },
      {
        source: '/volunteer',
        destination: '/get-involved/volunteer',
        permanent: true,
      },
      {
        source: '/sponsor-a-child',
        destination: '/get-involved/sponsor-a-child',
        permanent: true,
      },
      {
        source: '/visit-your-child',
        destination: '/get-involved',
        permanent: true,
      },
      {
        source: '/contact/news',
        destination: '/impact',
        permanent: true,
      },
      {
        source: '/contact/news/success-stories',
        destination: '/impact/success-stories',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
