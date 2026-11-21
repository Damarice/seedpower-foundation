/**
 * Tests for app/not-found.tsx — the custom 404 page.
 *
 * Covers (Phase 8E):
 *   - Renders without error.
 *   - Single H1 "Page Not Found".
 *   - Explanation text present.
 *   - Prominent primary link to homepage ("/").
 *   - Secondary link to "/what-we-do".
 *   - Section carries an accessible label.
 *   - axe accessibility check.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import NotFoundPage from '@/app/not-found';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('NotFoundPage', () => {
  it('renders without error', () => {
    render(<NotFoundPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Page Not Found"', () => {
    render(<NotFoundPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Page Not Found');
  });

  it('renders an explanatory message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(/doesn.*t exist or may have been moved/i)
    ).toBeInTheDocument();
  });

  it('renders a link to the homepage', () => {
    render(<NotFoundPage />);
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders a secondary link to /what-we-do', () => {
    render(<NotFoundPage />);
    const secondaryLink = screen.getByRole('link', { name: /what we do/i });
    expect(secondaryLink).toBeInTheDocument();
    expect(secondaryLink).toHaveAttribute('href', '/what-we-do');
  });

  it('the section has an accessible label', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole('region', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<NotFoundPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
