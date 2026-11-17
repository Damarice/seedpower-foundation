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
  metadataBase: new URL('https://seedpowerfoundation.org'),
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
