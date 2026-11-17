/**
 * Typography primitives.
 * Uses CSS custom properties from tokens.css — no hardcoded values.
 * Font families: Manrope (headings H1–H4), Inter (body / UI).
 *
 * Visual Design Direction v2.0 — Section 1.2.
 * Architecture v1.2 — Section 4.1.
 */
import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/* ── Heading ──────────────────────────────────────────────────────── */

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingVariant = 'hero' | 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML element to render. Defaults to match the variant. */
  as?: ElementType;
  /** Visual style variant. */
  variant?: HeadingVariant;
}

/**
 * Heading styles use CSS custom properties for font-size, line-height,
 * and letter-spacing. All responsive overrides live in tokens.css.
 */
const headingVariantStyles: Record<HeadingVariant, string> = {
  hero: [
    'font-[var(--font-heading)]',
    'text-[length:var(--text-hero)]',
    'leading-[var(--text-hero--lh)]',
    'tracking-[var(--text-hero--ls)]',
    'font-bold',
  ].join(' '),

  h1: [
    'font-[var(--font-heading)]',
    'text-[length:var(--text-h1)]',
    'leading-[var(--text-h1--lh)]',
    'tracking-[var(--text-h1--ls)]',
    'font-bold',
  ].join(' '),

  h2: [
    'font-[var(--font-heading)]',
    'text-[length:var(--text-h2)]',
    'leading-[var(--text-h2--lh)]',
    'font-bold',
  ].join(' '),

  h3: [
    'font-[var(--font-heading)]',
    'text-[length:var(--text-h3)]',
    'leading-[var(--text-h3--lh)]',
    'font-semibold',
  ].join(' '),

  h4: [
    'font-[var(--font-heading)]',
    'text-[length:var(--text-h4)]',
    'leading-[var(--text-h4--lh)]',
    'font-semibold',
  ].join(' '),
};

const defaultHeadingTag: Record<HeadingVariant, ElementType> = {
  hero: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};

export function Heading({
  as,
  variant = 'h2',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? defaultHeadingTag[variant];
  return (
    <Tag
      className={cn(headingVariantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── Body text ────────────────────────────────────────────────────── */

export type BodyVariant = 'body-lg' | 'body' | 'body-sm' | 'caption' | 'label' | 'label-sm' | 'nav';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: BodyVariant;
}

const textVariantStyles: Record<BodyVariant, string> = {
  'body-lg': [
    'font-[var(--font-body)]',
    'text-[length:var(--text-body-lg)]',
    'leading-[var(--text-body-lg--lh)]',
    'font-normal',
  ].join(' '),

  body: [
    'font-[var(--font-body)]',
    'text-[length:var(--text-body)]',
    'leading-[var(--text-body--lh)]',
    'font-normal',
  ].join(' '),

  'body-sm': [
    'font-[var(--font-body)]',
    'text-[length:var(--text-body-sm)]',
    'leading-[var(--text-body-sm--lh)]',
    'font-normal',
  ].join(' '),

  caption: [
    'font-[var(--font-body)]',
    'text-[length:var(--text-caption)]',
    'leading-[var(--text-caption--lh)]',
    'tracking-[var(--text-caption--ls)]',
    'font-normal',
    'text-[var(--color-text-secondary)]',
  ].join(' '),

  label: [
    'font-[var(--font-body)]',
    'text-[length:var(--text-label)]',
    'leading-[var(--text-label--lh)]',
    'font-semibold',
  ].join(' '),

  'label-sm': [
    'font-[var(--font-body)]',
    'text-[length:var(--text-label-sm)]',
    'leading-[var(--text-label-sm--lh)]',
    'font-semibold',
  ].join(' '),

  nav: [
    'font-[var(--font-body)]',
    'text-[length:var(--text-nav)]',
    'leading-[var(--text-nav--lh)]',
    'font-medium',
  ].join(' '),
};

const defaultTextTag: Record<BodyVariant, ElementType> = {
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
  'label-sm': 'span',
  nav: 'span',
};

export function Text({
  as,
  variant = 'body',
  className,
  children,
  ...props
}: TextProps) {
  const Tag = as ?? defaultTextTag[variant];
  return (
    <Tag
      className={cn(textVariantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
