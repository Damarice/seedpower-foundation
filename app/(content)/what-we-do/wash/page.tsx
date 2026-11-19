/**
 * Water, Sanitation & Hygiene — /what-we-do/wash
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (campus figures verbatim)
 *   - docs/research/full-website-discovery-report.md (page 4, section 6)
 *   - docs/research/content-verification-and-sitemap.md (page 9)
 *
 * IMPORTANT: Oyugis figure is in individuals; Nyakach figure is in families.
 * These are presented separately — they are NEVER added together.
 * Architecture v1.2 Section 5.3 and Phase 6C scope verification confirm
 * this distinction must be preserved.
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
  title: 'Water, Sanitation & Hygiene',
  description:
    'SeedPower Foundation provides clean water, sanitation facilities, and hygiene education at its campuses in Oyugis and Nyakach, Kenya.',
  alternates: { canonical: '/what-we-do/wash' },
  openGraph: {
    title: 'Water, Sanitation & Hygiene | SeedPower Foundation',
    description:
      'Clean water access, sanitation, and hygiene education at SeedPower campuses in Oyugis and Nyakach, Kenya.',
    url: '/what-we-do/wash',
    type: 'website',
  },
};

export default function WashPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="wash-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="wash-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Water, Sanitation &amp; Hygiene
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation provides water access, sanitation facilities,
            and hygiene education at both campuses. Clean water is essential
            to the health, attendance, and wellbeing of students and
            surrounding community members.
          </Text>
        </Container>
      </Section>

      {/* Campus water programmes — presented separately, units preserved */}
      <Section background="white" aria-labelledby="campus-water-heading">
        <Container>
          <Heading
            variant="h2"
            id="campus-water-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            School and Community Water Programme
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-10 tablet:mb-12 max-w-[600px]"
          >
            SeedPower provides water to both campuses and to their surrounding
            communities.
          </Text>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-12">

            {/* Oyugis */}
            <div
              className="p-6 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)]"
            >
              <Heading
                variant="h3"
                className="text-[var(--color-brand)] mb-4"
              >
                Oyugis Campus
              </Heading>
              <Text variant="body" className="text-[var(--color-text-primary)] mb-4">
                The water project at Oyugis serves students at the campus and
                members of the surrounding community.
              </Text>
              {/* Figures presented separately — Oyugis count is in individuals */}
              <dl className="space-y-2">
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[160px]">
                    Students served
                  </dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">
                    220
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[160px]">
                    Community members
                  </dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">
                    360
                  </dd>
                </div>
              </dl>
            </div>

            {/* Nyakach */}
            <div
              className="p-6 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)]"
            >
              <Heading
                variant="h3"
                className="text-[var(--color-brand)] mb-4"
              >
                Nyakach Campus
              </Heading>
              <Text variant="body" className="text-[var(--color-text-primary)] mb-4">
                The water project at Nyakach serves students at the campus and
                families in the surrounding community.
              </Text>
              {/* Figures presented separately — Nyakach community count is in families, not individuals */}
              <dl className="space-y-2">
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[160px]">
                    Students served
                  </dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">
                    155
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] min-w-[160px]">
                    Community families
                  </dt>
                  <dd className="font-[var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]">
                    290
                  </dd>
                </div>
              </dl>
            </div>

          </div>
        </Container>
      </Section>

      {/* Hygiene education */}
      <Section background="warm" aria-labelledby="hygiene-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="hygiene-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Hygiene Education
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            Alongside water access and sanitation facilities, SeedPower
            provides hygiene education at both campuses. Improving hygiene
            practices supports student health, reduces absenteeism, and
            strengthens the wellbeing of the broader community.
          </Text>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="wash-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="wash-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support Clean Water Access
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps maintain and expand clean water and sanitation
              for students and communities in Kenya.
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
