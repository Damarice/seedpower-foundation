import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EducationPage from '@/app/(content)/what-we-do/education/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do/education' }));

describe('EducationPage', () => {
  it('renders without error', () => {
    render(<EducationPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Education Centers"', () => {
    render(<EducationPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Education Centers');
  });

  it('renders both campus H3 headings', () => {
    render(<EducationPage />);
    expect(screen.getByRole('heading', { level: 3, name: 'Oyugis Campus' })).toBeInTheDocument();
    // Nyakach heading contains "Nyakach Campus" with subtitle
    expect(screen.getByText(/Nyakach Campus/)).toBeInTheDocument();
  });

  it('renders verified Oyugis figures', () => {
    render(<EducationPage />);
    expect(screen.getByText('January 2019')).toBeInTheDocument();
    expect(screen.getByText('220 pupils')).toBeInTheDocument();
  });

  it('renders verified Nyakach figures', () => {
    render(<EducationPage />);
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('155 pupils')).toBeInTheDocument();
  });

  it('mentions 375 students as combined total', () => {
    render(<EducationPage />);
    expect(screen.getByText(/375 students/i)).toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<EducationPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('does not display Turkana figures', () => {
    render(<EducationPage />);
    expect(screen.queryByText(/2,460|1,260|680/)).not.toBeInTheDocument();
  });

  it('announces the Nyakach heading as "Nyakach Campus" with the subtitle separate', () => {
    render(<EducationPage />);
    // a11y-content F-4: subtitle moved outside the <h3> so the heading's
    // accessible name is the campus name only.
    expect(
      screen.getByRole('heading', { level: 3, name: 'Nyakach Campus' })
    ).toBeInTheDocument();
    expect(screen.getByText('Grinnell Family Campus')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<EducationPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
