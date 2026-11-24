/**
 * Tests for the Impact Overview page — /impact
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ImpactPage from '@/app/(content)/impact/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/impact' }));

describe('ImpactPage', () => {
  it('renders without error', () => {
    render(<ImpactPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Our Impact"', () => {
    render(<ImpactPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Our Impact');
  });

  it('renders the full-width hero with an image placeholder', () => {
    render(<ImpactPage />);
    expect(
      screen.getByRole('img', { name: 'Impact photography placeholder' })
    ).toBeInTheDocument();
  });

  it('renders the verified impact statistics without adding programme totals', () => {
    render(<ImpactPage />);
    expect(screen.getByTestId('impact-counter-375')).toHaveTextContent('375');
    expect(screen.getByTestId('impact-counter-1738')).toHaveTextContent('1,738');
    expect(screen.getByTestId('impact-counter-100')).toHaveTextContent('~100');
    expect(screen.getByTestId('impact-counter-2018')).toHaveTextContent('2018');
    expect(
      screen.getByText('Children supported across two campuses')
    ).toBeInTheDocument();
    expect(
      screen.getByText('People reached through teacher development')
    ).toBeInTheDocument();
  });

  it('does not present the old growth narrative as a dated or current enrolment total', () => {
    render(<ImpactPage />);
    expect(screen.queryByText(/January 2026|from 12 to 375/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/currently enrolled|are enrolled today|live enrolment/i)
    ).not.toBeInTheDocument();
  });

  it('links programme areas to their existing routes', () => {
    render(<ImpactPage />);
    expect(
      screen.getByRole('link', { name: 'Explore Education' })
    ).toHaveAttribute('href', '/what-we-do/education');
    expect(
      screen.getByRole('link', { name: 'Explore Teacher Training' })
    ).toHaveAttribute('href', '/what-we-do/teacher-training');
    expect(
      screen.getByRole('link', { name: 'Explore Women’s Empowerment' })
    ).toHaveAttribute('href', '/what-we-do/womens-empowerment');
    expect(
      screen.getByRole('link', { name: 'Explore Water & Sanitation' })
    ).toHaveAttribute('href', '/what-we-do/wash');
    expect(
      screen.getByRole('link', { name: 'Explore Community Outreach' })
    ).toHaveAttribute('href', '/what-we-do/community-outreach');
  });

  it('links to /impact/success-stories', () => {
    render(<ImpactPage />);
    expect(screen.getByRole('link', { name: /read the stories/i })).toHaveAttribute('href', '/impact/success-stories');
  });

  it('links to /give/donate for donation CTA', () => {
    render(<ImpactPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('does not display Turkana family figures', () => {
    render(<ImpactPage />);
    expect(screen.queryByText(/2,460|1,260|680/)).not.toBeInTheDocument();
  });

  it('does not display the unconfirmed 3,600 outreach figure', () => {
    render(<ImpactPage />);
    expect(screen.queryByText(/3,600/)).not.toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<ImpactPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
