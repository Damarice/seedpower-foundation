/**
 * Tests for app/page.tsx — the homepage.
 *
 * Covers:
 *   - Renders without error.
 *   - Single H1 (the active hero carousel slide).
 *   - The standalone mission strip is omitted from the homepage.
 *   - Impact statistics section with all four confirmed figures.
 *   - Programme grid section heading and all six programme titles.
 *   - Stories of Change heading and three story features.
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

  it('does not render the standalone mission statement on the homepage', () => {
    render(<HomePage />);
    expect(
      screen.queryByText(/enable, equip and empower students with special needs/i)
    ).not.toBeInTheDocument();
  });

  it('renders all four confirmed impact statistics', () => {
    render(<HomePage />);
    const impact = screen.getByRole('region', { name: /our impact/i });
    // F3 fix: each stat's figure and label render as separate visible texts
    // (the combined aria-label was removed).
    expect(within(impact).getByText('375', { selector: '.sr-only' })).toBeInTheDocument();
    expect(within(impact).getByText('Children Supported')).toBeInTheDocument();
    expect(within(impact).getByText('1,738', { selector: '.sr-only' })).toBeInTheDocument();
    expect(
      within(impact).getByText('People Reached Through Teacher Development')
    ).toBeInTheDocument();
    expect(within(impact).queryByText('Educators Trained')).not.toBeInTheDocument();
    expect(within(impact).getByText('~100', { selector: '.sr-only' })).toBeInTheDocument();
    expect(within(impact).getByText('Women Trained')).toBeInTheDocument();
    expect(within(impact).getByText('2018', { selector: '.sr-only' })).toBeInTheDocument();
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

  it('renders the requested programme introduction and impact details', () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        'Creating opportunities and lasting change through education, empowerment and community care.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('375 students supported')).toBeInTheDocument();
    expect(screen.getAllByText('Nearly 100 women trained').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('1,738 people reached across 47 counties')).toBeInTheDocument();
    expect(screen.getByLabelText('Programme status')).toHaveTextContent('In Development');
  });

  it('uses the existing route for each programme and the programmes index', () => {
    render(<HomePage />);
    const routes = [
      ['/what-we-do/education', /learn more about education centers/i],
      ['/what-we-do/womens-empowerment', /learn more about women's empowerment/i],
      ['/what-we-do/teacher-training', /learn more about teacher training/i],
      ['/what-we-do/wash', /learn more about water & sanitation/i],
      ['/what-we-do/food-project', /learn more about sustainable food project/i],
      ['/what-we-do/community-outreach', /learn more about community outreach/i],
    ] as const;
    for (const [href, accessibleName] of routes) {
      expect(screen.getByRole('link', { name: accessibleName })).toHaveAttribute('href', href);
    }
    expect(screen.getByRole('link', { name: 'View All Programmes' })).toHaveAttribute(
      'href',
      '/what-we-do'
    );
  });

  it('renders the Stories of Change heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Stories of Change' })
    ).toBeInTheDocument();
  });

  it('renders all three verified story headlines', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 3, name: 'From 12 Students to 375' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Skills That Build Stronger Communities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Bringing Clean Water Closer' })).toBeInTheDocument();
  });

  it('uses the existing programme and success stories routes', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('link', { name: 'Explore Story' })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: 'Explore Story' }).map((link) => link.getAttribute('href'))).toEqual([
      '/what-we-do/education',
      '/what-we-do/womens-empowerment',
      '/what-we-do/wash',
    ]);
    expect(screen.getByRole('link', { name: 'View All Stories' })).toHaveAttribute('href', '/impact/success-stories');
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

  it('applies the bg-brand class on the Get Involved section so the white focus-ring CSS rule fires', () => {
    // F2 / review finding #4 fix: the section must carry bg-brand so that
    // the global `.bg-brand *:focus-visible { outline-color: #ffffff }` rule matches.
    render(<HomePage />);
    const region = screen.getByRole('region', { name: /get involved/i });
    expect(region.className).toContain('bg-brand');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
