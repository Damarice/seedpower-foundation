import { Manrope, Inter } from 'next/font/google';

/**
 * Manrope — heading typeface
 * Used for H1–H4 across all pages (Visual Design Direction v2.0, Section 1.2)
 */
export const manrope = Manrope({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

/**
 * Inter — body and UI typeface
 * Used for body text, navigation, buttons, labels, captions (Visual Design Direction v2.0, Section 1.2)
 */
export const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
