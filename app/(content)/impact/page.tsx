/**
 * Impact Overview — /impact
 * The original URL is unavailable; content is grounded in published programme
 * information from SeedPower's homepage, About Us, and What We Do pages.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ImpactStatsSection } from '@/components/sections/ImpactStatsSection';
import {
  ProgrammePageCta,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'Explore SeedPower Foundation’s published reach through education, teacher development, women’s empowerment, and community programmes.',
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Our Impact | SeedPower Foundation',
    description:
      'Explore SeedPower Foundation’s published reach through education and community programmes.',
    url: '/impact',
    type: 'website',
  },
};

const impactAreas = [
  {
    title: 'Inclusive education',
    description:
      'Education centres in Oyugis and Nyakach serve vulnerable children, children at risk, and children with special needs.',
    links: [{ label: 'Explore Education', href: '/what-we-do/education' }],
  },
  {
    title: 'Teacher development',
    description:
      'With Little Light House USA, SeedPower reaches special needs and ECDE teachers, social workers, parents, community leaders, and community organisations across Kenya’s 47 counties.',
    links: [{ label: 'Explore Teacher Training', href: '/what-we-do/teacher-training' }],
  },
  {
    title: 'Women’s empowerment',
    description:
      'Training in sewing, basket making, and entrepreneurial skills is intended to support women’s self-reliance and household stability.',
    links: [
      {
        label: 'Explore Women’s Empowerment',
        href: '/what-we-do/womens-empowerment',
      },
    ],
  },
  {
    title: 'Community wellbeing',
    description:
      'Community initiatives include school and community water, relief food, hygiene supplies, child-rights advocacy, and substance-abuse prevention.',
    links: [
      { label: 'Explore Water & Sanitation', href: '/what-we-do/wash' },
      {
        label: 'Explore Community Outreach',
        href: '/what-we-do/community-outreach',
      },
    ],
  },
] as const;

export default function ImpactPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="impact-heading"
        title="Our Impact"
        description="SeedPower seeks to empower vulnerable communities to develop their potential and shape solutions for their communities."
        imageLabel="Impact photography placeholder"
      />

      <ImpactStatsSection
        ariaLabel="Impact statistics"
        stats={[
          { figure: '375', label: 'Children supported across two campuses' },
          {
            figure: '1,738',
            label: 'People reached through teacher development',
          },
          { figure: '~100', label: 'Women trained' },
          { figure: '2018', label: 'Year established' },
        ]}
      />

      <Section background="white" aria-labelledby="impact-areas-heading">
        <Container>
          <div className="mb-10 flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
            <div className="max-w-[760px]">
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Our work
              </p>
              <Heading
                variant="h2"
                id="impact-areas-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Where change takes shape
              </Heading>
              <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
                These programme areas reflect SeedPower’s published work with
                children, women, and communities.
              </Text>
            </div>
            <ButtonLink
              href="/impact/success-stories"
              variant="ghost"
              size="default"
              className="shrink-0"
            >
              Read the Stories
            </ButtonLink>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 tablet:grid-cols-2 desktop:grid-cols-4">
            {impactAreas.map((area) => (
              <li
                key={area.title}
                className="border-t border-[var(--color-border)] pt-5"
              >
                <Heading
                  variant="h3"
                  className="mb-3 text-[var(--color-text-primary)]"
                >
                  {area.title}
                </Heading>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  {area.description}
                </Text>
                <div className="mt-4 flex flex-col items-start gap-1">
                  {area.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-brand)] underline decoration-[var(--color-brand)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)] focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-[color:var(--focus-ring-color)] focus-visible:[outline-style:var(--focus-ring-style)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProgrammePageCta
        headingId="impact-cta-heading"
        heading="Support SeedPower’s work"
        description="Your support helps SeedPower continue its education and community programmes."
        buttonLabel="Donate Now"
        buttonHref="/give/donate"
      />
    </>
  );
}
