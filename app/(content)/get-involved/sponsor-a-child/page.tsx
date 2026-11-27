/**
 * Sponsor a Child — /get-involved/sponsor-a-child
 * Content is based on the original sponsorship page and its linked programme
 * information. No individual child profiles or sponsorship amounts are added.
 */
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import {
  ProgrammeImagePlaceholder,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Sponsor a Child',
  description:
    'Support a child’s education through SeedPower Foundation’s sponsorship programme.',
  alternates: { canonical: '/get-involved/sponsor-a-child' },
  openGraph: {
    title: 'Sponsor a Child | SeedPower Foundation',
    description:
      'Learn how to support a child’s education through SeedPower Foundation.',
    url: '/get-involved/sponsor-a-child',
    type: 'website',
  },
};

const programmeAreas = [
  'Education for children from early childhood through elementary level',
  'Teacher training and outreach',
  'Family and community outreach',
  'Youth empowerment',
  'Sustainable food systems',
  'Water and sanitation',
] as const;

export default function SponsorAChildPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="sponsor-heading"
        title="Sponsor a Child"
        description="Support a child’s access to education through SeedPower Foundation’s sponsorship programme."
        imageLabel="SeedPower education photography placeholder"
        imageSrc="/images/programmes/sponsored-students-classroom.jpg"
        imageAlt="Pupils present their learning materials in a classroom."
      />

      <Section background="white" aria-labelledby="sponsorship-message-heading">
        <Container>
          <div className="grid items-center gap-8 tablet:grid-cols-2 desktop:gap-16">
            <div className="max-w-[600px]">
              <Heading
                variant="h2"
                id="sponsorship-message-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                Every Donation Matters
              </Heading>
              <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
                Even a small contribution helps children get an education.
              </Text>
            </div>
            <ProgrammeImagePlaceholder
              label="Children’s education sponsorship photography placeholder"
              imageSrc="/images/programmes/sponsored-student-learning.jpg"
              imageAlt="A teacher guides pupils during a classroom activity."
              imageSizes="(max-width: 767px) 100vw, 50vw"
              className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
            />
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="programme-areas-heading">
        <Container>
          <div className="mb-8 max-w-[760px] tablet:mb-10">
            <Heading
              variant="h2"
              id="programme-areas-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              SeedPower’s Programme Areas
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
              The original page also lists these areas of work:
            </Text>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-4 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
            {programmeAreas.map((area) => (
              <li
                key={area}
                className="border-t border-[var(--color-border)] py-4 font-[var(--font-body)] text-[length:var(--text-body)] leading-[var(--text-body--lh)] text-[var(--color-text-secondary)]"
              >
                {area}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/what-we-do" variant="ghost" size="sm">
              View Our Programmes
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section background="brand" aria-labelledby="sponsorship-cta-heading">
        <Container>
          <div className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10">
            <div className="max-w-[680px]">
              <Heading
                variant="h2"
                id="sponsorship-cta-heading"
                className="mb-3 text-white"
              >
                Your Support Means a Lot
              </Heading>
              <Text variant="body-lg" className="text-white/90">
                Visit the sponsorship portal, make a donation, or explore
                volunteering with SeedPower.
              </Text>
            </div>
            <div className="flex flex-col gap-3 tablet:flex-row tablet:flex-wrap">
              <ButtonLink
                href="http://www.gobgi.org/seedpowerkenya/"
                variant="ghost"
                size="default"
                className="shrink-0 border-white text-white hover:bg-white/10 hover:text-white"
              >
                Visit the Sponsorship Portal
              </ButtonLink>
              <ButtonLink
                href="/give/donate"
                variant="ghost"
                size="default"
                className="shrink-0 border-white text-white hover:bg-white/10 hover:text-white"
              >
                Donate
              </ButtonLink>
              <ButtonLink
                href="/get-involved/volunteer"
                variant="ghost"
                size="default"
                className="shrink-0 border-white text-white hover:bg-white/10 hover:text-white"
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
