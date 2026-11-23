import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Header } from '@/components/layout/Header';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders without error', async () => {
    await act(async () => {
      render(<Header />);
    });
    // Header element is present
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  it('keeps the header in normal document flow', async () => {
    await act(async () => {
      render(<Header />);
    });
    const header = document.querySelector('header');
    expect(header?.className).not.toMatch(/\b(sticky|fixed)\b/);
  });

  it('logo links to /', async () => {
    await act(async () => {
      render(<Header />);
    });
    const logoLink = screen.getByRole('link', { name: /seedpower foundation.*home/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('desktop nav links are present with correct hrefs', async () => {
    await act(async () => {
      render(<Header />);
    });
    // Top-level nav links rendered inside Navigation
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /who we are/i })).toHaveAttribute('href', '/who-we-are');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
  });

  it('renders Donate button linking to /give/donate', async () => {
    await act(async () => {
      render(<Header />);
    });
    // The Donate ButtonLink renders an <a>; find by its text
    const donateLinks = screen.getAllByRole('link', { name: /donate/i });
    // The header may have a ButtonLink + potentially the drawer, but at least one points to /give/donate
    const donateLink = donateLinks.find((el) => el.getAttribute('href') === '/give/donate');
    expect(donateLink).toBeDefined();
  });

  it('hamburger button is present', async () => {
    await act(async () => {
      render(<Header />);
    });
    expect(
      screen.getByRole('button', { name: /open navigation menu/i })
    ).toBeInTheDocument();
  });

  it('hamburger button has aria-expanded=false initially', async () => {
    await act(async () => {
      render(<Header />);
    });
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('mobile drawer opens on hamburger click', async () => {
    await act(async () => {
      render(<Header />);
    });
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    await act(async () => {
      fireEvent.click(hamburger);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('mobile drawer has role="dialog" and aria-modal="true"', async () => {
    await act(async () => {
      render(<Header />);
    });
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    await act(async () => {
      fireEvent.click(hamburger);
    });
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveAttribute('aria-modal', 'true');
  });

  it('mobile drawer closes on Escape key', async () => {
    await act(async () => {
      render(<Header />);
    });
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    await act(async () => {
      fireEvent.click(hamburger);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('desktop dropdown triggers use aria-haspopup="menu"', async () => {
    await act(async () => {
      render(<Header />);
    });
    // a11y-shared #4: dropdown triggers declare aria-haspopup="menu" (not "true").
    const triggers = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-haspopup'));
    expect(triggers.length).toBeGreaterThan(0);
    for (const trigger of triggers) {
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    }
  });

  it('passes axe accessibility check', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<Header />));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
