/**
 * Footer — shared site footer.
 * Server Component (no 'use client' directive required — no state).
 *
 * Layout: 4-column grid on desktop; stacked accordion-style on mobile.
 * Background: var(--color-bg-dark) (#1a1a1a).
 * Tagline: "Exploit Potential. Eradicate Poverty." (confirmed from content discovery).
 * Copyright year: rendered dynamically via new Date().getFullYear().
 * Contact email: PENDING client confirmation — not hardcoded.
 * Social links: placeholder until client confirms handles/URLs.
 *
 * Architecture v1.2 — Section 4.2 (Footer.tsx).
 * Visual Design Direction v2.0 — Section 2.4.
 *
 * Routes are drawn exclusively from the verified route map (Architecture v1.2 — Section 5.1).
 */
import React from 'react';
import Link from 'next/link';
import { CopyrightYear } from '@/components/layout/CopyrightYear';

/* ── Link column data ─────────────────────────────────────── */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'What We Do',
    links: [
      { label: 'Education', href: '/what-we-do/education' },
      { label: "Women's Empowerment", href: '/what-we-do/womens-empowerment' },
      { label: 'Teacher Training', href: '/what-we-do/teacher-training' },
      { label: 'WASH', href: '/what-we-do/wash' },
      { label: 'Food Project', href: '/what-we-do/food-project' },
      { label: 'Community Outreach', href: '/what-we-do/community-outreach' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Sponsor a Child', href: '/get-involved/sponsor-a-child' },
      { label: 'Visit Your Child', href: '/get-involved/visit-your-child' },
    ],
  },
  {
    heading: 'Give',
    links: [
      { label: 'Donate', href: '/give/donate' },
      { label: 'Events', href: '/give/events' },
    ],
  },
];

/* ── Shared style constants ───────────────────────────────── */

const footerLinkClass = [
  'block no-underline leading-loose',
  'text-[length:var(--text-body-sm)] font-normal',
  'text-[var(--color-text-footer-secondary)]',
  'hover:text-[var(--color-text-on-dark)]',
  'transition-colors duration-[var(--transition-fast)]',
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-white',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

const columnHeadingClass = [
  'text-[13px] font-semibold uppercase',
  'tracking-[0.08em]',
  'text-[var(--color-text-on-dark)]',
  'mb-3',
].join(' ');

/* ── Footer component ─────────────────────────────────────── */

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-bg-dark)] text-[var(--color-text-footer-secondary)]"
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div
        className={[
          'mx-auto w-full',
          'px-[var(--container-padding-mobile)] tablet:px-[var(--container-padding-tablet)]',
          'max-w-[var(--container-max)]',
          'pt-12 pb-8',
        ].join(' ')}
      >
        <div className="grid grid-cols-1 desktop:grid-cols-4 gap-8 desktop:gap-12">
          {/* Column 1 — Logo, tagline, contact */}
          <div className="desktop:col-span-1">
            {/* Logo — text fallback until /public/images/logo-white.png is available */}
            <Link
              href="/"
              aria-label="SeedPower Foundation — home"
              className="inline-block no-underline text-[var(--color-text-on-dark)] font-semibold text-base mb-2"
            >
              SeedPower Foundation
            </Link>

            {/* Tagline — confirmed from content discovery */}
            <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-footer-secondary)] mt-2 mb-4">
              Exploit Potential. Eradicate Poverty.
            </p>

            {/* Contact block
                Email: PENDING client confirmation.
                Social icons: placeholder until client confirms handles/URLs.
                See Architecture v1.2 — Section 14 (outstanding client decisions). */}
            <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-footer-secondary)] italic">
              Contact details pending confirmation.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className={columnHeadingClass}>{col.heading}</h3>
              <ul className="space-y-1 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className={[
          'mx-auto w-full',
          'px-[var(--container-padding-mobile)] tablet:px-[var(--container-padding-tablet)]',
          'max-w-[var(--container-max)]',
          'pt-5 pb-6',
          'border-t border-white/10',
        ].join(' ')}
      >
        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-3">
          <p className="text-[13px] font-normal text-[var(--color-text-footer-secondary)]">
            © <CopyrightYear /> SeedPower Foundation · Registration SRD/KK/121731/2019
          </p>
          <nav aria-label="Footer legal links" className="flex gap-4">
            <Link
              href="/privacy-policy"
              className={footerLinkClass}
            >
              Privacy Policy
            </Link>
            <Link
              href="/sitemap"
              className={footerLinkClass}
            >
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
