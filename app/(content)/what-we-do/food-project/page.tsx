/**
 * Sustainable Food Project — /what-we-do/food-project
 *
 * Content sourced from:
 *   - docs/content/page-what-we-do.html (project description verbatim)
 *   - docs/research/full-website-discovery-report.md (page 4, section 5)
 *   - docs/research/content-verification-and-sitemap.md (page 8)
 *
 * STATUS: This project is explicitly "being put in place" across all sources.
 * The page makes the in-development status prominent and does not imply
 * the project is operational, provide a launch date, or invent outcomes.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import {
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';

export const metadata: Metadata = {
  title: 'Sustainable Food Project',
  description:
    'SeedPower Foundation is developing a sustainable food project in Kenya, covering poultry farming, aquaponics, regenerative gardening, and dairy farming to provide nutrition and agricultural skills.',
  alternates: { canonical: '/what-we-do/food-project' },
  openGraph: {
    title: 'Sustainable Food Project | SeedPower Foundation',
    description:
      'SeedPower is developing sustainable agriculture — poultry, aquaponics, regenerative gardening, and dairy farming — to provide nutrition and skills for communities in Kenya.',
    url: '/what-we-do/food-project',
    type: 'website',
  },
};

const components = [
  { name: 'Poultry Farming' },
  { name: 'Aquaponics' },
  { name: 'Regenerative Gardening' },
  { name: 'Dairy Farming' },
];

export default function FoodProjectPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="food-project-heading"
        title="Sustainable Food Project"
        description="An agricultural initiative in development to provide nutrition and hands-on farming skills for learners and the wider SeedPower community."
        imageLabel="Sustainable food project photography placeholder"
        imageSrc="/images/programmes/sustainable-food-project-community.jpg"
        imageAlt="Community members gather around the sustainable food project site."
      />

      <Section background="white" aria-labelledby="vision-heading">
        <Container>
          <div className="grid items-start gap-6 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-16">
            <div>
              <div className="mb-4">
                <Badge variant="neutral">In Development</Badge>
              </div>
              <Heading
                variant="h2"
                id="vision-heading"
                className="text-[var(--color-text-primary)]"
              >
                Our Vision
              </Heading>
            </div>
            <div className="max-w-[760px]">
              <Text
                variant="body-lg"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                SeedPower is putting the project in place to provide learners
                and the wider community with nutrition and hands-on
                agricultural skills. It aims to help farming in the
                communities move beyond subsistence.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                Once operational, the project is planned to provide nutritious
                food for students at both campuses and create opportunities
                for community members to develop practical agricultural
                skills.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="components-heading">
        <Container>
          <Heading
            variant="h2"
            id="components-heading"
            className="mb-3 text-[var(--color-text-primary)]"
          >
            Planned project components
          </Heading>
          <Text
            variant="body-lg"
            className="mb-8 max-w-[720px] text-[var(--color-text-secondary)]"
          >
            The project is set to include the following agricultural
            activities.
          </Text>
          <ul
            className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 tablet:grid-cols-2 desktop:grid-cols-4"
            aria-label="Planned agricultural activities"
          >
            {components.map((component) => (
              <li
                key={component.name}
                className="border-t border-[var(--color-border)] py-5 tablet:py-6"
              >
                <Text variant="body-lg" className="font-semibold text-[var(--color-brand)]">
                  {component.name}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="food-cta-heading"
        heading="Support the Food Project"
        description="Your support can help SeedPower develop sustainable food and agricultural skills for its learners and communities."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
