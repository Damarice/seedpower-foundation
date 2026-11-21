/**
 * Section — reusable full-width section wrapper.
 * Controls vertical padding and background colour.
 * Text colour switches automatically for brand and dark backgrounds.
 *
 * Visual Design Direction v2.0 — Section 2.9.
 * Spacing: --space-8 mobile (32px), --space-10 tablet (40px), --space-16 desktop (64px).
 */
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type SectionBackground = 'white' | 'soft' | 'warm' | 'brand' | 'dark';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
}

const backgroundStyles: Record<SectionBackground, string> = {
  white: 'bg-[var(--color-bg-page)] text-[var(--color-text-primary)]',
  soft: 'bg-[var(--color-bg-soft)] text-[var(--color-text-primary)]',
  warm: 'bg-[var(--color-bg-warm)] text-[var(--color-text-primary)]',
  brand: 'bg-brand text-[var(--color-text-on-brand)]',
  dark: 'bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]',
};

const baseStyles = [
  /* Vertical padding: 32px mobile, 40px tablet, 64px desktop */
  'py-[var(--space-8)]',
  'tablet:py-[var(--space-10)]',
  'desktop:py-[var(--space-16)]',
].join(' ');

export function Section({
  background = 'white',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(baseStyles, backgroundStyles[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}
