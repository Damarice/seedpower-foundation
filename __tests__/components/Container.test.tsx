import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Container } from '@/components/layout/Container';

expect.extend(toHaveNoViolations);

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Container content</Container>);
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('renders as a <div> by default', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders as <main> when as="main"', () => {
    const { container } = render(<Container as="main">Content</Container>);
    expect(container.firstChild?.nodeName).toBe('MAIN');
  });

  it('applies default max-width token class', () => {
    const { container } = render(<Container>Content</Container>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'max-w-[var(--container-max)]'
    );
  });

  it('applies wide max-width token class', () => {
    const { container } = render(
      <Container variant="wide">Content</Container>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'max-w-[var(--container-wide)]'
    );
  });

  it('applies narrow max-width token class', () => {
    const { container } = render(
      <Container variant="narrow">Content</Container>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'max-w-[var(--container-narrow)]'
    );
  });

  it('applies mobile padding token class', () => {
    const { container } = render(<Container>Content</Container>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'px-[var(--container-padding-mobile)]'
    );
  });

  it('centres horizontally with mx-auto', () => {
    const { container } = render(<Container>Content</Container>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'mx-auto'
    );
  });

  it('accepts additional className', () => {
    const { container } = render(
      <Container className="extra">Content</Container>
    );
    expect((container.firstChild as HTMLElement).className).toContain('extra');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Container>
        <p>Page content goes here.</p>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
