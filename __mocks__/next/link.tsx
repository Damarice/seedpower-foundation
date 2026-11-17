import React from 'react';
import type { LinkProps } from 'next/link';

// Lightweight Next.js Link mock for testing.
// Renders a plain <a> and forwards all props including href.
const MockLink = ({
  href,
  children,
  ...props
}: LinkProps & { children?: React.ReactNode }) => (
  <a href={typeof href === 'string' ? href : String(href)} {...props}>
    {children}
  </a>
);
MockLink.displayName = 'NextLink';
export default MockLink;
