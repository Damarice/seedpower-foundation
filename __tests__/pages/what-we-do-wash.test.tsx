import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import WashPage from '@/app/(content)/what-we-do/wash/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/wash' }));

describe('WashPage', () => {
  it('renders without error', () => {
    render(<WashPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Water, Sanitation & Hygiene"', () => {
    render(<WashPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Water, Sanitation & Hygiene');
  });

  it('renders both campus H3 headings', () => {
    render(<WashPage />);
    expect(screen.getByRole('heading', { level: 3, name: 'Oyugis Campus' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Nyakach Campus' })).toBeInTheDocument();
  });

  it('renders Oyugis figures separately: 220 students, 360 community members', () => {
    render(<WashPage />);
    // Students (individuals)
    const studentDds = screen.getAllByText('220');
    expect(studentDds.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('360')).toBeInTheDocument();
    // Label clearly says "community members" (not families)
    const memberLabels = screen.getAllByText(/community members/i);
    expect(memberLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Nyakach figures separately: 155 students, 290 community families', () => {
    render(<WashPage />);
    const studentDds = screen.getAllByText('155');
    expect(studentDds.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('290')).toBeInTheDocument();
    // Label clearly says "community families" (not individuals) — units preserved
    expect(screen.getByText(/community families/i)).toBeInTheDocument();
  });

  it('does NOT present a single combined total of Oyugis and Nyakach community figures', () => {
    render(<WashPage />);
    // 360 community members + 290 families must never be summed as 650
    expect(screen.queryByText(/650/)).not.toBeInTheDocument();
    // Nor as "1,025" (the sum if families were treated as individuals)
    expect(screen.queryByText(/1,025/)).not.toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<WashPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<WashPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
