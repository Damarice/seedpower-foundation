import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import FoodProjectPage from '@/app/(content)/what-we-do/food-project/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/food-project' }));

describe('FoodProjectPage', () => {
  it('renders without error', () => {
    render(<FoodProjectPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Sustainable Food Project"', () => {
    render(<FoodProjectPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Sustainable Food Project');
  });

  it('prominently shows "In Development" status', () => {
    render(<FoodProjectPage />);
    expect(screen.getByText(/in development/i)).toBeInTheDocument();
  });

  it('renders all four verified project components', () => {
    render(<FoodProjectPage />);
    expect(screen.getByText('Poultry Farming')).toBeInTheDocument();
    expect(screen.getByText('Aquaponics')).toBeInTheDocument();
    expect(screen.getByText('Regenerative Gardening')).toBeInTheDocument();
    expect(screen.getByText('Dairy Farming')).toBeInTheDocument();
  });

  it('does not claim the project is operational', () => {
    render(<FoodProjectPage />);
    // Must not imply current operation
    expect(screen.queryByText(/currently operational|is now running|has launched/i)).not.toBeInTheDocument();
  });

  it('does not invent a launch date', () => {
    render(<FoodProjectPage />);
    expect(screen.queryByText(/launching in|opens in|expected \d{4}/i)).not.toBeInTheDocument();
  });

  it('does not invent production statistics', () => {
    render(<FoodProjectPage />);
    // No invented metrics like "produces X kg" or "feeds X families"
    expect(screen.queryByText(/\d+ kg|\d+ families fed|\d+ meals/i)).not.toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<FoodProjectPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<FoodProjectPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
