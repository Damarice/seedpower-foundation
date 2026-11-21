import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Section } from '@/components/layout/Section';

expect.extend(toHaveNoViolations);

describe('Section', () => {
  it('renders without error and returns a <section> element', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('renders children correctly', () => {
    render(<Section><p>Hello world</p></Section>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies white/page background by default', () => {
    const { container } = render(<Section>Default</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-[var(--color-bg-page)]');
    expect(el.className).toContain('text-[var(--color-text-primary)]');
  });

  it('applies soft background variant', () => {
    const { container } = render(<Section background="soft">Soft</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-[var(--color-bg-soft)]');
    expect(el.className).toContain('text-[var(--color-text-primary)]');
  });

  it('applies warm background variant', () => {
    const { container } = render(<Section background="warm">Warm</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-[var(--color-bg-warm)]');
    expect(el.className).toContain('text-[var(--color-text-primary)]');
  });

  it('applies brand background variant with on-brand text colour', () => {
    const { container } = render(<Section background="brand">Brand</Section>);
    const el = container.firstChild as HTMLElement;
    // a11y-shared #5: brand variant uses the bg-brand utility (not an arbitrary
    // value) so the .bg-brand *:focus-visible rule matches and the focus ring is white.
    expect(el.className).toContain('bg-brand');
    expect(el.className).toContain('text-[var(--color-text-on-brand)]');
  });

  it('applies dark background variant with on-dark text colour', () => {
    const { container } = render(<Section background="dark">Dark</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-[var(--color-bg-dark)]');
    expect(el.className).toContain('text-[var(--color-text-on-dark)]');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Section className="custom-section">Content</Section>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-section'
    );
  });

  it('forwards id prop to the <section> element', () => {
    const { container } = render(<Section id="programmes">Content</Section>);
    expect((container.firstChild as HTMLElement).id).toBe('programmes');
  });

  it('forwards aria-label prop to the <section> element', () => {
    const { container } = render(
      <Section aria-label="Our programmes">Content</Section>
    );
    expect(container.firstChild as HTMLElement).toHaveAttribute(
      'aria-label',
      'Our programmes'
    );
  });

  it('applies responsive spacing classes', () => {
    const { container } = render(<Section>Spacing</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('py-[var(--space-8)]');
    expect(el.className).toContain('tablet:py-[var(--space-10)]');
    expect(el.className).toContain('desktop:py-[var(--space-16)]');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Section aria-label="Main content">
        <h2>Section heading</h2>
        <p>Section body text.</p>
      </Section>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
