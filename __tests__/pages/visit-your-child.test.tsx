/**
 * Tests for Visit Your Child — /get-involved/visit-your-child
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import VisitYourChildPage from '@/app/(content)/get-involved/visit-your-child/page';
import sitemap from '@/app/sitemap';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/get-involved/visit-your-child',
}));

describe('VisitYourChildPage', () => {
  it('renders the page heading and placeholder hero image', () => {
    render(<VisitYourChildPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Visit Your Child' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'Visit Your Child photography placeholder',
      })
    ).toBeInTheDocument();
  });

  it('clearly states that visit arrangements could not be verified', () => {
    render(<VisitYourChildPage />);
    expect(
      screen.getByText(/dates, eligibility, and visit arrangements are not available/i)
    ).toBeInTheDocument();
  });

  it('does not reuse unrelated placeholder events or lorem ipsum', () => {
    render(<VisitYourChildPage />);
    expect(screen.queryByText(/Cape Town|charity dinner|Lorem ipsum/i)).not.toBeInTheDocument();
  });

  it('links to the existing Contact route', () => {
    render(<VisitYourChildPage />);
    expect(
      screen.getByRole('link', { name: 'Contact SeedPower' })
    ).toHaveAttribute('href', '/contact');
  });

  it('includes the existing dropdown route in the sitemap', () => {
    expect(sitemap().map((entry) => entry.url)).toContain(
      'https://seedpowerfoundation.org/get-involved/visit-your-child'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<VisitYourChildPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
