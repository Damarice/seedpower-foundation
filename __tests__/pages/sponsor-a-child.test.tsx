/**
 * Tests for Sponsor a Child — /get-involved/sponsor-a-child
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
  it('renders a single page heading and a photography placeholder', () => {
    render(<SponsorAChildPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sponsor a Child' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'SeedPower education photography placeholder' })
    ).toBeInTheDocument();
  });

  it('preserves the source message that every donation matters', () => {
    render(<SponsorAChildPage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Every Donation Matters' })
    ).toBeInTheDocument();
    expect(screen.getByText(/even a small contribution helps children get an education/i)).toBeInTheDocument();
  });

  it('lists the programme areas from the original sponsorship page', () => {
    render(<SponsorAChildPage />);
    expect(screen.getByText(/early childhood through elementary level/i)).toBeInTheDocument();
    expect(screen.getByText('Teacher training and outreach')).toBeInTheDocument();
    expect(screen.getByText('Family and community outreach')).toBeInTheDocument();
    expect(screen.getByText('Women and girl-child empowerment')).toBeInTheDocument();
    expect(screen.getByText('Youth empowerment')).toBeInTheDocument();
    expect(screen.getByText('Sustainable food systems')).toBeInTheDocument();
    expect(screen.getByText('Water and sanitation')).toBeInTheDocument();
  });

  it('does not present the old 375 figure as a dated or current sponsorship result', () => {
    render(<SponsorAChildPage />);
    expect(screen.queryByText(/375|January 2026/i)).not.toBeInTheDocument();
  });

  it('links to the original sponsorship portal and opens it safely in a new tab', () => {
    render(<SponsorAChildPage />);
    const portalLink = screen.getByRole('link', {
      name: /visit the sponsorship portal/i,
    });
    expect(portalLink).toHaveAttribute(
      'href',
      'http://www.gobgi.org/seedpowerkenya/'
    );
    expect(portalLink).toHaveAttribute('target', '_blank');
    expect(portalLink.getAttribute('rel')).toContain('noopener');
    expect(portalLink.getAttribute('rel')).toContain('noreferrer');
  });

  it('retains the existing Donate and Volunteer destinations', () => {
    render(<SponsorAChildPage />);
    expect(screen.getByRole('link', { name: 'Donate' })).toHaveAttribute(
      'href',
      '/give/donate'
    );
    expect(screen.getByRole('link', { name: 'Volunteer' })).toHaveAttribute(
      'href',
      '/get-involved/volunteer'
    );
    expect(
      screen.getByRole('link', { name: 'View Our Programmes' })
    ).toHaveAttribute('href', '/what-we-do');
  });

  it('does not invent child profiles, names, or sponsorship amounts', () => {
    render(<SponsorAChildPage />);
    expect(screen.queryByText(/meet [a-z]+ who/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/\$\d+.*per month|\$\d+.*per child|\$\d+.*monthly/i)
    ).not.toBeInTheDocument();
  });

  it('does not claim the external portal is currently accepting applications', () => {
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
