/**
 * Tests for app/page.tsx — the homepage.
 *
 * Covers:
 *   - Renders without error.
 *   - Single H1 (the hero section placeholder).
 *   - Mission strip text present.
 *   - Impact statistics section with all four confirmed figures.
 *   - Programme grid section heading and all six programme titles.
 *   - Featured story heading and content.
 *   - Get Involved CTA section heading and three column links.
 *   - Sections have accessible labels.
 *   - axe accessibility check.
 */
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('HomePage', () => {
  it('renders without error', () => {
    render(<HomePage />);
    expect(document.body).toBeTruthy();
  });

  it('has exactly one H1', () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it('renders the confirmed mission statement text', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/enable, equip and empower students with special needs/i)
    ).toBeInTheDocument();
  });

  it('renders all four confirmed impact statistics', () => {
    render(<HomePage />);
    const impact = screen.getByRole('region', { name: /our impact/i });
    // F3 fix: each stat's figure and label render as separate visible texts
    // (the combined aria-label was removed).
    expect(within(impact).getByText('375')).toBeInTheDocument();
    expect(within(impact).getByText('Students Served')).toBeInTheDocument();
    expect(within(impact).getByText('1,738')).toBeInTheDocument();
    expect(within(impact).getByText('Educators Trained')).toBeInTheDocument();
    expect(within(impact).getByText('~100')).toBeInTheDocument();
    expect(within(impact).getByText('Women Trained')).toBeInTheDocument();
    expect(within(impact).getByText('2018')).toBeInTheDocument();
    expect(within(impact).getByText('Year Founded')).toBeInTheDocument();
  });

  it('renders the What We Do section heading as an H2', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'What We Do' })
    ).toBeInTheDocument();
  });

  it('renders all six programme card titles', () => {
    render(<HomePage />);
    const titles = [
      'Education Centers',
      "Women's Empowerment",
      'Teacher Training',
      'Water & Sanitation',
      'Sustainable Food Project',
      'Community Outreach',
    ];
    for (const title of titles) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it('renders the featured story heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: /growing from 12 to 375 students/i })
    ).toBeInTheDocument();
  });

  it('renders the confirmed growth narrative', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/12 students.*375 children/i)
    ).toBeInTheDocument();
  });

  it('renders the Get Involved section with accessible label', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('region', { name: /get involved/i })
    ).toBeInTheDocument();
  });

  it('renders all three Get Involved CTA links', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('link', { name: /give now/i })
    ).toHaveAttribute('href', '/give/donate');
    expect(
      screen.getByRole('link', { name: /get involved/i })
    ).toHaveAttribute('href', '/get-involved/volunteer');
    expect(
      screen.getByRole('link', { name: /sponsor/i })
    ).toHaveAttribute('href', '/get-involved/sponsor-a-child');
  });

  it('renders the impact statistics section with accessible label', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('region', { name: /our impact/i })
    ).toBeInTheDocument();
  });

  it('does not render its own main landmark (the root layout provides <main>)', () => {
    // F1 fix: page.tsx uses a Fragment, not a nested <main> inside the layout's <main>.
    render(<HomePage />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it('overrides the focus ring colour to white on the brand-green Get Involved section', () => {
    // F2 fix: white focus ring on the brand background so the ring stays visible.
    render(<HomePage />);
    const region = screen.getByRole('region', { name: /get involved/i });
    expect(region.style.getPropertyValue('--focus-ring-color')).toBe('#ffffff');
  });

  it('renders the "More Stories" link with a descriptive accessible name', () => {
    // F4 fix: disambiguate the out-of-context "More Stories" link name.
    render(<HomePage />);
    expect(
      screen.getByRole('link', { name: /more success stories/i })
    ).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
