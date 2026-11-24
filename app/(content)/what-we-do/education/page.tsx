/**
 * Education Centers — /what-we-do/education
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (verbatim campus descriptions)
 *   - docs/research/full-website-discovery-report.md (page 4, 4a)
 *   - docs/research/content-verification-and-sitemap.md (page 4a)
 *
 * The combined figure of 375 students is presented as the total recorded
 * across both campuses; it is not stated as a live current enrolment.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import {
  ProgrammeImagePlaceholder,
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';

const campuses = [
  {
    id: 'oyugis',
    name: 'Oyugis Campus',
    established: 'January 2019',
    pupils: '220 pupils',
    location: 'Oyugis community, Kenya',
    imageLabel: 'Oyugis education campus photography placeholder',
    description:
      'SeedPower Education Center Oyugis Campus offers education to vulnerable children, children at risk, and children with special needs in the Oyugis community. SeedPower educates, equips, and empowers these children to become Godly leaders and agents of community transformation.',
  },
  {
    id: 'nyakach',
    name: 'Nyakach Campus',
    subtitle: 'Grinnell Family Campus',
    established: '2021',
    pupils: '155 pupils',
    location: 'Nyakach community, Kenya',
    imageLabel: 'Nyakach education campus photography placeholder',
    description:
      'SeedPower Education Center GF Campus was established in 2021 to offer education to vulnerable children, children at risk, and children with special needs in the Nyakach community.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Education Centers',
  description:
    'SeedPower Foundation operates two education campuses in Kenya — Oyugis (established 2019) and Nyakach (established 2021) — serving 375 vulnerable children and those with special needs.',
  alternates: { canonical: '/what-we-do/education' },
  openGraph: {
    title: 'Education Centers | SeedPower Foundation',
    description:
      'Two campuses in Kenya serving vulnerable children and those with special needs in Oyugis and Nyakach.',
    url: '/what-we-do/education',
    type: 'website',
  },
};

export default function EducationPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="education-heading"
        title="Education Centers"
        description="SeedPower’s campuses in Oyugis and Nyakach offer education to vulnerable children, children at risk, and children with special needs."
        imageLabel="SeedPower education campuses photography placeholder"
      />

      <Section background="white" aria-labelledby="campuses-heading">
        <Container>
          <div className="mb-10 flex flex-col gap-4 tablet:mb-12 tablet:flex-row tablet:items-end tablet:justify-between">
            <Heading
              variant="h2"
              id="campuses-heading"
              className="text-[var(--color-text-primary)]"
            >
              Our Campuses
            </Heading>
            <p className="mb-0 font-[var(--font-body)] text-[var(--color-text-secondary)]">
              <span className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-brand)]">
                375
              </span>{' '}
              pupils across both campuses
            </p>
          </div>

          <div className="space-y-12 tablet:space-y-16">
            {campuses.map((campus) => {
              const isReversed = campus.id === 'nyakach';

              return (
                <article
                  key={campus.id}
                  className="grid items-center gap-6 tablet:grid-cols-2 tablet:gap-10 desktop:gap-16"
                >
                  <ProgrammeImagePlaceholder
                    label={campus.imageLabel}
                    className={`relative aspect-[4/3] w-full rounded-[var(--radius-md)] ${
                      isReversed ? 'tablet:order-2' : ''
                    }`}
                  />
                  <div className={isReversed ? 'tablet:order-1' : ''}>
                    <Heading
                      variant="h3"
                      className="mb-1 text-[var(--color-brand)]"
                    >
                      {campus.name}
                    </Heading>
                    {'subtitle' in campus && (
                      <p className="mb-3 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                        {campus.subtitle}
                      </p>
                    )}
                    <dl className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 desktop:grid-cols-3">
                      <div>
                        <dt className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                          Established
                        </dt>
                        <dd className="font-[var(--font-body)] text-sm text-[var(--color-text-primary)]">
                          {campus.established}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                          Pupils
                        </dt>
                        <dd className="font-[var(--font-body)] text-sm text-[var(--color-text-primary)]">
                          {campus.pupils}
                        </dd>
                      </div>
                      <div className="col-span-2 desktop:col-span-1">
                        <dt className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                          Location
                        </dt>
                        <dd className="font-[var(--font-body)] text-sm text-[var(--color-text-primary)]">
                          {campus.location}
                        </dd>
                      </div>
                    </dl>
                    <Text
                      variant="body"
                      className="text-[var(--color-text-secondary)]"
                    >
                      {campus.description}
                    </Text>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="education-cta-heading"
        heading="Support Our Students"
        description="Your support helps provide quality education, resources, and opportunity to vulnerable children in Kenya."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
