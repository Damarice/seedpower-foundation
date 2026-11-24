/**
 * Tests for the Who We Are page — /who-we-are
 *
 * Covers:
 *   - Rendering without error
 *   - Single H1 "Who We Are"
 *   - Mission and vision text
 *   - All six core values present
 *   - Both founders and their roles
 *   - All five advisory board members present
 *   - Disputed registration number absent
 *   - Stale "sixth year" wording absent
 *   - Section accessible names
 *   - axe accessibility check
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import WhoWeArePage from '@/app/(content)/who-we-are/page';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/who-we-are',
}));

describe('WhoWeArePage', () => {
  it('renders without error', () => {
    render(<WhoWeArePage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 with the text "Who We Are"', () => {
    render(<WhoWeArePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Who We Are');
  });

  it('keeps the hero to its heading, short description and photo placeholder', () => {
    render(<WhoWeArePage />);
    const hero = screen.getByRole('region', { name: 'Who We Are' });

    expect(
      screen.getByText('Empowering vulnerable children, youth and women in the community.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'SeedPower community activities photography placeholder',
      })
    ).toBeInTheDocument();
    expect(hero.querySelectorAll('a')).toHaveLength(0);
    expect(hero.querySelectorAll('h1')).toHaveLength(1);
  });

  it('renders the mission statement', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByText(/empower the vulnerable communities by providing them with/i)
    ).toBeInTheDocument();
  });

  it('renders the vision statement', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByText(/equitably access sustainable livelihood opportunities/i)
    ).toBeInTheDocument();
  });

  it('renders Our Mission as an H2', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Mission' })
    ).toBeInTheDocument();
  });

  it('renders all six core values', () => {
    render(<WhoWeArePage />);
    const values = ['Faith', 'Respect', 'Integrity', 'The Word of God', 'Prayer', 'Hope'];
    for (const value of values) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it('renders Our Values as an H2', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Values' })
    ).toBeInTheDocument();
  });

  it('renders Beldon Okeyo as an H3 with his role', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Beldon Okeyo' })
    ).toBeInTheDocument();
    // Both founders share the same role text; assert it appears at least twice
    const roleEls = screen.getAllByText(/Co-Executive Director, Co-Founder/i);
    expect(roleEls.length).toBeGreaterThanOrEqual(2);
  });

  it('renders Peter Opinya as an H3 with his role', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Peter Opinya' })
    ).toBeInTheDocument();
  });

  it('renders Our Founders as an H2', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Founders' })
    ).toBeInTheDocument();
  });

  it('renders all five advisory board member names', () => {
    render(<WhoWeArePage />);
    const members = [
      'Jean Karsten Winfrey',
      'Jim Grinnell',
      'Laura Grinnell',
      'Linda Steed',
      'Keith Winfrey',
    ];
    for (const member of members) {
      expect(screen.getByText(member)).toBeInTheDocument();
    }
  });

  it('renders Advisory Board as an H2', () => {
    render(<WhoWeArePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Advisory Board' })
    ).toBeInTheDocument();
  });

  it('preserves the existing section order and ends with the CTA', () => {
    render(<WhoWeArePage />);
    const regions = screen.getAllByRole('region');

    expect(regions.map((region) => region.getAttribute('aria-label') || region.querySelector('h1, h2')?.textContent?.trim())).toEqual([
      'Who We Are',
      'Our Founders',
      'Our mission, vision and aim',
      'Our Values',
      'Advisory Board',
      "Support SeedPower's work",
    ]);
  });

  it('offers Donate and Contact Us links in the closing CTA', () => {
    render(<WhoWeArePage />);
    const cta = screen.getByRole('region', { name: "Support SeedPower's work" });

    expect(screen.getByRole('link', { name: 'Donate' })).toHaveAttribute(
      'href',
      '/give/donate'
    );
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute(
      'href',
      '/contact'
    );
    expect(cta).toBeInTheDocument();
  });

  it('does not display the disputed registration number SRD/KK/121731/2019', () => {
    render(<WhoWeArePage />);
    expect(screen.queryByText(/SRD\/KK\/121731\/2019/)).not.toBeInTheDocument();
  });

  it('does not display the disputed registration number DSD/43/245/02/82873', () => {
    render(<WhoWeArePage />);
    expect(screen.queryByText(/DSD\/43\/245\/02\/82873/)).not.toBeInTheDocument();
  });

  it('does not use the stale sixth-year wording', () => {
    render(<WhoWeArePage />);
    expect(screen.queryByText(/sixth year/i)).not.toBeInTheDocument();
  });

  it('renders portrait placeholders for all founders', () => {
    render(<WhoWeArePage />);
    // Each founder placeholder has role="img" with an accessible name
    expect(
      screen.getByRole('img', { name: /beldon okeyo.*co-executive director/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /peter opinya.*co-executive director/i })
    ).toBeInTheDocument();
  });

  it('renders portrait placeholders for all five board members', () => {
    render(<WhoWeArePage />);
    const boardAlts = [
      /jean karsten winfrey/i,
      /jim grinnell/i,
      /laura grinnell/i,
      /linda steed/i,
      /keith winfrey/i,
    ];
    for (const pattern of boardAlts) {
      expect(screen.getByRole('img', { name: pattern })).toBeInTheDocument();
    }
  });

  it('sections have accessible names via aria-labelledby', () => {
    render(<WhoWeArePage />);
    // The page-header section is labelled by the H1
    expect(screen.getByRole('region', { name: /who we are/i })).toBeInTheDocument();
    // Founders section
    expect(screen.getByRole('region', { name: /our founders/i })).toBeInTheDocument();
    // Advisory board section
    expect(screen.getByRole('region', { name: /advisory board/i })).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<WhoWeArePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
