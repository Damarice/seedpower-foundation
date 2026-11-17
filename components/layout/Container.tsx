/**
 * Container — responsive max-width wrapper.
 * Three variants: default (1200px), wide (1400px), narrow (720px).
 * Horizontal padding follows container padding tokens.
 *
 * Architecture v1.2 — Section 2 (project structure).
 * Visual Design Direction v2.0 — Section 1.4.
 */
import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'wide' | 'narrow';
  as?: ElementType;
}

const variantStyles = {
  default: 'max-w-[var(--container-max)]',
  wide: 'max-w-[var(--container-wide)]',
  narrow: 'max-w-[var(--container-narrow)]',
} satisfies Record<string, string>;

const baseStyles = [
  'mx-auto w-full',
  /* Horizontal padding: 16px mobile, 24px tablet+ */
  'px-[var(--container-padding-mobile)]',
  'tablet:px-[var(--container-padding-tablet)]',
].join(' ');

export function Container({
  variant = 'default',
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
