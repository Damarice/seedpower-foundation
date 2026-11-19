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

  it('renders all four confirmed impact statistics', () => {
    render(<ImpactPage />);
    expect(screen.getByText('375')).toBeInTheDocument();
    expect(screen.getByText('1,738')).toBeInTheDocument();
    expect(screen.getByText('~100')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
  });

  it('renders "Students Served" label (not "enrolled")', () => {
    render(<ImpactPage />);
    expect(screen.getByText('Students Served')).toBeInTheDocument();
    // The stat label must not say "enrolled"; the word may appear in body copy
    // but the ImpactCard label specifically must say "Students Served"
    expect(screen.queryByText(/^students enrolled$/i)).not.toBeInTheDocument();
  });

  it('renders "Individuals Trained" label (not "Educators Trained")', () => {
    render(<ImpactPage />);
    expect(screen.getByText('Individuals Trained')).toBeInTheDocument();
    // Regression guard: narrower label must not reappear
    expect(screen.queryByText('Educators Trained')).not.toBeInTheDocument();
  });

  it('renders the growth story with both confirmed historical dates', () => {
    render(<ImpactPage />);
    // Both endpoints of the growth story must be present
    expect(screen.getByText(/12 students/i)).toBeInTheDocument();
    expect(screen.getByText(/January 2019/i)).toBeInTheDocument();
    expect(screen.getByText(/375 students/i)).toBeInTheDocument();
    expect(screen.getByText(/January 2026/i)).toBeInTheDocument();
  });

  it('does not present the 375 figure as current live enrolment', () => {
    render(<ImpactPage />);
    // Must not say "currently enrolled" or "are enrolled today"
    expect(screen.queryByText(/currently enrolled|are enrolled today|live enrolment/i)).not.toBeInTheDocument();
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
