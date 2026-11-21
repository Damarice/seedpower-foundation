/**
 * Give — /give
 * Giving hub linking to Donate and Sponsor a Child pathways.
 * 301 redirects from /ways-to-donate/ and /ways-to-donate/online-fundraising/
 * are already live in next.config.ts.
 *
 * /give/events is a conditional page blocked by a client decision
 * (event status of the Indaba Gala 2026 is unconfirmed).
 * Architecture v1.2 Section 13: conditional pages built only when confirmed.
 * No link to /give/events is included here.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Give',
  description:
    'Support SeedPower Foundation\'s work in Kenya. Donate to fund education and community programmes, or sponsor a child\'s place at one of our campuses.',
  alternates: { canonical: '/give' },
  openGraph: {
    title: 'Give | SeedPower Foundation',
    description:
      'Donate or sponsor a child to support SeedPower Foundation\'s education and community programmes in Kenya.',
    url: '/give',
    type: 'website',
  },
};

export default function GivePage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="give-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="give-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Give
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            Your generosity makes a direct difference in the lives of
            vulnerable children and families in Kenya. There are several ways
            to support SeedPower Foundation&apos;s work.
          </Text>
        </Container>
      </Section>

      {/* Giving pathways */}
      <Section background="white" aria-labelledby="pathways-heading">
        <Container>
          <Heading
            variant="h2"
            id="pathways-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Ways to Give
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-10 tablet:mb-12 max-w-[600px]"
          >
            Choose the giving pathway that works best for you.
          </Text>

          {/* Three pathway cards in a horizontal grid at desktop */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 tablet:gap-8">

            {/* Donate */}
            <div
              className="p-6 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)]
                         flex flex-col gap-4"
            >
              <Heading variant="h3" className="text-[var(--color-brand)]">
                Donate
              </Heading>
              <Text variant="body" className="text-[var(--color-text-primary)] flex-1">
                Make a one-time or recurring donation to support education,
                community outreach, and other programmes. Every amount
                counts.
              </Text>
              <ButtonLink href="/give/donate" variant="primary" size="default">
                Donate Now
              </ButtonLink>
            </div>

            {/* Sponsor a Child */}
            <div
              className="p-6 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)]
                         flex flex-col gap-4"
            >
              <Heading variant="h3" className="text-[var(--color-brand)]">
                Sponsor a Child
              </Heading>
              <Text variant="body" className="text-[var(--color-text-primary)] flex-1">
                Support a child&apos;s access to education at one of
                SeedPower Foundation&apos;s campuses through the child
                sponsorship programme.
              </Text>
              <ButtonLink
                href="/get-involved/sponsor-a-child"
                variant="ghost"
                size="default"
                aria-label="Learn more about Sponsor a Child"
              >
                Learn More
              </ButtonLink>
            </div>

            {/* Events — conditional, not yet available */}
            <div
              className="p-5 border border-[var(--color-border)]
                         rounded-[var(--radius-md)] flex flex-col gap-3"
            >
              <Heading
                variant="h3"
                className="text-[var(--color-text-secondary)]"
              >
                Events
              </Heading>
              <Text variant="body-sm" className="text-[var(--color-text-secondary)] flex-1">
                SeedPower Foundation hosts fundraising events to support its
                programmes. Event details will be published here when confirmed.
              </Text>
            </div>

          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="give-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="give-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Make a Difference Today
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-on-brand)] max-w-prose"
            >
              Your support helps children in Kenya access quality education
              and empowers communities to build lasting self-reliance.
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
