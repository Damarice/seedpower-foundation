import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExternalLink } from '@/components/primitives/ExternalLink';

expect.extend(toHaveNoViolations);

describe('ExternalLink', () => {
  it('renders an <a> element', () => {
    render(<ExternalLink href="https://example.com">Visit</ExternalLink>);
    expect(screen.getByRole('link', { name: /visit/i })).toBeInTheDocument();
  });

  it('has target="_blank"', () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('has rel="noopener noreferrer"', () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>);
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });

  it('renders the correct href', () => {
    render(
      <ExternalLink href="https://example.com">Example</ExternalLink>
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });

  it('contains sr-only "(opens in new tab)" hint', () => {
    render(<ExternalLink href="https://example.com">Org Site</ExternalLink>);
    expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
  });

  it('sr-only hint has the sr-only class', () => {
    render(<ExternalLink href="https://example.com">Org Site</ExternalLink>);
    const hint = screen.getByText('(opens in new tab)');
    expect(hint.className).toContain('sr-only');
  });

  it('renders children text', () => {
    render(<ExternalLink href="https://example.com">My Link</ExternalLink>);
    expect(screen.getByText('My Link')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <ExternalLink href="https://example.com">
        Read the report
      </ExternalLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
