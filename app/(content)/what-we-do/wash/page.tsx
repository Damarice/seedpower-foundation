/**
 * Water, Sanitation & Hygiene — /what-we-do/wash
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (campus figures verbatim)
 *   - docs/research/full-website-discovery-report.md (page 4, section 6)
 *   - docs/research/content-verification-and-sitemap.md (page 9)
 *
 * IMPORTANT: Oyugis figure is in individuals; Nyakach figure is in families.
 * These are presented separately — they are NEVER added together.
 * Architecture v1.2 Section 5.3 and Phase 6C scope verification confirm
 * this distinction must be preserved.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import {
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';

export const metadata: Metadata = {
  title: 'Water, Sanitation & Hygiene',
  description:
    'SeedPower Foundation provides clean water, sanitation facilities, and hygiene education at its campuses in Oyugis and Nyakach, Kenya.',
  alternates: { canonical: '/what-we-do/wash' },
  openGraph: {
    title: 'Water, Sanitation & Hygiene | SeedPower Foundation',
    description:
      'Clean water access, sanitation, and hygiene education at SeedPower campuses in Oyugis and Nyakach, Kenya.',
    url: '/what-we-do/wash',
    type: 'website',
  },
};

export default function WashPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="wash-heading"
        title="Water, Sanitation & Hygiene"
        description="Water access, sanitation facilities, and hygiene education at SeedPower’s Oyugis and Nyakach campuses."
        imageLabel="Water, sanitation, and hygiene programme photography placeholder"
        imageSrc="/images/programmes/water-storage-tanks.jpg"
        imageAlt="Water storage tanks on school grounds."
      />

      <Section background="white" aria-labelledby="campus-water-heading">
        <Container>
          <Heading
            variant="h2"
            id="campus-water-heading"
            className="mb-3 text-[var(--color-text-primary)]"
          >
            School and community water programme
          </Heading>
          <Text
            variant="body-lg"
            className="mb-8 max-w-[720px] text-[var(--color-text-secondary)] tablet:mb-10"
          >
            SeedPower provides water to both campuses and to their surrounding
            communities.
          </Text>

          <ul className="m-0 list-none p-0">
            <li className="grid gap-6 border-t border-[var(--color-border)] py-7 tablet:grid-cols-[0.8fr_1.2fr] tablet:items-center tablet:gap-10 tablet:py-9">
              <div>
                <Heading variant="h3" className="mb-2 text-[var(--color-brand)]">
                  Oyugis Campus
                </Heading>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  The project serves students at the campus and members of the
                  surrounding community.
                </Text>
              </div>
              <dl className="m-0 grid grid-cols-2 gap-5">
                <div className="border-l-2 border-[var(--color-brand)] pl-4">
                  <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                    Students served
                  </dt>
                  <dd className="m-0 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)]">
                    220
                  </dd>
                </div>
                <div className="border-l-2 border-[var(--color-brand)] pl-4">
                  <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                    Community members
                  </dt>
                  <dd className="m-0 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)]">
                    360
                  </dd>
                </div>
              </dl>
            </li>
            <li className="grid gap-6 border-t border-[var(--color-border)] py-7 tablet:grid-cols-[0.8fr_1.2fr] tablet:items-center tablet:gap-10 tablet:py-9">
              <div>
                <Heading variant="h3" className="mb-2 text-[var(--color-brand)]">
                  Nyakach Campus
                </Heading>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  The project serves students at the campus and families in
                  the surrounding community.
                </Text>
              </div>
              <dl className="m-0 grid grid-cols-2 gap-5">
                <div className="border-l-2 border-[var(--color-brand)] pl-4">
                  <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                    Students served
                  </dt>
                  <dd className="m-0 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)]">
                    155
                  </dd>
                </div>
                <div className="border-l-2 border-[var(--color-brand)] pl-4">
                  <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                    Community families
                  </dt>
                  <dd className="m-0 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)]">
                    290
                  </dd>
                </div>
              </dl>
            </li>
          </ul>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="hygiene-heading">
        <Container>
          <div className="grid gap-4 tablet:grid-cols-[0.8fr_1.2fr] tablet:gap-10">
            <Heading
              variant="h2"
              id="hygiene-heading"
              className="text-[var(--color-text-primary)]"
            >
              Hygiene education
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
              Alongside water access and sanitation facilities, SeedPower
              provides hygiene education at both campuses.
            </Text>
          </div>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="wash-cta-heading"
        heading="Support Clean Water Access"
        description="Your support helps sustain water access, sanitation, and hygiene education for students and surrounding communities."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
