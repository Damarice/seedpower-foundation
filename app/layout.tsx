import type { Metadata } from 'next';
import { manrope, inter } from '@/lib/fonts';
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
      <body>{children}</body>
    </html>
  );
}
