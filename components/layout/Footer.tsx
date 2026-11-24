/**
 * Footer — shared site footer.
 */
import Link from 'next/link';
import { CopyrightYear } from '@/components/layout/CopyrightYear';

const QUICK_LINKS = [
  { label: 'About Us', href: '/who-we-are' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Stories of Change', href: '/impact/success-stories' },
  { label: 'Get Involved', href: '/get-involved/volunteer' },
  { label: 'Donate', href: '/give/donate' },
  { label: 'Contact Us', href: '/contact' },
];

const PROGRAMME_LINKS = [
  { label: 'Education', href: '/what-we-do/education' },
  { label: "Women's Empowerment", href: '/what-we-do/womens-empowerment' },
  { label: 'Teacher Training', href: '/what-we-do/teacher-training' },
  { label: 'Water & Sanitation', href: '/what-we-do/wash' },
  { label: 'Sustainable Food Project', href: '/what-we-do/food-project' },
  { label: 'Community Outreach', href: '/what-we-do/community-outreach' },
];

const footerLinkClass = [
  'inline-flex min-h-11 items-center py-1',
  'text-[length:var(--text-body-sm)] font-normal leading-snug',
  'text-[var(--color-text-footer-secondary)]',
  'transition-colors duration-[var(--transition-fast)]',
  'hover:text-[var(--color-text-on-dark)]',
  'focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-white focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

const columnHeadingClass = [
  'mb-3 text-[13px] font-semibold uppercase tracking-[0.08em]',
  'text-[var(--color-text-on-dark)]',
].join(' ');

function FacebookIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-bg-dark)] text-[var(--color-text-footer-secondary)]"
      aria-label="Site footer"
    >
      <div
        className={[
          'mx-auto w-full max-w-[var(--container-max)]',
          'px-[var(--container-padding-mobile)] tablet:px-[var(--container-padding-tablet)]',
          'py-10 tablet:py-12',
        ].join(' ')}
      >
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-x-10 tablet:gap-y-9 desktop:grid-cols-[1.4fr_0.85fr_1.1fr_1.15fr] desktop:gap-8">
          <div className="desktop:pr-4">
            <Link
              href="/"
              aria-label="SeedPower Foundation — home"
              className="mb-4 inline-flex min-h-11 items-center font-[var(--font-heading)] text-lg font-bold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              SeedPower Foundation
            </Link>
            <h2 className="mb-2 font-[var(--font-heading)] text-base font-semibold text-white">
              Exploring Potential
            </h2>
            <p className="max-w-[360px] text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-text-footer-secondary)]">
              Educating, equipping and empowering the vulnerable, children with
              special needs, and those at risk to become Godly leaders and
              agents of community transformation.
            </p>
          </div>

          <nav aria-label="Quick links">
            <h2 className={columnHeadingClass}>Explore</h2>
            <ul className="m-0 list-none space-y-0 p-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our programmes">
            <h2 className={columnHeadingClass}>Our Programmes</h2>
            <ul className="m-0 list-none space-y-0 p-0">
              {PROGRAMME_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className={columnHeadingClass}>Contact Us</h2>
            <ul className="m-0 list-none space-y-0 p-0">
              <li>
                <a href="tel:+254758585750" className={footerLinkClass}>
                  +254 758 585750
                </a>
              </li>
              <li>
                <a href="mailto:seedpf2019@gmail.com" className={footerLinkClass}>
                  seedpf2019@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:seedpowerfoundation@gmail.com"
                  className={footerLinkClass}
                >
                  seedpowerfoundation@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/seedpoweredfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SeedPower Foundation on Facebook (opens in a new tab)"
                  className={`${footerLinkClass} gap-2`}
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div
          className={[
            'mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-2',
            'px-[var(--container-padding-mobile)] py-5',
            'tablet:px-[var(--container-padding-tablet)] desktop:flex-row desktop:items-center desktop:justify-between',
          ].join(' ')}
        >
          <p className="text-[13px] leading-relaxed text-[var(--color-text-footer-secondary)]">
            © <CopyrightYear /> SeedPower Foundation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
