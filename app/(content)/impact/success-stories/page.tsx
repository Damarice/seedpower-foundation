/**
 * Success Stories — /impact/success-stories
 * 301 redirect from /contact/news/success-stories/ → /impact/success-stories
 * is already live in next.config.ts.
 *
 * Content sourced from:
 *   - docs/research/full-website-discovery-report.md (page 14)
 *   - docs/research/content-verification-and-sitemap.md (page 11)
 *   - docs/content/page-contact-news-success-stories.html
 *   - docs/content/page-success-stories.html
 *
 * Growth metric: "12 students (first month 2019) → 375 students (January 2026)"
 * Both figures are confirmed in source; presented as a historical milestone.
 *
 * Photo gallery: 16 impact photographs are catalogued in the media inventory
 * but have NOT been downloaded to /public/images/. A gallery placeholder
 * is used. No image paths are referenced to avoid broken image references.
 *
 * Individual case studies and testimonials: NONE exist in discovery
 * documentation. The original source page states only "The following are
 * some of our success stories:" followed by a photo gallery. No individual
 * stories are invented.
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
  title: 'Success Stories',
  description:
    'SeedPower Foundation grew from 12 students in January 2019 to 375 students by January 2026 — read the story of seven years of impact in Kenya.',
  alternates: { canonical: '/impact/success-stories' },
  openGraph: {
    title: 'Success Stories | SeedPower Foundation',
    description:
      'From 12 to 375 students in seven years — the documented growth story of SeedPower Foundation in Kenya.',
    url: '/impact/success-stories',
    type: 'website',
  },
};

export default function SuccessStoriesPage() {
  return (
    <>
      {/* Page header */}
      <Section background="soft" aria-labelledby="success-stories-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="success-stories-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Success Stories
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            The most powerful measure of SeedPower Foundation&apos;s impact is
            the growth of the children it serves. The following documents the
            organisation&apos;s recorded growth since it opened its first
            campus in 2019.
          </Text>
        </Container>
      </Section>

      {/* Growth narrative */}
      <Section background="white" aria-labelledby="growth-story-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="growth-story-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            From 12 to 375 Students
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            In January 2019, SeedPower Foundation opened its first education
            centre in Oyugis with 12 students enrolled in the first month.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)] mb-4">
            By January 2026 — seven years later — that number had grown to
            375 students across two campuses: Oyugis (220 students,
            established 2019) and the Grinnell Family Campus in Nyakach
            (155 students, established 2021).
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            Every student in that growth represents a vulnerable child, a
            child at risk, or a child with special needs who gained access
            to quality education and the support to develop to their full
            potential.
          </Text>
        </Container>
      </Section>

      {/* Gallery placeholder */}
      <Section background="soft" aria-labelledby="gallery-heading">
        <Container>
          <Heading
            variant="h2"
            id="gallery-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Impact in Pictures
          </Heading>
          <Text
            variant="body"
            className="text-[var(--color-text-secondary)] mb-8 max-w-[600px]"
          >
            SeedPower Foundation&apos;s media library contains photographs
            documenting the growth of the campuses, students, community
            programmes, and outreach work since 2019.
          </Text>
          {/* Gallery placeholder — 16 impact photos are catalogued in the media
              inventory but have not been downloaded to /public/images/.
              This placeholder will be replaced when image assets are provided. */}
          <div
            className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4"
            aria-label="Photo gallery — images pending"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-[var(--color-bg-warm)]
                           rounded-[var(--radius-md)] flex items-center
                           justify-center"
                role="img"
                aria-label="Impact photograph — image pending"
              >
                <svg
                  className="w-8 h-8 text-[var(--color-border)]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
            ))}
          </div>
          <Text
            variant="body-sm"
            className="text-[var(--color-text-secondary)] mt-4"
          >
            Photography from SeedPower Foundation programmes will be added
            here when image assets are provided.
          </Text>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="stories-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="stories-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Help Write the Next Chapter
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Every donation, every volunteer, and every sponsor helps
              SeedPower Foundation reach more children and communities in
              Kenya.
            </Text>
            <div className="flex flex-col tablet:flex-row gap-3 justify-center">
              <ButtonLink
                href="/give/donate"
                variant="ghost"
                size="default"
                className="border-white text-white hover:bg-white/10"
              >
                Donate Now
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
