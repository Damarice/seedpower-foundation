/**
 * Volunteer page — /get-involved/volunteer
 *
 * Content sourced from verified discovery documentation:
 *   - docs/research/full-website-discovery-report.md (Page 7: Volunteer, ID 953)
 *   - docs/research/content-verification-and-sitemap.md (Page 12: Volunteer)
 *   - docs/content/page-volunteer.html (HTML snapshot)
 *
 * All copy is drawn verbatim or closely paraphrased from those sources.
 * No testimonials, volunteer quotes, statistics, or imagery are invented.
 * Image assets are not yet available in /public/images/ — the page is
 * designed to be complete and polished without photography.
 *
 * The "Become a Volunteer" CTA links to /contact, which is the logical
 * destination for enquiries until the contact form (Phase 7) is live.
 *
 * Architecture v1.2 — Section 5.1, 11.1 (metadata), 13 (Phase 6).
 * Visual Design Direction v2.0 — Section 1–4.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Join SeedPower Foundation as a volunteer. Help children learn, support community outreach, contribute to the Sustainable Food Project, and make a lasting difference in Kenya.',
  alternates: {
    canonical: '/get-involved/volunteer',
  },
  openGraph: {
    title: 'Volunteer | SeedPower Foundation',
    description:
      'Join SeedPower Foundation as a volunteer. Help children learn, support community outreach, and make a lasting difference in Kenya.',
    url: '/get-involved/volunteer',
    type: 'website',
  },
};

/** Five volunteering areas sourced verbatim from page-volunteer.html */
const volunteerAreas = [
  {
    id: "education",
    title: "Children's Education",
    description:
      "Help children learn in our campuses in Oyugis and Nyakach. Work alongside teachers to support vulnerable children and those with special needs in a safe, encouraging classroom environment.",
  },
  {
    id: "food-project",
    title: "Sustainable Food Project",
    description:
      "Contribute to our poultry, aquaponics, regenerative gardening, and dairy farming initiatives — a project being developed to provide nutrition to learners and equip communities with practical agricultural skills.",
  },
  {
    id: "community-outreach",
    title: "Community and Family Outreach",
    description:
      "Join relief food programmes, hygiene supply distributions, and community advocacy efforts that reach disadvantaged families in Nyakach and Oyugis.",
  },
  {
    id: "women-youth",
    title: "Women and Youth Empowerment",
    description:
      "Support our women's skills training and youth development programmes, helping community members build the knowledge and confidence to provide for themselves and their families.",
  },
  {
    id: "teacher-training",
    title: "Teacher Professional Development",
    description:
      "Assist with teacher training and professional development workshops, contributing to the capacity of educators working with children with special needs across Kenya.",
  },
] as const;

export default function VolunteerPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────────────── */}
      <Section background="soft" aria-labelledby="volunteer-page-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="volunteer-page-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Volunteer
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-primary)] max-w-prose"
          >
            Be a blessing in the lives of others. SeedPower Foundation
            welcomes individuals and groups who want to give their time and
            skills to serve vulnerable children, women, and communities in
            Kenya. Whether you join us for a week or a month, your
            contribution makes a lasting difference.
          </Text>
        </Container>
      </Section>

      {/* ── Volunteering areas ───────────────────────────────────── */}
      <Section
        background="white"
        aria-labelledby="volunteer-areas-heading"
      >
        <Container>
          <Heading
            variant="h2"
            id="volunteer-areas-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Where You Can Help
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-10 tablet:mb-12 max-w-[600px]"
          >
            There are five areas where volunteers make a direct impact.
          </Text>

          <ol
            className="space-y-6 tablet:space-y-8"
            aria-label="Volunteering areas"
          >
            {volunteerAreas.map((area, index) => (
              <li
                key={area.id}
                className="flex gap-4 tablet:gap-6"
              >
                {/* Number badge */}
                <div
                  className={[
                    'flex-shrink-0 flex items-center justify-center',
                    'w-10 h-10 rounded-full',
                    'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
                    'font-[var(--font-heading)] font-bold text-base',
                    'mt-0.5', // align with first line of heading
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Heading
                    variant="h3"
                    className="text-[var(--color-brand)] mb-2"
                  >
                    {area.title}
                  </Heading>
                  <Text
                    variant="body"
                    className="text-[var(--color-text-primary)]"
                  >
                    {area.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Mission trips ────────────────────────────────────────── */}
      <Section
        background="warm"
        aria-labelledby="mission-trips-heading"
      >
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="mission-trips-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Mission Trips
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Come and experience SeedPower first-hand. You can visit as an
            individual or as a group for one week up to one month.
          </Text>
          <Text
            variant="body"
            className="text-[var(--color-text-primary)] mb-4"
          >
            A mission trip will widen your worldview and teach you about
            other people&apos;s cultures. Visiting SeedPower will enable you to
            witness what life is like at the organisation and experience
            what God is doing here in Kenya and East Africa.
          </Text>
          <Text
            variant="body"
            className="text-[var(--color-text-primary)]"
          >
            Trips are available year-round. Contact us to discuss dates,
            logistics, and how your skills and interests can best serve the
            community.
          </Text>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <Section
        background="brand"
        aria-labelledby="volunteer-cta-heading"
      >
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="volunteer-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Together We Can Change The World!
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-on-brand)] max-w-prose"
            >
              Join the SeedPower community and help exploit potential —
              in children, families, and communities across Kenya.
            </Text>
            <ButtonLink
              href="/contact"
              variant="ghost"
              size="default"
              className="border-white text-white hover:bg-white/10"
            >
              Become a Volunteer
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
