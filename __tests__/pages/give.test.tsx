import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GivePage from '@/app/(content)/give/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/give' }));

describe('GivePage', () => {
  it('renders without error', () => {
    render(<GivePage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Give"', () => {
    render(<GivePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Give');
  });

  it('links to /give/donate', () => {
    render(<GivePage />);
    const donateLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === '/give/donate');
    expect(donateLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('links to /get-involved/sponsor-a-child', () => {
    render(<GivePage />);
    const sponsorLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === '/get-involved/sponsor-a-child');
    expect(sponsorLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('does not link to /give/events (conditional, not yet built)', () => {
    render(<GivePage />);
    const eventsLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === '/give/events');
    expect(eventsLinks).toHaveLength(0);
  });

  it('shows an events informational item without an active link', () => {
    render(<GivePage />);
    // Events heading should be present as informational text
    const eventsHeadings = screen.getAllByRole('heading').filter((el) =>
      el.textContent?.toLowerCase().includes('events')
    );
    expect(eventsHeadings.length).toBeGreaterThanOrEqual(1);
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<GivePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
