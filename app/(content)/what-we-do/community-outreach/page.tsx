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
import { ButtonLink } from '@/components/ui/ButtonLink';

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
      'SeedPower reaches out to teenage girls in the community with hygiene supplies, supporting their health and dignity.',
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
      {/* Page header */}
      <Section background="soft" aria-labelledby="community-outreach-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="community-outreach-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Community Outreach
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation offers community and family outreach
            programmes that reach beyond the school campuses — addressing
            food insecurity, hygiene, child rights, and youth wellbeing in
            the Nyakach and Oyugis communities.
          </Text>
        </Container>
      </Section>

      {/* Activities */}
      <Section background="white" aria-labelledby="activities-heading">
        <Container>
          <Heading
            variant="h2"
            id="activities-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Our Activities
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-10 tablet:mb-12 max-w-[600px]"
          >
            Through this programme, a total of 3,600 people have been reached.
          </Text>
          <ol
            className="space-y-6 tablet:space-y-8 list-none p-0 m-0"
            aria-label="Community outreach activities"
          >
            {activities.map((activity, index) => (
              <li key={activity.id} className="flex gap-4 tablet:gap-6">
                {/* Number badge */}
                <div
                  className="flex-shrink-0 flex items-center justify-center
                             w-10 h-10 rounded-full
                             bg-[var(--color-brand)] text-[var(--color-text-on-brand)]
                             font-[var(--font-heading)] font-bold text-base mt-0.5"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Heading variant="h3" className="text-[var(--color-brand)] mb-2">
                    {activity.title}
                  </Heading>
                  <Text variant="body" className="text-[var(--color-text-primary)]">
                    {activity.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="outreach-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="outreach-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support Community Outreach
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps SeedPower reach more families and young
              people with food, hygiene, and advocacy across Kenya.
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
