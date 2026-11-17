/**
 * Badge — small pill-shaped label.
 * Variants: brand (green), neutral (soft).
 * Visual Design Direction v2.0 — Section 1.6 (radius-full).
 */
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'neutral';
}

const variantStyles = {
  brand: 'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
  neutral: 'bg-[var(--color-bg-soft)] text-[var(--color-text-secondary)]',
} satisfies Record<string, string>;

const baseStyles = [
  'inline-flex items-center',
  'rounded-[var(--radius-full)]',
  'px-2 py-0.5',
  'text-xs font-semibold',
  'leading-none',
].join(' ');

export function Badge({
  variant = 'neutral',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
