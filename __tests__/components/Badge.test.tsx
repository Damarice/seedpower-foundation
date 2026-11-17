import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from '@/components/ui/Badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  it('renders without error', () => {
    render(<Badge>Education</Badge>);
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('renders a <span> element', () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('defaults to neutral variant', () => {
    render(<Badge>Neutral</Badge>);
    const badge = screen.getByText('Neutral');
    expect(badge.className).toContain('bg-[var(--color-bg-soft)]');
  });

  it('applies brand variant styles', () => {
    render(<Badge variant="brand">Brand</Badge>);
    const badge = screen.getByText('Brand');
    expect(badge.className).toContain('bg-[var(--color-brand)]');
    expect(badge.className).toContain('text-[var(--color-text-on-brand)]');
  });

  it('applies pill radius class', () => {
    render(<Badge>Pill</Badge>);
    expect(screen.getByText('Pill').className).toContain(
      'rounded-[var(--radius-full)]'
    );
  });

  it('accepts additional className', () => {
    render(<Badge className="custom">Custom</Badge>);
    expect(screen.getByText('Custom').className).toContain('custom');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<Badge>Accessible Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
