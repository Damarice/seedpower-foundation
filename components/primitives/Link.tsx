/**
 * Internal navigation link wrapper.
 * Use for all in-app navigation. Renders Next.js <Link>.
 * Visual Design Direction v2.0 — Section 2.6 (Navigation Links).
 */
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    NextLinkProps {}

export function Link({ children, ...props }: LinkProps) {
  return <NextLink {...props}>{children}</NextLink>;
}
