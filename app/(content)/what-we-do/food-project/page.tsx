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
import { ButtonLink } from '@/components/ui/ButtonLink';

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
      {/* Page header — in-development badge is prominent */}
      <Section background="soft" aria-labelledby="food-project-heading">
        <Container variant="narrow">
          <div className="mb-4">
            <Badge variant="neutral">In Development</Badge>
          </div>
          <Heading
            variant="h1"
            id="food-project-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Sustainable Food Project
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation is developing a sustainable food project to
            provide learners and the wider SeedPower community with the correct
            nutrition, and to equip them with hands-on agricultural skills.
            This project is currently being put in place.
          </Text>
        </Container>
      </Section>

      {/* Project vision */}
      <Section background="white" aria-labelledby="vision-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="vision-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Our Vision
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            Through this project, SeedPower is determined to expand the status
            of farming in its communities beyond the current level of
            subsistence farming — building sustainable livelihoods and food
            security for the long term.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            Once operational, the project will provide nutritious food for
            students at both campuses and create opportunities for community
            members to develop practical agricultural skills.
          </Text>
        </Container>
      </Section>

      {/* Project components */}
      <Section background="warm" aria-labelledby="components-heading">
        <Container>
          <Heading
            variant="h2"
            id="components-heading"
            className="text-[var(--color-text-primary)] mb-2"
          >
            Project Components
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] mb-8 max-w-[600px]"
          >
            The Sustainable Food Project is planned to include the following
            agricultural activities.
          </Text>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4 tablet:gap-6">
            {components.map((component) => (
              <div
                key={component.name}
                className="p-5 bg-[var(--color-bg-page)] rounded-[var(--radius-md)]
                           border border-[var(--color-border)] text-center"
              >
                <Text
                  variant="body"
                  className="font-semibold text-[var(--color-brand)]"
                >
                  {component.name}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="food-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="food-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support the Food Project
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Help SeedPower develop sustainable food security and
              agricultural skills for communities in Kenya.
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
