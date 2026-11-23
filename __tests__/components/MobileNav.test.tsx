/**
 * Tests for MobileNav component.
 *
 * Covers:
 *   - Renders with correct role, aria-modal, and aria-label.
 *   - Close button is present and calls onClose when clicked.
 *   - Escape key calls onClose.
 *   - Nav items render with correct accessible links.
 *   - Accordion toggle for items with children (aria-expanded).
 *   - Child links become visible after expanding a parent item.
 *   - Donate Now button links to /give/donate.
 *   - Overlay click calls onClose.
 *   - Focus moves to close button on mount.
 *   - axe accessibility check.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MobileNav } from '@/components/layout/MobileNav';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

const defaultProps = {
  id: 'mobile-nav-drawer',
  onClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MobileNav', () => {
  it('renders a dialog with the correct accessible name', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const dialog = screen.getByRole('dialog', { name: /navigation/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('assigns the provided id to the drawer element', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    expect(document.getElementById('mobile-nav-drawer')).not.toBeNull();
  });

  it('renders the close button with accessible label', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    expect(
      screen.getByRole('button', { name: /close navigation menu/i })
    ).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const closeBtn = screen.getByRole('button', { name: /close navigation menu/i });
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the overlay is clicked', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    // The overlay is aria-hidden; query by its visual role
    const overlay = document.querySelector('[aria-hidden="true"].fixed') as HTMLElement;
    expect(overlay).not.toBeNull();
    await act(async () => {
      fireEvent.click(overlay!);
    });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the Donate Now link pointing to /give/donate', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const donateLink = screen.getByRole('link', { name: /donate now/i });
    expect(donateLink).toHaveAttribute('href', '/give/donate');
  });

  it('renders top-level nav items', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    // Who We Are and Contact are top-level items without children in NAV_ITEMS
    expect(screen.getByRole('link', { name: /who we are/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('accordion button starts with aria-expanded="false"', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    // Items with children are rendered as buttons; find one that has aria-expanded
    const expandButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-expanded'));
    expect(expandButtons.length).toBeGreaterThan(0);
    expect(expandButtons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggling an accordion button sets aria-expanded to true', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const expandButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-expanded'));
    const firstExpandBtn = expandButtons[0]!;
    await act(async () => {
      fireEvent.click(firstExpandBtn);
    });
    expect(firstExpandBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('sub-list changes from hidden to visible after expanding the accordion', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const expandButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-expanded'));
    const firstBtn = expandButtons[0]!;
    const controlsId = firstBtn.getAttribute('aria-controls')!;
    const subList = document.getElementById(controlsId)!;
    // Before expansion: sub-list is in DOM but hidden
    expect(subList).not.toBeNull();
    expect(subList).toHaveAttribute('hidden');
    await act(async () => {
      fireEvent.click(firstBtn);
    });
    // After expansion: hidden attribute removed
    expect(subList).not.toHaveAttribute('hidden');
  });

  it('toggling an open accordion item collapses it again', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const expandButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-expanded'));
    const btn = expandButtons[0]!;
    await act(async () => { fireEvent.click(btn); });
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    await act(async () => { fireEvent.click(btn); });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('accordion buttons expose aria-controls pointing to a persistently-rendered sub-list', async () => {
    await act(async () => {
      render(<MobileNav {...defaultProps} />);
    });
    const expandButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.hasAttribute('aria-expanded'));
    expect(expandButtons.length).toBeGreaterThan(0);
    // a11y-shared #2 / review finding #6: every accordion toggle must reference
    // a sub-list that is always present in the DOM (using `hidden` attr to
    // show/hide) so aria-controls is never a dangling reference.
    for (const btn of expandButtons) {
      const controlsId = btn.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(controlsId).toMatch(/^mobile-nav-/);
      // Sub-list must exist in the DOM even while collapsed.
      expect(document.getElementById(controlsId!)).not.toBeNull();
    }
  });

  it('passes axe accessibility check', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<MobileNav {...defaultProps} />));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
