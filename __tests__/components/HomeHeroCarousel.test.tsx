import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { HomeHeroCarousel } from '@/components/sections/HomeHeroCarousel';

describe('HomeHeroCarousel', () => {
  it('renders the mission headline, description, CTA, and authentic hero image', () => {
    render(<HomeHeroCarousel />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every potential deserves a chance to shine.',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We empower vulnerable children, families and communities through education, opportunity and care.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Discover Our Mission' })
    ).toHaveAttribute('href', '/who-we-are');
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByText(/375|1,738/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'Pupils and staff gather for an outdoor school assembly.',
      })
    ).toBeInTheDocument();
  });

  it('navigates through all three slides with controls and keyboard arrows', () => {
    render(<HomeHeroCarousel />);

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Opening doors to brighter futures.',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We create inclusive learning opportunities that help children reach their full potential.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore Our Schools' })
    ).toHaveAttribute('href', '/what-we-do/education');
    expect(
      screen.getByRole('img', {
        name: 'Children in school uniforms play outdoors at school.',
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByText(/375|1,738|EDUCATION/i)).not.toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('region', { name: 'Homepage highlights' }), {
      key: 'ArrowRight',
    });
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Empowered people. Stronger communities.',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We equip individuals and communities with knowledge, opportunities and the support to create lasting change.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore Our Programmes' })
    ).toHaveAttribute('href', '/what-we-do');
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByText(/375|1,738|COMMUNITY/i)).not.toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('region', { name: 'Homepage highlights' }), {
      key: 'ArrowLeft',
    });
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Opening doors to brighter futures.',
      })
    ).toBeInTheDocument();
  });

  it('navigates directly with slide indicators', () => {
    render(<HomeHeroCarousel />);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Go to slide 3',
      })
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Empowered people. Stronger communities.',
      })
    ).toBeInTheDocument();
  });

  it('provides exactly three slides and three indicators', () => {
    render(<HomeHeroCarousel />);
    expect(screen.getByRole('group', { name: '1 of 3' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Go to slide/ })).toHaveLength(3);
  });

  it('automatically advances every five seconds and restarts the interval after manual navigation', () => {
    jest.useFakeTimers();
    render(<HomeHeroCarousel />);

    act(() => jest.advanceTimersByTime(4999));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every potential deserves a chance to shine.',
      })
    ).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Opening doors to brighter futures.',
      })
    ).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(4000));
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    act(() => jest.advanceTimersByTime(4999));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Empowered people. Stronger communities.',
      })
    ).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every potential deserves a chance to shine.',
      })
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('pauses autoplay while hovered or focused and resumes after interaction', () => {
    jest.useFakeTimers();
    render(<HomeHeroCarousel />);
    const carousel = screen.getByRole('region', { name: 'Homepage highlights' });

    fireEvent.mouseEnter(carousel);
    act(() => jest.advanceTimersByTime(5000));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every potential deserves a chance to shine.',
      })
    ).toBeInTheDocument();
    fireEvent.mouseLeave(carousel);
    act(() => jest.advanceTimersByTime(5000));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Opening doors to brighter futures.',
      })
    ).toBeInTheDocument();

    fireEvent.focus(carousel);
    act(() => jest.advanceTimersByTime(5000));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Opening doors to brighter futures.',
      })
    ).toBeInTheDocument();
    fireEvent.blur(carousel, { relatedTarget: document.body });
    act(() => jest.advanceTimersByTime(5000));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Empowered people. Stronger communities.',
      })
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('disables autoplay when reduced motion is requested', () => {
    jest.useFakeTimers();
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    render(<HomeHeroCarousel />);
    act(() => jest.advanceTimersByTime(10000));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every potential deserves a chance to shine.',
      })
    ).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
    jest.useRealTimers();
  });
});
