/**
 * Volunteer — /get-involved/volunteer
 * Content is based on the original Volunteer page, including its five
 * participation areas and mission-trip information.
 */
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import {
  ProgrammeImagePlaceholder,
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Volunteer with SeedPower in children’s learning, community outreach, and teacher development.',
  alternates: {
    canonical: '/get-involved/volunteer',
  },
  openGraph: {
    title: 'Volunteer | SeedPower Foundation',
    description:
      'Explore ways to volunteer with SeedPower in learning, outreach, and teacher development.',
    url: '/get-involved/volunteer',
    type: 'website',
  },
};

const volunteerAreas = [
  {
    title: "Children's Education",
    description: 'Help children learn at SeedPower’s campuses.',
  },
  {
    title: 'Sustainable Food Project',
    description: 'Volunteer at SeedPower’s Sustainable Food Project.',
  },
  {
    title: 'Community and Family Outreach',
    description: 'Join SeedPower’s community and family outreach.',
  },
  {
    title: 'Teacher Professional Development',
    description: 'Contribute to teacher professional development and training.',
  },
] as const;

export default function VolunteerPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="volunteer-page-heading"
        title="Volunteer"
        description="Share your time at SeedPower in children’s learning, community outreach, or teacher development."
        imageLabel="Volunteer photography placeholder"
        imageSrc="/images/programmes/volunteer-outreach-session.jpg"
        imageAlt="Participants meet during a school-based outreach activity."
      />

      <Section background="white" aria-labelledby="volunteer-areas-heading">
        <Container>
          <div className="mb-8 max-w-[760px] tablet:mb-10">
            <Heading
              variant="h2"
              id="volunteer-areas-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              Ways to Volunteer
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
              You can volunteer across these four areas:
            </Text>
          </div>

          <ol
            className="m-0 list-none p-0"
            aria-label="Volunteering areas"
          >
            {volunteerAreas.map((area, index) => (
              <li
                key={area.title}
                className="grid gap-3 border-t border-[var(--color-border)] py-5 tablet:grid-cols-[0.8fr_1.2fr] tablet:items-center tablet:gap-10"
              >
                <div className="flex items-start gap-4 tablet:gap-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-[var(--font-heading)] text-sm font-bold tracking-[0.12em] text-[var(--color-brand)]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Heading
                    variant="h3"
                    className="text-[var(--color-text-primary)]"
                  >
                    {area.title}
                  </Heading>
                </div>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  {area.description}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="mission-trips-heading">
        <Container>
          <div className="grid items-center gap-8 tablet:grid-cols-2 desktop:gap-16">
            <div className="max-w-[600px]">
              <Heading
                variant="h2"
                id="mission-trips-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                Mission Trips
              </Heading>
              <Text
                variant="body-lg"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                Visit as an individual or as a group for one week up to one
                month.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                A mission trip can widen your worldview, introduce you to other
                cultures, and let you experience life at SeedPower.
              </Text>
            </div>
            <ProgrammeImagePlaceholder
              label="SeedPower volunteer mission trip photography placeholder"
              imageSrc="/images/programmes/volunteer-outreach-team.jpg"
              imageAlt="SeedPower volunteers and partners gather outside a school."
              imageSizes="(max-width: 767px) 100vw, 50vw"
              className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
            />
          </div>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="volunteer-cta-heading"
        heading="Together We Can Change The World!"
        description="Share your time and skills at SeedPower. Contact us to ask about volunteering."
        buttonLabel="Become a Volunteer"
        buttonHref="/contact"
      />
    </>
  );
}
