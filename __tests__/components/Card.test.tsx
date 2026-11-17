import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from '@/components/ui/Card';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a <div> by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders as <article> when as="article"', () => {
    const { container: articleContainer } = render(<Card as="article">Content</Card>);
    expect(articleContainer.firstChild?.nodeName).toBe('ARTICLE');
  });

  it('renders as <li> when as="li"', () => {
    render(
      <ul>
        <Card as="li">Item</Card>
      </ul>
    );
    expect(screen.getByText('Item').tagName).toBe('LI');
  });

  it('applies card base styles', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-[var(--color-bg-page)]');
    expect(el.className).toContain('border');
    expect(el.className).toContain('rounded-[var(--radius-md)]');
  });

  it('applies hover shadow class', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('hover:shadow-[var(--shadow-card)]');
  });

  it('accepts additional className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-class'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Card>
        <h3>Programme Title</h3>
        <p>Some description text.</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
