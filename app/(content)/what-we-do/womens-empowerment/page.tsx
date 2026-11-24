/**
 * Women's Empowerment — /what-we-do/womens-empowerment
 * 301 redirect from /elementor-2202/ is already live in next.config.ts.
 *
 * Content sourced from:
 *   - docs/content/page-elementor-2202.html (verbatim programme text)
 *   - docs/content/page-what-we-do.html
 *   - docs/research/full-website-discovery-report.md (page 5, 18)
 *   - docs/research/content-verification-and-sitemap.md (page 5)
 *
 * "Nearly 100 women" is presented without asserting a reporting period,
 * per the Phase 6C scope decision. Scope (cumulative vs current) requires
 * client confirmation.
 *
 * Architecture v1.2 — Sections 5.1, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import {
  ProgrammeImagePlaceholder,
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';

const knowledgeAreas = [
  'Childcare',
  'Nutrition',
  'Basic health care',
  'Family planning',
  'Sexual health education',
  'Gender-based violence',
  'Self-esteem',
  'Healthy communication',
] as const;

const livelihoodSkills = ['Sewing', 'Basket Making', 'Entrepreneurship'] as const;

export const metadata: Metadata = {
  title: "Women's Empowerment",
  description:
    "SeedPower Foundation's women's empowerment programme builds household stability and self-reliance through skills training in sewing, basket making, and entrepreneurship for women in Kenya.",
  alternates: { canonical: '/what-we-do/womens-empowerment' },
  openGraph: {
    title: "Women's Empowerment | SeedPower Foundation",
    description:
      "Skills training and community support helping women in Kenya build self-reliance and household stability.",
    url: '/what-we-do/womens-empowerment',
    type: 'website',
  },
};

export default function WomensEmpowermentPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="womens-empowerment-heading"
        title="Women's Empowerment"
        description="Practical skills and community support that help women provide for their families and strengthen household stability."
        imageLabel="Women's empowerment programme photography placeholder"
        imageSrc="/images/programmes/women-sewing-training.jpg"
        imageAlt="A woman works at a sewing machine during a skills session."
        imageSizes="(max-width: 1023px) 100vw, 260px"
        imageClassName="object-[center_22%] desktop:object-contain desktop:object-right"
      />

      <Section background="white" aria-labelledby="approach-heading">
        <Container>
          <div className="grid items-start gap-6 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-16">
            <div>
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Our approach
              </p>
              <Heading
                variant="h2"
                id="approach-heading"
                className="text-[var(--color-text-primary)]"
              >
                Supporting women and their households
              </Heading>
            </div>
            <div className="max-w-[760px]">
              <Text
                variant="body-lg"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                Many women in the communities care for and provide for their
                children alone, with limited access to basic birth control,
                health education, and resources. SeedPower aims to teach
                practical skills that women can use to support themselves
                and their children, and to add stability to the household.
              </Text>
              <Text
                variant="body"
                className="text-[var(--color-text-secondary)]"
              >
                Ruth Odero takes a hands-on approach to education and
                empowerment through the programme.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="learning-heading">
        <Container>
          <div className="mb-8 max-w-[740px] tablet:mb-10">
            <Heading
              variant="h2"
              id="learning-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              Knowledge and livelihood skills
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
              The programme shares knowledge across areas including:
            </Text>
          </div>

          <ul
            className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 tablet:grid-cols-2 desktop:grid-cols-4"
            aria-label="Women’s empowerment programme learning areas"
          >
            {knowledgeAreas.map((area) => (
              <li
                key={area}
                className="flex items-start gap-3 border-t border-[var(--color-border)] py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                />
                <Text variant="body-sm" className="text-[var(--color-text-primary)]">
                  {area}
                </Text>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 border-t border-[var(--color-border)] pt-7 tablet:mt-10 tablet:grid-cols-[0.8fr_1.2fr] tablet:items-center tablet:gap-10">
            <Text variant="body-lg" className="font-semibold text-[var(--color-brand)]">
              SeedPower has begun teaching nearly 100 women practical
              livelihood skills, including:
            </Text>
            <ul
              className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0 tablet:grid-cols-3"
              aria-label="Livelihood skills"
            >
              {livelihoodSkills.map((skill) => (
                <li
                  key={skill}
                  className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section background="white" aria-labelledby="impact-story-heading">
        <Container>
          <div className="grid items-center gap-8 tablet:grid-cols-2 desktop:gap-16">
            <ProgrammeImagePlaceholder
              label="Community home-building project photograph"
              imageSrc="/images/programmes/community-homebuilding.jpg"
              imageAlt="Community members work together while constructing a home."
              imageSizes="(max-width: 767px) 100vw, 50vw"
              className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
            />
            <div>
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Community in action
              </p>
              <Heading
                variant="h2"
                id="impact-story-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                Women supporting one another
              </Heading>
              <Text
                variant="body-lg"
                className="mb-4 text-[var(--color-text-secondary)]"
              >
                When an elderly woman needed a house, women in the group worked
                together with a handful of men to build one from the ground up.
                Their shared effort also created a support system within the
                community.
              </Text>
              <Text variant="body-lg" className="font-semibold text-[var(--color-brand)]">
                Together we are so much stronger.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="womens-cta-heading"
        heading="Support Women’s Empowerment"
        description="Your support helps women in Kenya gain skills, build stability, and create a stronger future for their families."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
