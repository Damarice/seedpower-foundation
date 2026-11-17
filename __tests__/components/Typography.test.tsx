import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Heading, Text } from '@/components/ui/Typography';

expect.extend(toHaveNoViolations);

describe('Heading', () => {
  it('renders hero variant as h1 by default', () => {
    render(<Heading variant="hero">Hero Title</Heading>);
    expect(screen.getByRole('heading', { level: 1, name: 'Hero Title' })).toBeInTheDocument();
  });

  it('renders h1 variant as h1 by default', () => {
    render(<Heading variant="h1">Page Title</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders h2 variant as h2 by default', () => {
    render(<Heading variant="h2">Section Title</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders h3 variant as h3 by default', () => {
    render(<Heading variant="h3">Subsection</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders h4 variant as h4 by default', () => {
    render(<Heading variant="h4">Sub-heading</Heading>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });

  it('overrides element with as prop', () => {
    render(<Heading variant="h2" as="h3">Override</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('applies heading font token class', () => {
    const { container } = render(<Heading variant="h1">Title</Heading>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'font-[var(--font-heading)]'
    );
  });

  it('applies correct font-size token for h2 variant', () => {
    const { container } = render(<Heading variant="h2">Title</Heading>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-[length:var(--text-h2)]'
    );
  });

  it('defaults to h2 variant when no variant provided', () => {
    render(<Heading>Default heading</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('accepts additional className', () => {
    const { container } = render(
      <Heading variant="h2" className="text-center">Title</Heading>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-center'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <div>
        <Heading variant="h1">Page Title</Heading>
        <Heading variant="h2">Section</Heading>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Text', () => {
  it('renders body variant as <p> by default', () => {
    render(<Text variant="body">Body text</Text>);
    expect(screen.getByText('Body text').tagName).toBe('P');
  });

  it('renders body-lg variant', () => {
    const { container } = render(
      <Text variant="body-lg">Large text</Text>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-[length:var(--text-body-lg)]'
    );
  });

  it('renders body-sm variant', () => {
    const { container } = render(
      <Text variant="body-sm">Small text</Text>
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-[length:var(--text-body-sm)]'
    );
  });

  it('renders caption variant as <span> by default', () => {
    render(<Text variant="caption">Caption text</Text>);
    expect(screen.getByText('Caption text').tagName).toBe('SPAN');
  });

  it('renders label variant', () => {
    const { container } = render(<Text variant="label">Label</Text>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'font-semibold'
    );
  });

  it('renders nav variant', () => {
    const { container } = render(<Text variant="nav">Nav item</Text>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-[length:var(--text-nav)]'
    );
  });

  it('renders with custom element via as prop', () => {
    render(<Text variant="body" as="span">Inline text</Text>);
    expect(screen.getByText('Inline text').tagName).toBe('SPAN');
  });

  it('applies body font token class', () => {
    const { container } = render(<Text variant="body">Text</Text>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'font-[var(--font-body)]'
    );
  });

  it('defaults to body variant', () => {
    const { container } = render(<Text>Default text</Text>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'text-[length:var(--text-body)]'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <div>
        <Text variant="body-lg">Intro paragraph.</Text>
        <Text variant="body">Standard body text.</Text>
        <Text variant="caption">Image caption.</Text>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
