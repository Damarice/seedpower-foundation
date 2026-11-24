/**
 * Tests for the Success Stories page — /impact/success-stories
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SuccessStoriesPage from '@/app/(content)/impact/success-stories/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/impact/success-stories' }));

describe('SuccessStoriesPage', () => {
  it('renders without error', () => {
    render(<SuccessStoriesPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Success Stories"', () => {
    render(<SuccessStoriesPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Success Stories');
  });

  it('renders the programme hero with its photo placeholder', () => {
    render(<SuccessStoriesPage />);
    expect(
      screen.getByRole('img', { name: 'Success stories photography placeholder' })
    ).toBeInTheDocument();
  });

  it('renders the verified first-month education milestone', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(
      screen.getByText(/students enrolled in the first month/i)
    ).toHaveTextContent(/January 2019/i);
  });

  it('omits the conflicting aggregate student total from the source', () => {
    render(<SuccessStoriesPage />);
    expect(screen.queryByText(/\b(?:350|375)\b/)).not.toBeInTheDocument();
  });

  it('renders water reach for each campus without combining different units', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByText('220 pupils')).toBeInTheDocument();
    expect(screen.getByText('Over 360 community members')).toBeInTheDocument();
    expect(screen.getByText('155 pupils')).toBeInTheDocument();
    expect(screen.getByText('290 families')).toBeInTheDocument();
  });

  it('renders documented programme outcomes without unverified timeframes', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByText('1,738')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('1,800')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
    expect(screen.getByText('59')).toBeInTheDocument();
    expect(screen.getByText(/July 2022/i)).toBeInTheDocument();
  });

  it('renders a gallery section heading', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Impact in Pictures' })).toBeInTheDocument();
  });

  it('renders gallery placeholders instead of broken image references', () => {
    render(<SuccessStoriesPage />);
    // All gallery items should be placeholder divs with role="img", not <img> elements
    const imgElements = document.querySelectorAll('img');
    // Any <img> tags present must NOT have empty or broken src attributes
    imgElements.forEach((img) => {
      expect(img.getAttribute('src')).not.toBe('');
      expect(img.getAttribute('src')).not.toBeNull();
    });
    // The gallery container should exist — check via aria-label directly
    const galleryContainer = document.querySelector('[aria-label="Photo gallery — images pending"]');
    expect(galleryContainer).not.toBeNull();
  });

  it('does not reference /public/images/ paths in gallery', () => {
    render(<SuccessStoriesPage />);
    // No <img> element should have a src pointing to /images/
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach((img) => {
      const src = img.getAttribute('src') ?? '';
      expect(src).not.toMatch(/^\/images\//);
    });
  });

  it('does not invent individual case studies or testimonials', () => {
    render(<SuccessStoriesPage />);
    // No invented names, quotes, or personal testimonials
    expect(screen.queryByText(/said|testified|shared|quote/i)).not.toBeInTheDocument();
  });

  it('does not display Turkana family figures', () => {
    render(<SuccessStoriesPage />);
    expect(screen.queryByText(/2,460|1,260|680/)).not.toBeInTheDocument();
  });

  it('renders donate CTA linking to /give/donate', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByRole('link', { name: /donate now/i })).toHaveAttribute('href', '/give/donate');
  });

  it('renders volunteer CTA linking to /get-involved/volunteer', () => {
    render(<SuccessStoriesPage />);
    expect(screen.getByRole('link', { name: /volunteer/i })).toHaveAttribute('href', '/get-involved/volunteer');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<SuccessStoriesPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
