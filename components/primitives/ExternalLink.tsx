/**
 * External link primitive.
 * Always opens in a new tab with noopener noreferrer.
 * Includes a visually-hidden screen-reader hint for accessibility.
 * Visual Design Direction v2.0 — Section 2.6 (External Links).
 */
import type { AnchorHTMLAttributes } from 'react';

export interface ExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link destination. Required for external links. */
  href: string;
}

export function ExternalLink({
  children,
  href,
  rel,
  target,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'noopener noreferrer'}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
