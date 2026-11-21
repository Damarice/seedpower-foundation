/**
 * Education Centers — /what-we-do/education
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (verbatim campus descriptions)
 *   - docs/research/full-website-discovery-report.md (page 4, 4a)
 *   - docs/research/content-verification-and-sitemap.md (page 4a)
 *
 * The combined figure of 375 students is presented as the total recorded
 * across both campuses; it is not stated as a live current enrolment.
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
  title: 'Education Centers',
  description:
    'SeedPower Foundation operates two education campuses in Kenya — Oyugis (established 2019) and Nyakach (established 2021) — serving 375 vulnerable children and those with special needs.',
  alternates: { canonical: '/what-we-do/education' },
  openGraph: {
    title: 'Education Centers | SeedPower Foundation',
    description:
      'Two campuses in Kenya serving vulnerable children and those with special needs in Oyugis and Nyakach.',
    url: '/what-we-do/education',
    type: 'website',
  },
};

export default function EducationPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="education-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="education-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Education Centers
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation operates two education campuses in Kenya,
            both dedicated to serving vulnerable children, children at risk,
            and children with special needs. Together the two campuses have
            enrolled 375 students — giving each child the support they need to
            develop to their full potential.
          </Text>
        </Container>
      </Section>

      {/* Campus details */}
      <Section background="white" aria-labelledby="campuses-heading">
        <Container>
          <Heading
            variant="h2"
            id="campuses-heading"
            className="text-[var(--color-text-primary)] mb-10 tablet:mb-12"
          >
            Our Campuses
          </Heading>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-12">
            {/* Oyugis Campus */}
            <div>
              <Heading
                variant="h3"
                className="text-[var(--color-brand)] mb-3"
              >
                Oyugis Campus
              </Heading>
              <dl className="space-y-2 mb-4">
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Established</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">January 2019</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Students</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">220 pupils</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Location</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">Oyugis community, Kenya</dd>
                </div>
              </dl>
              <Text variant="body" className="text-[var(--color-text-primary)]">
                SeedPower Education Center Oyugis Campus was established in
                January 2019 to offer education to the vulnerable, children
                at risk, and children with special needs in the Oyugis
                community. We educate, equip and empower these children to
                become Godly leaders and agents of community transformation.
              </Text>
            </div>

            {/* Nyakach Campus */}
            <div>
              <Heading
                variant="h3"
                className="text-[var(--color-brand)] mb-1"
              >
                Nyakach Campus
              </Heading>
              <p className="text-[length:var(--text-body-sm)] font-[var(--font-body)] font-normal text-[var(--color-text-secondary)] mb-2">
                Grinnell Family Campus
              </p>
              <dl className="space-y-2 mb-4">
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Established</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">2021</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Students</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">155 pupils</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[100px]">Location</dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">Nyakach community, Kenya</dd>
                </div>
              </dl>
              <Text variant="body" className="text-[var(--color-text-primary)]">
                SeedPower Education Center GF Campus was established in 2021
                to offer education to the vulnerable, children at risk, and
                children with special needs in the Nyakach community. The
                campus carries the same mission as Oyugis — equipping children
                to reach their full potential and become agents of community
                transformation.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="education-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="education-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support Our Students
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps provide quality education, resources, and
              opportunity to vulnerable children in Kenya.
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
