import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DonatePage from '@/app/(content)/give/donate/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/give/donate' }));

describe('DonatePage', () => {
  it('renders without error', () => {
    render(<DonatePage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Donate"', () => {
    render(<DonatePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Donate');
  });

  it('renders the verified source tagline', () => {
    render(<DonatePage />);
    expect(
      screen.getByText(/a cheerful giver will change the world/i)
    ).toBeInTheDocument();
  });

  it('renders the verified donation impact messaging', () => {
    render(<DonatePage />);
    expect(
      screen.getByText(/your generous gift will bring joy and purpose/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/every amount counts/i)).toBeInTheDocument();
  });

  it('renders all three verified donation impact tiers', () => {
    render(<DonatePage />);
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(screen.getByText('$480')).toBeInTheDocument();
    // Descriptions verbatim from source
    expect(screen.getByText(/feed a child for a month/i)).toBeInTheDocument();
    expect(screen.getByText(/send a child to school for a month/i)).toBeInTheDocument();
    expect(screen.getByText(/send a child to school for a year/i)).toBeInTheDocument();
  });

  it('mentions monthly giving option', () => {
    render(<DonatePage />);
    const monthlyEls = screen.getAllByText(/monthly/i);
    expect(monthlyEls.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the primary NeonCRM donation link with the exact confirmed URL', () => {
    render(<DonatePage />);
    const neonLinks = screen
      .getAllByRole('link')
      .filter(
        (el) =>
          el.getAttribute('href') ===
          'https://btgii.app.neoncrm.com/forms/seedpower'
      );
    expect(neonLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('NeonCRM link opens in a new tab with noopener noreferrer', () => {
    render(<DonatePage />);
    const neonLink = screen
      .getAllByRole('link')
      .find(
        (el) =>
          el.getAttribute('href') ===
          'https://btgii.app.neoncrm.com/forms/seedpower'
      );
    expect(neonLink).toBeDefined();
    expect(neonLink!.getAttribute('target')).toBe('_blank');
    expect(neonLink!.getAttribute('rel')).toContain('noopener');
    expect(neonLink!.getAttribute('rel')).toContain('noreferrer');
  });

  it('does not render an embedded payment form', () => {
    render(<DonatePage />);
    // No <form> element should be present (Phase 7 boundary)
    expect(document.querySelector('form')).toBeNull();
  });

  it('does not invent donation amounts beyond the three verified tiers', () => {
    render(<DonatePage />);
    // No invented amounts like $10, $50, $100 etc.
    expect(screen.queryByText(/^\$10$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\$50$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\$100$/)).not.toBeInTheDocument();
  });

  it('renders secondary CTAs to sponsor and volunteer', () => {
    render(<DonatePage />);
    expect(
      screen.getByRole('link', { name: /sponsor a child/i })
    ).toHaveAttribute('href', '/get-involved/sponsor-a-child');
    expect(
      screen.getByRole('link', { name: /volunteer/i })
    ).toHaveAttribute('href', '/get-involved/volunteer');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<DonatePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
