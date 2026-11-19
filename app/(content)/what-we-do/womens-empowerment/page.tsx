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
import { ButtonLink } from '@/components/ui/ButtonLink';

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
      {/* Page header */}
      <Section background="soft" aria-labelledby="womens-empowerment-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="womens-empowerment-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Women&apos;s Empowerment
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)]">
            SeedPower Foundation recognises that strong households begin with
            empowered women. Our programme provides skills training and
            community support to help women in Kenya provide for themselves
            and their families, and to build lasting stability.
          </Text>
        </Container>
      </Section>

      {/* The challenge */}
      <Section background="white" aria-labelledby="challenge-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="challenge-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            The Challenge
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            So many women in our communities are left to care and provide for
            their children alone. It is not unusual for a mother to lack
            access to basic birth control or the education and resources to
            keep them healthy. She often has several children with little to
            no ability to care for them financially on her own.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)]">
            It is SeedPower&apos;s goal to teach women skills that can be used to
            provide for themselves and their children, and to add stability to
            the household.
          </Text>
        </Container>
      </Section>

      {/* The programme */}
      <Section background="warm" aria-labelledby="programme-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="programme-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            The Programme
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            Ruth Odero is instrumental in her hands-on approach to education
            and empowerment. Through the programme, SeedPower reaches out to
            empower local women with skills and knowledge covering childcare,
            nutrition, basic health care, family planning, sexual health
            education, gender-based violence, self-esteem, and healthy
            communication.
          </Text>
          <Text variant="body" className="text-[var(--color-text-primary)] mb-6">
            Since the launch of the programme, SeedPower has begun teaching
            sewing skills, basket making, and other entrepreneurial endeavors
            to nearly 100 women.
          </Text>

          {/* Skills list */}
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
            {(['Sewing', 'Basket Making', 'Entrepreneurship'] as const).map((skill) => (
              <div
                key={skill}
                className="p-4 bg-[var(--color-bg-page)] rounded-[var(--radius-md)]
                           border border-[var(--color-border)]"
              >
                <Text
                  variant="body"
                  className="font-semibold text-[var(--color-brand)] text-center"
                >
                  {skill}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Community impact story */}
      <Section background="white" aria-labelledby="impact-story-heading">
        <Container variant="narrow">
          <Heading
            variant="h2"
            id="impact-story-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Community in Action
          </Heading>
          <Text variant="body-lg" className="text-[var(--color-text-primary)] mb-4">
            One of the greatest advantages of having our women come together
            is generating a support system within the community. We had an
            elderly woman who was in need of a house, and the women of the
            group worked together — with the help of a handful of men — to
            build one from the ground up.
          </Text>
          <Text
            variant="body-lg"
            className="font-semibold text-[var(--color-brand)]"
          >
            Together we are so much stronger.
          </Text>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="brand" aria-labelledby="womens-cta-heading">
        <Container variant="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Heading
              variant="h2"
              id="womens-cta-heading"
              className="text-[var(--color-text-on-brand)]"
            >
              Support Women&apos;s Empowerment
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-on-brand)] max-w-prose">
              Your support helps women in Kenya gain skills, build stability,
              and create a stronger future for their families.
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
