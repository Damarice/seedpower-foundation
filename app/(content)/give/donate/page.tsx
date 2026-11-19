/**
 * Donate — /give/donate
 * 301 redirect from /ways-to-donate/donate/ is already live in next.config.ts.
 *
 * Content sourced from:
 *   - docs/content/page-ways-to-donate-donate.html (HTML snapshot, ID 949)
 *   - docs/research/full-website-discovery-report.md (page 16)
 *   - docs/research/content-verification-and-sitemap.md (page 16)
 *
 * Phase 6 boundary: This page provides donation information and links to
 * the external NeonCRM donation platform. It does NOT embed a donation form
 * or process payments. NeonCRM integration is a Phase 7 deliverable
 * (Architecture v1.2 Section 13, Phase 7: "NeonCRM donation form integration
 * on /give/donate").
 *
 * Donation impact tiers ($20/$40/$480) are taken verbatim from the source
 * and represent guidance on how donations are used — not guaranteed outcomes
 * or exchange-rate calculations.
 *
 * NeonCRM primary URL: https://btgii.app.neoncrm.com/forms/seedpower
 *   — confirmed in discovery report and all source pages.
 *
 * Architecture v1.2 — Sections 5.1, 7.2, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ExternalLink } from '@/components/primitives/ExternalLink';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support SeedPower Foundation\'s work in Kenya. Every donation, however small, helps vulnerable children access quality education and empowers communities.',
  alternates: { canonical: '/give/donate' },
  openGraph: {
    title: 'Donate | SeedPower Foundation',
    description:
      'Your generous gift brings joy and purpose to vulnerable families and children in Kenya. Donate to SeedPower Foundation today.',
    url: '/give/donate',
    type: 'website',
  },
};

/** Donation impact tiers — taken verbatim from page-ways-to-donate-donate.html */
const donationTiers = [
  { amount: '$20', description: 'Feed a child for a month.' },
  { amount: '$40', description: 'Send a child to school for a month.' },
  { amount: '$480', description: 'Send a child to school for a year.' },
] as const;

export default function DonatePage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="donate-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="donate-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Donate
          </Heading>
          {/* Source: "A cheerful giver will change the world in a special way" */}
          <Text
            variant="body-lg"
            className="font-semibold text-[var(--color-brand)]"
          >
            A cheerful giver will change the world in a special way.
          </Text>
        </Container>
      </Section>

      {/* Why donate */}
      <Section background="white" aria-labelledby="why-donate-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="why-donate-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Your Gift Matters
          </Heading>
          {/* Source: "Your generous gift will bring joy and purpose to the lives
              of the vulnerable families and children at risk." */}
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            Your generous gift will bring joy and purpose to the lives of
            vulnerable families and children at risk.
          </Text>
          {/* Source: "every amount counts; even a small donation can make
              a big impact" */}
          <Text variant="body" className="text-[var(--color-text-primary)] mb-4">
            Whether it&apos;s a one-time donation or a recurring monthly
            contribution, every amount counts. Even a small donation can make
            a big impact on a child&apos;s education and future.
          </Text>
          {/* Source: monthly giving option */}
          <Text variant="body" className="text-[var(--color-text-primary)]">
            You may also consider a monthly gift to provide ongoing support
            for vulnerable families throughout the year.
          </Text>
        </Container>
      </Section>

      {/* Donation impact tiers */}
      <Section background="warm" aria-labelledby="impact-tiers-heading">
        <Container>
          <Heading
            variant="h2"
            id="impact-tiers-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Your Gift in Action
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-8 max-w-[600px]"
          >
            Here are some examples of how donations support SeedPower&apos;s
            work.
          </Text>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 tablet:gap-6 max-w-[800px]">
            {donationTiers.map((tier) => (
              <div
                key={tier.amount}
                className="p-5 bg-[var(--color-bg-page)] rounded-[var(--radius-md)]
                           border border-[var(--color-border)] text-center"
              >
                <p
                  className="font-[var(--font-heading)] font-bold
                             text-[var(--color-brand)] text-[2rem] mb-2"
                >
                  {tier.amount}
                </p>
                <Text variant="body" className="text-[var(--color-text-primary)]">
                  {tier.description}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* NeonCRM external donation link */}
      <Section background="white" aria-labelledby="donate-now-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="donate-now-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Make a Secure Donation
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-6">
            Donations are processed securely through SeedPower Foundation&apos;s
            online giving platform. Click below to make your contribution.
          </Text>
          <ExternalLink
            href="https://btgii.app.neoncrm.com/forms/seedpower"
            className={[
              'inline-flex items-center justify-center',
              'rounded-[var(--radius-sm)]',
              'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
              'px-6 py-3 text-base font-semibold',
              'min-h-[var(--touch-target-min)]',
              'no-underline',
              'transition-colors duration-[var(--transition-std)]',
              'hover:bg-[var(--color-brand-hover)]',
              'active:bg-[var(--color-brand-active)]',
              'focus-visible:outline',
              'focus-visible:outline-[length:var(--focus-ring-width)]',
              'focus-visible:outline-[color:var(--focus-ring-color)]',
              'focus-visible:[outline-style:var(--focus-ring-style)]',
              'focus-visible:outline-offset-[var(--focus-ring-offset)]',
            ].join(' ')}
            aria-label="Donate to SeedPower Foundation via our secure giving platform (opens in new tab)"
          >
            Donate Now
          </ExternalLink>
        </Container>
      </Section>

      {/* Other ways */}
      <Section background="brand" aria-labelledby="other-ways-donate-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="other-ways-donate-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Other Ways to Help
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-on-brand)] max-w-prose"
            >
              There are more ways to make a difference for children and
              communities in Kenya.
            </Text>
            <div className="flex flex-col tablet:flex-row gap-3 justify-center">
              <ButtonLink
                href="/get-involved/sponsor-a-child"
                variant="ghost"
                size="default"
                className="border-white text-white hover:bg-white/10"
              >
                Sponsor a Child
              </ButtonLink>
              <ButtonLink
                href="/get-involved/volunteer"
                variant="ghost"
                size="default"
                className="border-white text-white hover:bg-white/10"
              >
                Volunteer
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
