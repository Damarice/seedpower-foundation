import type { Metadata } from 'next';
import { manrope, inter } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | SeedPower Foundation',
    default: 'SeedPower Foundation',
  },
  description:
    'SeedPower Foundation works to exploit potential and eradicate poverty through education, community outreach, and empowerment programmes in Kenya.',
  // Production domain: seedpowerfoundation.org (see .env.example).
  // Set NEXT_PUBLIC_SITE_URL in the deployment environment before building.
  // See docs/architecture/phase-1-implementation-decisions.md — Decision 4.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    siteName: 'SeedPower Foundation',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body>
        {/*
         * Skip navigation link — Architecture v1.2 Section 9.3; VDD v2.0 Section 4.2.
         * Must be the first focusable element on every page.
         * Visually hidden by default; snaps into view on keyboard focus.
         * Targets #main-content so keyboard users can bypass the header and nav.
         */}
        <a
          href="#main-content"
          className={[
            /* Visually hidden by default */
            'absolute left-[-9999px] top-auto',
            'w-px h-px overflow-hidden',
            /* Snap into view on focus */
            'focus-visible:left-4 focus-visible:top-4',
            'focus-visible:w-auto focus-visible:h-auto focus-visible:overflow-visible',
            /* Visual treatment */
            'z-50',
            'inline-block',
            'px-4 py-2',
            'bg-[var(--color-bg-page)]',
            'text-[var(--color-brand)]',
            'font-[var(--font-body)] text-sm font-semibold',
            'rounded-[var(--radius-sm)]',
            'no-underline',
            /* Focus ring — same tokens as the rest of the site */
            'focus-visible:outline',
            'focus-visible:outline-[length:var(--focus-ring-width)]',
            'focus-visible:outline-[color:var(--focus-ring-color)]',
            'focus-visible:[outline-style:var(--focus-ring-style)]',
            'focus-visible:outline-offset-[var(--focus-ring-offset)]',
          ].join(' ')}
        >
          Skip to main content
        </a>
        <Header />
        {/*
         * tabIndex={-1} allows the skip link to programmatically move focus
         * into <main> in browsers that do not natively focus non-interactive
         * elements. The id matches the skip link href="#main-content".
         */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
