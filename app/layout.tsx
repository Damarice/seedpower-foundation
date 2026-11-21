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
  // Production domain pending client confirmation.
  // Replace with the verified domain before deployment.
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
            'focus:left-4 focus:top-4',
            'focus:w-auto focus:h-auto focus:overflow-visible',
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
            'focus:outline',
            'focus:outline-[length:var(--focus-ring-width)]',
            'focus:outline-[color:var(--focus-ring-color)]',
            'focus:[outline-style:var(--focus-ring-style)]',
            'focus:outline-offset-[var(--focus-ring-offset)]',
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
