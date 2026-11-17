import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders a <button> element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders button text', () => {
    render(<Button>Send Message</Button>);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('defaults to primary variant', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-brand)]');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-bg-dark)]');
  });

  it('applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-2');
    expect(btn.className).toContain('bg-transparent');
  });

  it('applies sm size styles', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-sm');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disabled button has not-allowed cursor class', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('disabled:cursor-not-allowed');
  });

  it('accepts and passes through additional className', () => {
    render(<Button className="extra-class">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('extra-class');
  });

  it('has minimum touch target height class', () => {
    render(<Button>Touch Target</Button>);
    expect(screen.getByRole('button').className).toContain(
      'min-h-[var(--touch-target-min)]'
    );
  });

  it('has focus ring classes', () => {
    render(<Button>Focus</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('focus-visible:outline');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe accessibility check when disabled', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
