import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CommunityOutreachPage from '@/app/(content)/what-we-do/community-outreach/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/community-outreach' }));

describe('CommunityOutreachPage', () => {
  it('renders without error', () => {
    render(<CommunityOutreachPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Community Outreach"', () => {
    render(<CommunityOutreachPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Community Outreach');
  });

  it('renders the programme hero with a relief-food photograph', () => {
    render(<CommunityOutreachPage />);
    expect(
      screen.getByRole('img', {
        name: 'Community members receive food during an outreach in Turkana.',
      })
    ).toBeInTheDocument();
  });

  it('renders all four verified activity headings', () => {
    render(<CommunityOutreachPage />);
    expect(screen.getByRole('heading', { level: 3, name: 'Relief Food Programmes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Hygiene Supplies for Teenage Girls' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Child Rights Advocacy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Substance Abuse Prevention' })).toBeInTheDocument();
  });

  it('shows the 3,600 figure without an unverified timeframe', () => {
    render(<CommunityOutreachPage />);
    expect(screen.getByText(/3,600 people have been reached/i)).toBeInTheDocument();
    // Must not assert a specific period (e.g. "in 2026", "annually", "since 2018")
    expect(screen.queryByText(/3,600.*per year|annually.*3,600|3,600.*since \d{4}/i)).not.toBeInTheDocument();
  });

  it('does not display Turkana outreach figures', () => {
    render(<CommunityOutreachPage />);
    expect(screen.queryByText(/2,460|1,260|680/)).not.toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<CommunityOutreachPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<CommunityOutreachPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
