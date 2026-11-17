/**
 * ButtonLink — navigational element styled as a button.
 * Renders Next.js <Link> for internal paths or <a> for external URLs.
 *
 * Use ButtonLink for navigation (href).
 * Use Button for actions (onClick, type="submit").
 *
 * Visual Design Direction v2.0 — Section 2.5.
 * Architecture v1.2 — Section 4.2.
 */
import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/cn';

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
  /** Force external treatment (new tab + rel) even for relative-looking hrefs. */
  external?: boolean;
  // children and className are inherited from AnchorHTMLAttributes
}

const variantStyles = {
  primary: [
    'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
    'hover:bg-[var(--color-brand-hover)]',
    'active:bg-[var(--color-brand-active)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]',
    'hover:bg-[var(--color-bg-dark-hover)]',
    'active:bg-[var(--color-bg-dark-active)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--color-brand)]',
    'border-2 border-[var(--color-brand)]',
    'hover:bg-[var(--color-brand-surface)]',
    'active:bg-[var(--color-brand-active-surface)]',
  ].join(' '),
} satisfies Record<string, string>;

const sizeStyles = {
  default: 'px-6 py-3 text-base font-semibold',
  sm: 'px-4 py-2 text-sm font-semibold',
} satisfies Record<string, string>;

const ghostSizeStyles = {
  default: 'px-[22px] py-[10px] text-base font-semibold',
  sm: 'px-[14px] py-[6px] text-sm font-semibold',
} satisfies Record<string, string>;

const baseStyles = [
  'inline-flex items-center justify-center',
  'rounded-[var(--radius-sm)]',
  'no-underline',
  'transition-colors duration-[var(--transition-std)]',
  'min-h-[var(--touch-target-min)]',
  /* Focus ring */
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-[color:var(--focus-ring-color)]',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

function isExternal(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'default',
  children,
  className,
  external,
  ...rest
}: ButtonLinkProps) {
  const resolvedSize =
    variant === 'ghost' ? ghostSizeStyles[size] : sizeStyles[size];
  const classes = cn(baseStyles, variantStyles[variant], resolvedSize, className);
  const shouldOpenExternal = external ?? isExternal(href);

  if (shouldOpenExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}
