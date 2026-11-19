/**
 * Sponsor a Child — /get-involved/sponsor-a-child
 * 301 redirect from /sponsor-a-child/ → /get-involved/sponsor-a-child/
 * is already live in next.config.ts.
 *
 * Content sourced from:
 *   - docs/content/page-sponsor-a-child.html (HTML snapshot, ID 981)
 *   - docs/research/full-website-discovery-report.md (page 15)
 *   - docs/research/content-verification-and-sitemap.md (page 13)
 *
 * Architecture v1.2 Section 5.1 scope: "Intro + link to GOBGI portal."
 *
 * GOBGI portal URL: http://www.gobgi.org/seedpowerkenya/
 *   — confirmed in discovery report and HTML snapshot.
 *   — no claim is made about its current status or availability.
 *
 * Content restrictions applied (Phase 6E scope):
 *   - No individual child names, profiles, or sponsorship amounts invented.
 *   - No photographs of children referenced (no assets in /public/images/).
 *   - 375 students presented as the January 2026 historical milestone.
 *   - No claim that GOBGI portal is currently active or accepting applications.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ExternalLink } from '@/components/primitives/ExternalLink';

export const metadata: Metadata = {
  title: 'Sponsor a Child',
  description:
    'Support a child\'s education through SeedPower Foundation\'s sponsorship programme. Every donation, however small, helps vulnerable children in Kenya access quality education.',
  alternates: { canonical: '/get-involved/sponsor-a-child' },
  openGraph: {
    title: 'Sponsor a Child | SeedPower Foundation',
    description:
      'Help a vulnerable child in Kenya access quality education through SeedPower Foundation\'s sponsorship programme.',
    url: '/get-involved/sponsor-a-child',
    type: 'website',
  },
};

export default function SponsorAChildPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="sponsor-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="sponsor-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Sponsor a Child
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            Your support means a lot. Through SeedPower Foundation&apos;s
            child sponsorship programme, you can directly support a child&apos;s
            access to education — giving them the resources and opportunity
            they need to reach their full potential.
          </Text>
        </Container>
      </Section>

      {/* Programme context */}
      <Section background="white" aria-labelledby="programme-context-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="programme-context-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Education for Vulnerable Children
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            SeedPower Foundation operates two education campuses in Kenya,
            serving children who are vulnerable, at risk, or have special
            needs. As of January 2026, the two campuses had enrolled 375
            students in total — a milestone that reflects years of community
            investment and donor support.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            Each donation matters. Even the smallest contribution reaches
            these children and helps them access quality education. Sponsorship
            supports a child&apos;s place at one of the campuses, contributing
            to the costs of their education, materials, and development.
          </Text>
        </Container>
      </Section>

      {/* GOBGI portal CTA */}
      <Section background="warm" aria-labelledby="sponsorship-portal-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="sponsorship-portal-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Start Sponsoring
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-6">
            Child sponsorship is managed through SeedPower Foundation&apos;s
            sponsorship portal. Visit the portal to find out how to sponsor
            a child and begin the application process.
          </Text>
          <ExternalLink
            href="http://www.gobgi.org/seedpowerkenya/"
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
            aria-label="Visit the SeedPower Foundation child sponsorship portal (opens in new tab)"
          >
            Visit the Sponsorship Portal
          </ExternalLink>
        </Container>
      </Section>

      {/* Secondary CTAs */}
      <Section background="brand" aria-labelledby="other-ways-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="other-ways-heading"
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
                href="/give/donate"
                variant="ghost"
                size="default"
                className="border-white text-white hover:bg-white/10"
              >
                Donate
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
