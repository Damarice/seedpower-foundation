/**
 * Community Outreach — /what-we-do/community-outreach
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (activities verbatim)
 *   - docs/research/full-website-discovery-report.md (page 4, section 7)
 *   - docs/research/content-verification-and-sitemap.md (page 7)
 *
 * The "3,600 people reached" figure appears in source but has no confirmed
 * timeframe. Architecture v1.2 Section 5.3 marks its period as awaiting
 * client clarification. It is included with no timeframe asserted, matching
 * the source wording exactly ("a total of 3,600 people have been reached").
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
  title: 'Community Outreach',
  description:
    'SeedPower Foundation reaches out to disadvantaged families, teenagers, and children at risk through relief food programmes, hygiene support, child rights advocacy, and substance abuse prevention.',
  alternates: { canonical: '/what-we-do/community-outreach' },
  openGraph: {
    title: 'Community Outreach | SeedPower Foundation',
    description:
      'Relief food, hygiene support, child rights advocacy, and substance abuse prevention for communities in Nyakach and Oyugis, Kenya.',
    url: '/what-we-do/community-outreach',
    type: 'website',
  },
};

const activities = [
  {
    id: 'food',
    title: 'Relief Food Programmes',
    description:
      'SeedPower reaches out to disadvantaged families in the Nyakach and Oyugis communities through relief food programmes.',
  },
  {
    id: 'hygiene',
    title: 'Hygiene Supplies for Teenage Girls',
    description:
      'SeedPower reaches out to teenage girls in the community with hygiene supplies.',
  },
  {
    id: 'rights',
    title: 'Child Rights Advocacy',
    description:
      'SeedPower advocates for the rights of children at risk and children with special needs across the community.',
  },
  {
    id: 'substance',
    title: 'Substance Abuse Prevention',
    description:
      'SeedPower reaches out to teenage boys to train them against substance and drug abuse, which can lead to depression and crime.',
  },
];

export default function CommunityOutreachPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="community-outreach-heading"
        title="Community Outreach"
        description="Food assistance, hygiene supplies, child rights advocacy, and substance-abuse prevention in Nyakach and Oyugis."
        imageLabel="Community outreach programme photography placeholder"
        imageSrc="/images/programmes/turkana-relief-food-distribution.jpg"
        imageAlt="Community members receive food during an outreach in Turkana."
      />

      <Section background="white" aria-labelledby="activities-heading">
        <Container>
          <div className="grid items-start gap-8 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-16">
            <div>
              <p className="mb-3 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Programme reach
              </p>
              <p className="font-[var(--font-heading)] text-3xl font-bold leading-tight text-[var(--color-brand)] tablet:text-4xl">
                3,600 people have been reached
              </p>
            </div>
            <div>
              <Heading
                variant="h2"
                id="activities-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Community and family outreach
              </Heading>
              <Text
                variant="body-lg"
                className="mb-6 text-[var(--color-text-secondary)]"
              >
                SeedPower works with disadvantaged families, teenage girls,
                children at risk, and children with special needs through:
              </Text>
            </div>
          </div>

          <ol
            className="m-0 list-none p-0"
            aria-label="Community outreach activities"
          >
            {activities.map((activity, index) => (
              <li
                key={activity.id}
                className="grid gap-3 border-t border-[var(--color-border)] py-6 tablet:grid-cols-[60px_0.8fr_1.2fr] tablet:items-start tablet:gap-6 tablet:py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-[var(--font-heading)] text-sm font-bold text-[var(--color-brand)]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Heading variant="h3" className="text-[var(--color-text-primary)]">
                  {activity.title}
                </Heading>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  {activity.description}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="outreach-cta-heading"
        heading="Support Community Outreach"
        description="Your support helps SeedPower continue relief food programmes, hygiene support, and child rights advocacy in the community."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
