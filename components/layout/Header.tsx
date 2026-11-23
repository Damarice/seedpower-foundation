'use client';

/**
 * Header — normal-flow site navigation.
 *
 * Heights: 56px mobile (h-[var(--nav-height-mobile)]),
 *          64px desktop (desktop:h-[var(--nav-height-desktop)]).
 * Background: var(--color-bg-page) (#ffffff).
 * Bottom border: 1px solid var(--color-border).
 * The header remains in normal document flow and scrolls with the page.
 *
 * Logo: text fallback "SeedPower Foundation" until image asset is available.
 * Donate button: ButtonLink variant primary → /give/donate.
 * Hamburger: visible below desktop (< 1024px); toggles MobileNav drawer.
 *
 * Architecture v1.2 — Section 4.2 (Header.tsx).
 * Visual Design Direction v2.0 — Section 2.1.
 */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Navigation } from '@/components/layout/Navigation';
import { MobileNav } from '@/components/layout/MobileNav';

const focusRing = [
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-[color:var(--focus-ring-color)]',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close drawer when resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileNavOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openMobileNav = () => setMobileNavOpen(true);

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      <header
        className={[
          'bg-[var(--color-bg-page)]',
          'border-b border-[var(--color-border)]',
          'h-[var(--nav-height-mobile)] desktop:h-[var(--nav-height-desktop)]',
          'flex items-center',
        ].join(' ')}
      >
        <div
          className={[
            'w-full',
            'px-[var(--container-padding-mobile)] tablet:px-[var(--container-padding-tablet)]',
            'max-w-[var(--container-max)] mx-auto',
            'flex items-center justify-between',
          ].join(' ')}
        >
          {/* Logo — text fallback until /public/images/logo-green.png is available */}
          <Link
            href="/"
            aria-label="SeedPower Foundation — home"
            className="flex-shrink-0 no-underline text-[var(--color-brand)] font-semibold text-base"
          >
            SeedPower Foundation
          </Link>

          {/* Desktop navigation — hidden below 1024px */}
          <div className="hidden desktop:flex items-center flex-1 justify-center">
            <Navigation />
          </div>

          {/* Right side: Donate button + hamburger */}
          <div className="flex items-center gap-4">
            {/* Donate button — hidden on mobile, visible at tablet and above */}
            <div className="hidden tablet:block">
              <ButtonLink href="/give/donate" variant="primary" size="sm">
                Donate
              </ButtonLink>
            </div>

            {/* Hamburger — visible below desktop */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={openMobileNav}
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-drawer"
              className={[
                'desktop:hidden',
                'w-11 h-11 flex items-center justify-center',
                'rounded-[var(--radius-sm)]',
                focusRing,
              ].join(' ')}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer rendered outside header so it covers the full viewport */}
      {mobileNavOpen && (
        <MobileNav id="mobile-nav-drawer" onClose={closeMobileNav} />
      )}
    </>
  );
}
