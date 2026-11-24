/**
 * What We Do — /what-we-do
 * Programme hub page linking to all six confirmed sub-pages.
 *
 * Content sourced from:
 *   - docs/research/full-website-discovery-report.md (page 4)
 *   - docs/research/content-verification-and-sitemap.md (page 4)
 *   - docs/content/page-what-we-do.html
 *
 * Architecture v1.2 — Sections 2, 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ProgrammeCard } from '@/components/composite/ProgrammeCard';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'SeedPower Foundation works across six programme areas in Kenya — education, women\'s empowerment, teacher training, water and sanitation, sustainable food, and community outreach.',
  alternates: { canonical: '/what-we-do' },
  openGraph: {
    title: 'What We Do | SeedPower Foundation',
    description:
      'Explore SeedPower Foundation\'s six programme areas serving vulnerable children, women, and communities in Kenya.',
    url: '/what-we-do',
    type: 'website',
  },
};

const programmes = [
  {
    title: 'Education Centers',
    description:
      'Two campuses serving 375 vulnerable children and those with special needs in Oyugis (est. 2019) and Nyakach (est. 2021), Kenya.',
    stats: [{ label: '375 students' }, { label: 'Two campuses' }],
    href: '/what-we-do/education',
    imageSrc: '/images/programmes/programme-education-card.jpg',
    imageAlt: 'Two pupils read together in a classroom.',
  },
  {
    title: "Women's Empowerment",
    description:
      'Skills training in sewing, basket making, and entrepreneurship for nearly 100 women, strengthening households and building self-reliance.',
    stats: [{ label: '~100 women trained' }],
    href: '/what-we-do/womens-empowerment',
  },
  {
    title: 'Teacher Training',
    description:
      'Partnership with Little Light House USA has reached 1,738 individuals — including teachers, social workers, parents, and community leaders — across 47 Kenyan counties in special needs education.',
    stats: [{ label: '1,738 trained' }, { label: '47 counties' }],
    href: '/what-we-do/teacher-training',
  },
  {
    title: 'Water & Sanitation',
    description:
      'Clean water access, sanitation facilities, and hygiene education for students and community members at both campuses.',
    href: '/what-we-do/wash',
  },
  {
    title: 'Sustainable Food Project',
    description:
      'Poultry, aquaponics, regenerative gardening, and dairy farming to provide nutrition and agricultural skills training. Currently in development.',
    stats: [{ label: 'In development' }],
    href: '/what-we-do/food-project',
    imageSrc: '/images/programmes/regenerative-garden-field.jpg',
    imageAlt: 'Leafy vegetables growing in prepared garden beds.',
  },
  {
    title: 'Community Outreach',
    description:
      'Relief food distribution, hygiene supplies, child rights advocacy, and substance abuse prevention reaching disadvantaged families and youth.',
    href: '/what-we-do/community-outreach',
    imageSrc: '/images/programmes/outreach-food-distribution.jpg',
    imageAlt: 'A community member receives food during an outreach.',
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="what-we-do-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="what-we-do-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            What We Do
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            Improved and sustainable livelihoods of children, caregivers and
            vulnerable communities through environmentally sound interventions
            focusing on quality to promote positive change.
          </Text>
        </Container>
      </Section>

      {/* Programme grid */}
      <Section background="white" aria-labelledby="programmes-heading">
        <Container>
          <Heading
            variant="h2"
            id="programmes-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Our Programmes
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-10 tablet:mb-12 max-w-[600px]"
          >
            SeedPower works with the vulnerable and children with special
            needs, those at risk, and their families across six core programme
            areas.
          </Text>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 tablet:gap-8">
            {programmes.map((programme) => (
              <ProgrammeCard key={programme.href} {...programme} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
