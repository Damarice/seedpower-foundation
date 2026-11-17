import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Footer } from '@/components/layout/Footer';

expect.extend(toHaveNoViolations);

describe('Footer', () => {
  it('renders without error', () => {
    render(<Footer />);
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('displays the confirmed tagline', () => {
    render(<Footer />);
    expect(
      screen.getByText(/exploit potential\. eradicate poverty\./i)
    ).toBeInTheDocument();
  });

  it('displays copyright text with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    // CopyrightYear renders via useEffect (client-only); in jsdom it runs synchronously.
    // Find the copyright paragraph by its registration number text.
    const allPs = Array.from(document.querySelectorAll('p'));
    const copyrightP = allPs.find(
      (p) =>
        p.textContent?.includes('SeedPower Foundation') &&
        p.textContent?.includes('SRD')
    );
    expect(copyrightP).toBeDefined();
    expect(copyrightP?.textContent).toContain(year);
  });

  it('displays the registration number', () => {
    render(<Footer />);
    expect(screen.getByText(/SRD\/KK\/121731\/2019/)).toBeInTheDocument();
  });

  it('What We Do column links are present with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /education/i })).toHaveAttribute(
      'href',
      '/what-we-do/education'
    );
    expect(screen.getByRole('link', { name: /teacher training/i })).toHaveAttribute(
      'href',
      '/what-we-do/teacher-training'
    );
    expect(screen.getByRole('link', { name: /community outreach/i })).toHaveAttribute(
      'href',
      '/what-we-do/community-outreach'
    );
  });

  it('Get Involved column links are present with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /volunteer/i })).toHaveAttribute(
      'href',
      '/get-involved/volunteer'
    );
    expect(screen.getByRole('link', { name: /sponsor a child/i })).toHaveAttribute(
      'href',
      '/get-involved/sponsor-a-child'
    );
  });

  it('Give column Donate link has correct href', () => {
    render(<Footer />);
    // Donate link in footer (may be multiple — confirm at least one points to /give/donate)
    const donateLinks = screen.getAllByRole('link', { name: /donate/i });
    const footerDonate = donateLinks.find(
      (el) => el.getAttribute('href') === '/give/donate'
    );
    expect(footerDonate).toBeDefined();
  });

  it('Give column Events link has correct href', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /events/i })).toHaveAttribute(
      'href',
      '/give/events'
    );
  });

  it('Privacy Policy link is present', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy-policy'
    );
  });

  it('Sitemap link is present', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /sitemap/i })).toHaveAttribute(
      'href',
      '/sitemap'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
