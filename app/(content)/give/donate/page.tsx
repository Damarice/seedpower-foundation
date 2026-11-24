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
      <Section
        background="brand"
        aria-labelledby="donate-heading"
        className="py-10 tablet:py-12 desktop:py-14"
      >
        <Container>
          <div className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10">
            <div className="max-w-[680px]">
              <Heading
                variant="hero"
                id="donate-heading"
                className="mb-3 text-white"
              >
                Donate
              </Heading>
              <Text variant="body-lg" className="max-w-[620px] text-white/90">
                A cheerful giver will change the world in a special way.
              </Text>
            </div>
            <ExternalLink
              href="https://btgii.app.neoncrm.com/forms/seedpower"
              className={[
                'inline-flex min-h-[var(--touch-target-min)] shrink-0 items-center justify-center',
                'rounded-[var(--radius-sm)] bg-white px-6 py-3 text-base font-semibold text-[var(--color-brand)]',
                'no-underline transition-colors duration-[var(--transition-std)]',
                'hover:bg-white/90 active:bg-white/80',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                'focus-visible:outline-offset-[var(--focus-ring-offset)]',
              ].join(' ')}
              aria-label="Donate to SeedPower Foundation via our secure giving platform (opens in new tab)"
            >
              Donate Now
            </ExternalLink>
          </div>
        </Container>
      </Section>

      <Section background="white" aria-labelledby="why-donate-heading">
        <Container>
          <div className="grid gap-5 tablet:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] tablet:gap-10 desktop:gap-16">
            <Heading
              variant="h2"
              id="why-donate-heading"
              className="text-[var(--color-brand)]"
            >
              Your Gift Matters
            </Heading>
            <div className="max-w-[760px] space-y-4">
              <Text variant="body-lg" className="text-[var(--color-text-primary)]">
                Your generous gift will bring joy and purpose to the lives of
                vulnerable families and children at risk.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                Whether it&apos;s a one-time donation or a recurring monthly
                contribution, every amount counts. Even a small donation can make
                a big impact on a child&apos;s education and future.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                You may also consider a monthly gift to provide ongoing support
                for vulnerable families throughout the year.
              </Text>
              <div className="border-t border-[var(--color-border)] pt-5">
                <Heading
                  variant="h3"
                  id="donate-now-heading"
                  className="mb-2 text-[var(--color-brand)]"
                >
                  Make a Secure Donation
                </Heading>
                <Text
                  variant="body"
                  className="text-[var(--color-text-secondary)]"
                >
                  Donations are processed securely through SeedPower Foundation&apos;s
                  online giving platform. Click below to make your contribution.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="impact-tiers-heading">
        <Container>
          <div className="mb-8 max-w-[640px]">
            <Heading
              variant="h2"
              id="impact-tiers-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              Your Gift in Action
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-secondary)]"
            >
              Here are some examples of how donations support SeedPower&apos;s
              work.
            </Text>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-0 p-0 tablet:grid-cols-3">
            {donationTiers.map((tier) => (
              <li
                key={tier.amount}
                className="border-t border-[var(--color-border)] py-5 first:border-t-0 tablet:border-t-0 tablet:border-l tablet:pl-6 tablet:first:border-l-0 tablet:first:pl-0"
              >
                <p
                  className="font-[var(--font-heading)] font-bold
                             mb-2 text-[2.5rem] leading-none text-[var(--color-brand)]"
                >
                  {tier.amount}
                </p>
                <Text
                  variant="body"
                  className="max-w-[240px] text-[var(--color-text-secondary)]"
                >
                  {tier.description}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section background="soft" aria-labelledby="other-ways-donate-heading">
        <Container>
          <div className="grid gap-6 tablet:grid-cols-[minmax(0,1fr)_auto] tablet:items-center tablet:gap-10">
            <div className="max-w-[640px]">
              <Heading
                variant="h2"
                id="other-ways-donate-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Other Ways to Help
              </Heading>
              <Text
                variant="body-lg"
                className="text-[var(--color-text-secondary)]"
              >
                There are more ways to make a difference for children and
                communities in Kenya.
              </Text>
            </div>
            <div className="flex flex-col gap-3 tablet:flex-row tablet:flex-wrap">
              <ButtonLink
                href="/get-involved/sponsor-a-child"
                variant="ghost"
                size="default"
              >
                Sponsor a Child
              </ButtonLink>
              <ButtonLink
                href="/get-involved/volunteer"
                variant="ghost"
                size="default"
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
