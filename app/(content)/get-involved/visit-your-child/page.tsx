/**
 * Visit Your Child — /get-involved/visit-your-child
 * The original page contains generic template content, not verified
 * information about visits to SeedPower.
 */
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import {
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Visit Your Child',
  description:
    'SeedPower’s original page does not provide verified details about visiting a child.',
  alternates: { canonical: '/get-involved/visit-your-child' },
  openGraph: {
    title: 'Visit Your Child | SeedPower Foundation',
    description:
      'Visit details could not be verified from SeedPower Foundation’s original page.',
    url: '/get-involved/visit-your-child',
    type: 'website',
  },
};

export default function VisitYourChildPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="visit-your-child-heading"
        title="Visit Your Child"
        description="Visit arrangements could not be verified from SeedPower Foundation’s original page."
        imageLabel="Visit Your Child photography placeholder"
      />

      <Section background="white" aria-labelledby="visit-information-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="visit-information-heading"
            className="mb-4 text-[var(--color-text-primary)]"
          >
            Visit Information
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
            The original page contains generic placeholder content rather than
            verified information about visiting a SeedPower child. Dates,
            eligibility, and visit arrangements are not available, so they are
            not listed here.
          </Text>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="visit-cta-heading"
        heading="Need more information?"
        description="Contact SeedPower using the channels on the Contact page."
        buttonLabel="Contact SeedPower"
        buttonHref="/contact"
      />
    </>
  );
}
