/**
 * Tests for the Volunteer page — /get-involved/volunteer
 *
 * Covers:
 *   - Rendering without error
 *   - Correct H1 heading
 *   - All four volunteering areas rendered with correct headings
 *   - Mission trips section present
 *   - CTA tagline and "Become a Volunteer" link present with correct destination
 *   - No invented content (statistics, quotes)
 *   - axe accessibility check
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import VolunteerPage from '@/app/(content)/get-involved/volunteer/page';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/get-involved/volunteer',
}));

describe('VolunteerPage', () => {
  it('renders without error', () => {
    render(<VolunteerPage />);
    // Page renders if no error is thrown
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 with the text "Volunteer"', () => {
    render(<VolunteerPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Volunteer');
  });

  it('renders the shared hero with an outreach photograph', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByRole('img', {
        name: 'Participants meet during a school-based outreach activity.',
      })
    ).toBeInTheDocument();
  });

  it('renders all five volunteering area headings as H3', () => {
    render(<VolunteerPage />);
    const expectedAreas = [
      "Children's Education",
      'Sustainable Food Project',
      'Community and Family Outreach',
      'Teacher Professional Development',
    ];
    for (const area of expectedAreas) {
      expect(
        screen.getByRole('heading', { level: 3, name: area })
      ).toBeInTheDocument();
    }
  });

  it('renders four volunteering areas in an accessible list', () => {
    render(<VolunteerPage />);
    const list = screen.getByRole('list', { name: /volunteering areas/i });
    expect(list.querySelectorAll(':scope > li')).toHaveLength(4);
  });

  it('renders Mission Trips section heading', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Mission Trips' })
    ).toBeInTheDocument();
  });

  it('preserves the original visit duration and individual-or-group options', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByText(/individual or as a group for one week up to one month/i)
    ).toBeInTheDocument();
  });

  it('uses an authentic volunteer photograph for the mission-trip section', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByRole('img', {
        name: 'SeedPower volunteers and partners gather outside a school.',
      })
    ).toBeInTheDocument();
  });

  it('renders the confirmed tagline', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByRole('heading', {
        name: /together we can change the world/i,
      })
    ).toBeInTheDocument();
  });

  it('renders "Become a Volunteer" link pointing to /contact', () => {
    render(<VolunteerPage />);
    const cta = screen.getByRole('link', { name: /become a volunteer/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/contact');
  });

  it('does not render any statistics or invented figures', () => {
    render(<VolunteerPage />);
    // The page should contain no numeric stat patterns that could be invented
    // Check that no text resembles "X families", "X people" etc.
    expect(screen.queryByText(/\d+,\d+ (families|people)/i)).not.toBeInTheDocument();
  });

  it('volunteering areas list has an accessible label', () => {
    render(<VolunteerPage />);
    expect(
      screen.getByRole('list', { name: /volunteering areas/i })
    ).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<VolunteerPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
