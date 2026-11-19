/**
 * Impact Overview — /impact
 * 301 redirect from /contact/news/ → /impact is already live in next.config.ts.
 *
 * Content sourced from:
 *   - docs/research/full-website-discovery-report.md (pages 2, 4, 14)
 *   - docs/research/content-verification-and-sitemap.md (pages 2, 11)
 *   - docs/content/page-contact-news-success-stories.html
 *
 * Statistics: same four confirmed figures as the homepage.
 * Growth story: "12 students (first month 2019) → 375 students (January 2026)"
 *   — presented as a documented historical milestone, not a live enrolment claim.
 *
 * Excluded (Architecture v1.2 Section 5.3 / Phase 6D scope):
 *   - Turkana family figures (all three conflicting numbers)
 *   - 3,600 community outreach figure (timeframe unconfirmed)
 *   - 1,738 figure date range (period not stated in source)
 *   - Any individual case studies (none exist in discovery documentation)
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ImpactCard } from '@/components/composite/ImpactCard';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'SeedPower Foundation has grown from 12 students in 2019 to serving 375 students across two campuses, reaching 1,738 individuals — including teachers, social workers, parents, and community leaders — across 47 counties, and empowering nearly 100 women in Kenya.',
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Our Impact | SeedPower Foundation',
    description:
      'From 12 students in 2019 to 375 by January 2026 — discover the documented impact of SeedPower Foundation in Kenya.',
    url: '/impact',
    type: 'website',
  },
};

/**
 * Four confirmed impact statistics.
 * Source: Architecture v1.2 Section 13 (Phase 5) confirmed figures list.
 * Same figures used on the homepage ImpactStatsSection.
 */
const stats = [
  { figure: '375', label: 'Students Served' },
  { figure: '1,738', label: 'Individuals Trained' },
  { figure: '~100', label: 'Women Trained' },
  { figure: '2018', label: 'Year Founded' },
];

export default function ImpactPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="impact-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="impact-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Our Impact
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            Since SeedPower Foundation was established in 2018, its programmes
            have reached hundreds of children, educators, and women across
            Kenya. The figures below reflect confirmed data from programme
            documentation.
          </Text>
        </Container>
      </Section>

      {/* Confirmed impact statistics */}
      <Section background="warm" aria-label="Impact statistics">
        <Container>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6 tablet:gap-8">
            {stats.map((stat) => (
              <ImpactCard key={stat.label} figure={stat.figure} label={stat.label} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Growth story */}
      <Section background="white" aria-labelledby="growth-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="growth-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Seven Years of Growth
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            When SeedPower Foundation opened its first education centre in
            Oyugis in January 2019, 12 students enrolled in that first month.
            By January 2026, that number had grown to 375 students across two
            campuses — a documented growth of more than thirty-fold over seven
            years.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)] mb-6">
            Each student represents a child who was vulnerable, at risk, or had
            special needs — and who received quality education, equipping
            them to reach their full potential and become agents of community
            transformation.
          </Text>
          <ButtonLink href="/impact/success-stories" variant="ghost" size="default">
            Read the Stories
          </ButtonLink>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="impact-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="impact-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Be Part of the Story
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps SeedPower Foundation continue to grow its
              reach and deepen its impact for vulnerable communities in Kenya.
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
