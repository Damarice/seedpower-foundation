import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import WomensEmpowermentPage from '@/app/(content)/what-we-do/womens-empowerment/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/womens-empowerment' }));

describe('WomensEmpowermentPage', () => {
  it('renders without error', () => {
    render(<WomensEmpowermentPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Women\'s Empowerment"', () => {
    render(<WomensEmpowermentPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Women's Empowerment");
  });

  it('renders the programme hero with a sewing-training photograph', () => {
    render(<WomensEmpowermentPage />);
    expect(
      screen.getByText(/Practical skills and community support/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'A woman works at a sewing machine during a skills session.',
      })
    ).toBeInTheDocument();
  });

  it('renders verified skills: Sewing, Basket Making, Entrepreneurship', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByText('Sewing')).toBeInTheDocument();
    expect(screen.getByText('Basket Making')).toBeInTheDocument();
    expect(screen.getByText('Entrepreneurship')).toBeInTheDocument();
  });

  it('mentions "nearly 100 women" without asserting a reporting period', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByText(/nearly 100 women/i)).toBeInTheDocument();
    // Must not contain invented year/period qualifiers
    expect(screen.queryByText(/in \d{4}|per year|annually/i)).not.toBeInTheDocument();
  });

  it('renders the community impact story about the house', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByText(/elderly woman.*house|house.*elderly woman/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'Community members work together while constructing a home.',
      })
    ).toBeInTheDocument();
  });

  it('renders Ruth Odero as programme lead', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByText(/Ruth Odero/i)).toBeInTheDocument();
  });

  it('renders "Together we are so much stronger"', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByText(/together we are so much stronger/i)).toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<WomensEmpowermentPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<WomensEmpowermentPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
