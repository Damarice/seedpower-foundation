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
import { ButtonLink } from '@/components/ui/ButtonLink';

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
      {/* Page header */}
      <Section background="soft" aria-labelledby="teacher-training-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="teacher-training-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Teacher Training
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation, in partnership with Little Light House USA,
            conducts teacher development training focused on working with
            children with special needs. The programme reaches educators and
            community stakeholders across all 47 counties in Kenya.
          </Text>
        </Container>
      </Section>

      {/* Programme overview */}
      <Section background="white" aria-labelledby="programme-overview-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="programme-overview-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Programme Overview
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-6">
            A total of 1,738 individuals selected across the 47 counties in
            Kenya have been reached through this programme. Participants
            include:
          </Text>
          <ul className="space-y-3 list-none p-0 m-0 mb-6" aria-label="Participant categories">
            {participantCategories.map((category) => (
              <li key={category} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-brand)] mt-[0.6em] block"
                  aria-hidden="true"
                />
                <Text variant="body" className="text-[var(--color-text-primary)]">
                  {category}
                </Text>
              </li>
            ))}
          </ul>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            The focus is on special needs education methodology — equipping
            participants with the skills and knowledge to give every child,
            including those with special needs, access to holistic education.
          </Text>
        </Container>
      </Section>

      {/* January 2022 conference */}
      <Section background="warm" aria-labelledby="conference-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="conference-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            International Conference — January 2022
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            In partnership with Little Light House, SeedPower held its second
            International Conference on 6–7 January 2022 in Kisumu, Kenya.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)] mb-4">
            The conference was attended by 305 special needs and ECDE teachers
            from across the 47 counties in Kenya, along with social workers,
            parents of children with special needs, and community leaders from
            Kisumu and Homabay counties.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            When all teachers and education stakeholders are reached with
            information about the vulnerable and children with special needs,
            their attitude towards these children changes — and all children
            gain access to holistic education.
          </Text>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="teacher-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="teacher-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support Teacher Development
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps train more teachers and community leaders to
              serve children with special needs across Kenya.
            </Text>
            <ButtonLink
              href="/give/donate"
              variant="ghost"
              size="default"
              className="border-white text-white hover:bg-white/10"
            >
              Donate Now
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
