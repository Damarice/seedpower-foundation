/**
 * Tests for the Sponsor a Child page — /get-involved/sponsor-a-child
 *
 * Covers:
 *   - Page heading
 *   - Introduction and education context
 *   - 375-student figure presented as January 2026 milestone (not current enrolment)
 *   - GOBGI portal link: exact URL, external link target and rel attributes
 *   - Secondary CTAs: /give/donate and /get-involved/volunteer
 *   - No fabricated child profiles, names, or sponsorship amounts
 *   - Accessibility
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SponsorAChildPage from '@/app/(content)/get-involved/sponsor-a-child/page';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/get-involved/sponsor-a-child',
}));

describe('SponsorAChildPage', () => {
  it('renders without error', () => {
    render(<SponsorAChildPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Sponsor a Child"', () => {
    render(<SponsorAChildPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Sponsor a Child');
  });

  it('renders the verified education context message about donations', () => {
    render(<SponsorAChildPage />);
    expect(
      screen.getByText(/each donation matters/i)
    ).toBeInTheDocument();
  });

  it('presents 375 students as a historical January 2026 milestone, not current enrolment', () => {
    render(<SponsorAChildPage />);
    // Both the figure and the date must appear together in context
    expect(screen.getByText(/375/)).toBeInTheDocument();
    expect(screen.getByText(/January 2026/i)).toBeInTheDocument();
    // Must NOT imply it is a live current count
    expect(
      screen.queryByText(/currently enrolled|are enrolled today|live enrolment/i)
    ).not.toBeInTheDocument();
  });

  it('renders the GOBGI portal link with the exact confirmed URL', () => {
    render(<SponsorAChildPage />);
    const gobgiLinks = screen
      .getAllByRole('link')
      .filter((el) =>
        el.getAttribute('href') === 'http://www.gobgi.org/seedpowerkenya/'
      );
    expect(gobgiLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('GOBGI portal link opens in a new tab with noopener noreferrer', () => {
    render(<SponsorAChildPage />);
    const gobgiLink = screen
      .getAllByRole('link')
      .find(
        (el) => el.getAttribute('href') === 'http://www.gobgi.org/seedpowerkenya/'
      );
    expect(gobgiLink).toBeDefined();
    expect(gobgiLink!.getAttribute('target')).toBe('_blank');
    expect(gobgiLink!.getAttribute('rel')).toContain('noopener');
    expect(gobgiLink!.getAttribute('rel')).toContain('noreferrer');
  });

  it('GOBGI link has a descriptive accessible name', () => {
    render(<SponsorAChildPage />);
    // The link must have a meaningful aria-label or text, not just "click here"
    const gobgiLink = screen
      .getAllByRole('link')
      .find(
        (el) => el.getAttribute('href') === 'http://www.gobgi.org/seedpowerkenya/'
      );
    const accessibleName =
      gobgiLink!.getAttribute('aria-label') ?? gobgiLink!.textContent ?? '';
    expect(accessibleName.length).toBeGreaterThan(10);
    expect(accessibleName).not.toMatch(/^click here$/i);
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<SponsorAChildPage />);
    expect(
      screen.getByRole('link', { name: /donate/i })
    ).toHaveAttribute('href', '/give/donate');
  });

  it('renders volunteer CTA linking to /get-involved/volunteer', () => {
    render(<SponsorAChildPage />);
    expect(
      screen.getByRole('link', { name: /volunteer/i })
    ).toHaveAttribute('href', '/get-involved/volunteer');
  });

  it('does not invent individual child profiles or names', () => {
    render(<SponsorAChildPage />);
    // No testimonial-style language suggesting invented child content
    expect(screen.queryByText(/meet [a-z]+ who/i)).not.toBeInTheDocument();
  });

  it('does not display sponsorship amounts or cost-per-child figures', () => {
    render(<SponsorAChildPage />);
    // No invented monthly fees or per-child costs
    expect(screen.queryByText(/\$\d+.*per month|\$\d+.*per child|\$\d+.*monthly/i)).not.toBeInTheDocument();
  });

  it('does not claim the GOBGI portal is currently active or verified', () => {
    render(<SponsorAChildPage />);
    expect(
      screen.queryByText(/currently active|verified portal|accepting applications/i)
    ).not.toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<SponsorAChildPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
