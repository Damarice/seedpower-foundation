import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ButtonLink } from '@/components/ui/ButtonLink';

expect.extend(toHaveNoViolations);

describe('ButtonLink', () => {
  it('renders a Next.js <Link> (renders as <a>) for internal hrefs', () => {
    render(<ButtonLink href="/give/donate">Donate</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Donate' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/give/donate');
  });

  it('renders an <a> for http:// external hrefs', () => {
    render(
      <ButtonLink href="https://example.com" external>
        External
      </ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('adds target="_blank" and rel="noopener noreferrer" for external links', () => {
    render(
      <ButtonLink href="https://example.com" external>
        External
      </ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('auto-detects external https:// links without explicit external prop', () => {
    render(
      <ButtonLink href="https://external.org">Auto External</ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('auto-detects mailto: links as external', () => {
    render(
      <ButtonLink href="mailto:info@example.org">Email Us</ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:info@example.org');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('includes sr-only new tab hint for external links', () => {
    render(
      <ButtonLink href="https://example.com" external>
        External
      </ButtonLink>
    );
    expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
  });

  it('does NOT add target="_blank" for internal links', () => {
    render(<ButtonLink href="/who-we-are">Who We Are</ButtonLink>);
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target', '_blank');
  });

  it('applies primary variant styles by default', () => {
    render(<ButtonLink href="/donate">Donate</ButtonLink>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('bg-[var(--color-brand)]');
  });

  it('applies ghost variant styles', () => {
    render(
      <ButtonLink href="/what-we-do" variant="ghost">
        Our Work
      </ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain('border-2');
  });

  it('applies sm size', () => {
    render(
      <ButtonLink href="/contact" size="sm">
        Contact
      </ButtonLink>
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain('text-sm');
  });

  it('passes axe accessibility check for internal link', async () => {
    const { container } = render(
      <ButtonLink href="/give/donate">Donate Now</ButtonLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe accessibility check for external link', async () => {
    const { container } = render(
      <ButtonLink href="https://example.com" external>
        Donate via Partner
      </ButtonLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('forwards aria-current to the rendered element', () => {
    render(
      <ButtonLink href="/about" aria-current="page">
        About
      </ButtonLink>
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('forwards data-testid to the rendered element', () => {
    render(
      <ButtonLink href="/contact" data-testid="contact-link">
        Contact
      </ButtonLink>
    );
    expect(screen.getByTestId('contact-link')).toBeInTheDocument();
  });
});
