import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TeacherTrainingPage from '@/app/(content)/what-we-do/teacher-training/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/teacher-training' }));

describe('TeacherTrainingPage', () => {
  it('renders without error', () => {
    render(<TeacherTrainingPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Teacher Training"', () => {
    render(<TeacherTrainingPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Teacher Training');
  });

  it('renders the programme hero with its photo placeholder', () => {
    render(<TeacherTrainingPage />);
    expect(
      screen.getByRole('img', {
        name: 'Teacher training programme photography placeholder',
      })
    ).toBeInTheDocument();
  });

  it('mentions Little Light House USA partnership', () => {
    render(<TeacherTrainingPage />);
    const els = screen.getAllByText(/Little Light House/i);
    expect(els.length).toBeGreaterThanOrEqual(1);
  });

  it('shows 1,738 figure without calling them all teachers', () => {
    render(<TeacherTrainingPage />);
    expect(screen.getByText(/1,738/)).toBeInTheDocument();
    // The page must describe multiple participant types, not just teachers
    const socialWorkers = screen.getAllByText(/Social workers/i);
    expect(socialWorkers.length).toBeGreaterThanOrEqual(1);
    const communityLeaders = screen.getAllByText(/Community leaders/i);
    expect(communityLeaders.length).toBeGreaterThanOrEqual(1);
  });

  it('shows all participant categories', () => {
    render(<TeacherTrainingPage />);
    const ecde = screen.getAllByText(/ECDE/i);
    expect(ecde.length).toBeGreaterThanOrEqual(1);
    const social = screen.getAllByText(/Social workers/i);
    expect(social.length).toBeGreaterThanOrEqual(1);
    const parents = screen.getAllByText(/Parents of children with special needs/i);
    expect(parents.length).toBeGreaterThanOrEqual(1);
    const leaders = screen.getAllByText(/Community leaders/i);
    expect(leaders.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Community-based organisations/i)).toBeInTheDocument();
  });

  it('shows 47 counties scope', () => {
    render(<TeacherTrainingPage />);
    const els = screen.getAllByText(/47 counties/i);
    expect(els.length).toBeGreaterThanOrEqual(1);
  });

  it('shows the confirmed January 2022 conference date', () => {
    render(<TeacherTrainingPage />);
    // The heading "International Conference — January 2022" contains the date
    expect(screen.getByRole('heading', { name: /January 2022/i })).toBeInTheDocument();
    expect(screen.getByText(/305/)).toBeInTheDocument();
  });

  it('does not invent a date range for the cumulative 1,738 figure', () => {
    render(<TeacherTrainingPage />);
    // Page should not claim e.g. "since 2019" or "over 5 years" for this figure
    expect(screen.queryByText(/since \d{4}.*1,738|1,738.*since \d{4}/i)).not.toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<TeacherTrainingPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<TeacherTrainingPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
