/**
 * Teacher Training — /what-we-do/teacher-training
 * 301 redirect from /what-we-do/teacher-outreach-training/ is already live.
 *
 * Content sourced from:
 *   - docs/content/page-outreach-programs.html (conference details verbatim)
 *   - docs/content/page-what-we-do.html (1,738 figure and categories)
 *   - docs/research/full-website-discovery-report.md (pages 5, 6)
 *   - docs/research/content-verification-and-sitemap.md (page 6)
 *
 * The 1,738 figure covers multiple participant categories (not only teachers).
 * No date range for the cumulative total is provided — not stated in source.
 * The January 2022 conference date is stated explicitly as confirmed.
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

export const metadata: Metadata = {
  title: 'Teacher Training',
  description:
    'SeedPower Foundation, in partnership with Little Light House USA, trains teachers, social workers, and community leaders across Kenya in special needs education methodology.',
  alternates: { canonical: '/what-we-do/teacher-training' },
  openGraph: {
    title: 'Teacher Training | SeedPower Foundation',
    description:
      'Equipping teachers, social workers, and community leaders across 47 Kenyan counties with special needs education methodology.',
    url: '/what-we-do/teacher-training',
    type: 'website',
  },
};

/** Participant categories from source verbatim */
const participantCategories = [
  'Special Needs and ECDE teachers',
  'Social workers',
  'Parents of children with special needs',
  'Community leaders',
  'Community-based organisations (CBOs)',
];

export default function TeacherTrainingPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="teacher-training-heading"
        title="Teacher Training"
        description="In partnership with Little Light House USA, SeedPower trains teachers and community stakeholders in special needs education across Kenya."
        imageLabel="Teacher training programme photography placeholder"
        imageSrc="/images/programmes/teacher-outreach-training-conference.jpg"
        imageAlt="Participants attend the SeedPower teacher outreach and training conference."
      />

      <Section background="white" aria-labelledby="reach-heading">
        <Container>
          <div className="grid items-start gap-8 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-16">
            <div>
              <p className="mb-3 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Programme reach
              </p>
              <p className="mb-2 font-[var(--font-heading)] text-5xl font-bold leading-none text-[var(--color-brand)] tablet:text-6xl">
                1,738
              </p>
              <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
                individuals reached across all 47 counties in Kenya
              </Text>
            </div>
            <div>
              <Heading
                variant="h2"
                id="reach-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                Who the training reaches
              </Heading>
              <ul
                className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 tablet:grid-cols-2"
                aria-label="Teacher training participant categories"
              >
                {participantCategories.map((category) => (
                  <li
                    key={category}
                    className="flex items-start gap-3 border-t border-[var(--color-border)] py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                    />
                    <Text variant="body-sm" className="text-[var(--color-text-primary)]">
                      {category}
                    </Text>
                  </li>
                ))}
              </ul>
              <Text
                variant="body"
                className="mt-5 max-w-[720px] text-[var(--color-text-secondary)]"
              >
                The training focuses on special needs education methodology,
                equipping participants to support holistic education for all
                children.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="conference-heading">
        <Container>
          <div className="grid items-center gap-8 tablet:grid-cols-2 desktop:gap-16">
            <ProgrammeImagePlaceholder
              label="Teacher conference photography placeholder"
              imageSrc="/images/programmes/teacher-conference-activity.jpg"
              imageAlt="Participants work through an activity at a teacher-development conference."
              imageSizes="(max-width: 767px) 100vw, 50vw"
              className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
            />
            <div>
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Kisumu, Kenya
              </p>
              <Heading
                variant="h2"
                id="conference-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                International Conference — January 2022
              </Heading>
              <Text
                variant="body-lg"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                In partnership with Little Light House, SeedPower held its
                second International Conference on 6–7 January 2022.
              </Text>
              <Text
                variant="body"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                It was attended by 305 special needs and ECDE teachers from
                across Kenya&apos;s 47 counties, as well as social workers,
                parents of children with special needs, and community leaders
                from Kisumu and Homabay counties.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                The conference focused on helping education stakeholders
                support vulnerable children and children with special needs.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="teacher-cta-heading"
        heading="Support Teacher Development"
        description="Your support helps train more teachers and community leaders to serve children with special needs across Kenya."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
