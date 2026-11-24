/**
 * Who We Are page — /who-we-are
 *
 * Consolidates content from two original pages:
 *   - /about-us/  (page-about-us.html, WordPress ID 930)
 *   - /who-we-are/  (page-who-we-are.html, WordPress ID 933)
 * A 301 redirect from /about-us/ → /who-we-are is already live in next.config.ts.
 *
 * Content sourced from verified discovery documentation:
 *   - docs/research/full-website-discovery-report.md (pages 2–3)
 *   - docs/research/content-verification-and-sitemap.md (pages 2–3)
 *   - docs/content/page-about-us.html
 *   - docs/content/page-who-we-are.html
 *
 * Content decisions applied per Phase 6B scope verification:
 *   - Registration certificate number OMITTED: two conflicting numbers appear
 *     on the original site (SRD/KK/121731/2019 vs DSD/43/245/02/82873).
 *     Requires client confirmation before either is displayed here.
 *   - "Sixth year" statement NOT carried over: would be inaccurate in 2026.
 *     The founding date is used instead.
 *   - All photo slots use accessible placeholders until genuine photographs
 *     are approved for this page.
 *
 * Architecture v1.2 — Sections 2, 5.1, 7, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–4.
 */
import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Who We Are',
  description:
    'SeedPower Foundation is a community-based nonprofit founded in 2018 in Kenya. Meet the co-founders and advisory board who guide our mission to empower vulnerable children, youth and women.',
  alternates: {
    canonical: '/who-we-are',
  },
  openGraph: {
    title: 'Who We Are | SeedPower Foundation',
    description:
      'Meet the co-founders and advisory board of SeedPower Foundation, a nonprofit empowering vulnerable communities in Kenya since 2018.',
    url: '/who-we-are',
    type: 'website',
  },
};

/* ── Data ──────────────────────────────────────────────────────────── */

/**
 * Six core values.
 * Source: page-about-us.html and docs/research/full-website-discovery-report.md (page 2).
 */
const coreValues = [
  {
    id: 'faith',
    name: 'Faith',
    description: 'Believing God for and trusting Him to do.',
  },
  {
    id: 'respect',
    name: 'Respect',
    description: 'Respect for human dignity.',
  },
  {
    id: 'integrity',
    name: 'Integrity',
    description: 'Financial transparency and truthful representation.',
  },
  {
    id: 'word-of-god',
    name: 'The Word of God',
    description: 'Biblical literacy and personal disciplines.',
  },
  {
    id: 'prayer',
    name: 'Prayer',
    description: 'Wisdom and protection for our partners and our team.',
  },
  {
    id: 'hope',
    name: 'Hope',
    description: 'Giving hope to those we serve.',
  },
] as const;

/**
 * Co-founders.
 * Source: page-who-we-are.html and docs/research/full-website-discovery-report.md (page 3).
 * Images: not yet copied to /public/images/ — placeholders used.
 */
const founders = [
  {
    id: 'beldon',
    name: 'Beldon Okeyo',
    role: 'Co-Executive Director, Co-Founder',
    imageAlt: 'Portrait placeholder for Beldon Okeyo, Co-Executive Director and Co-Founder',
  },
  {
    id: 'peter',
    name: 'Peter Opinya',
    role: 'Co-Executive Director, Co-Founder',
    imageAlt: 'Portrait placeholder for Peter Opinya, Co-Executive Director and Co-Founder',
  },
] as const;

/**
 * Advisory board members.
 * Source: page-who-we-are.html and docs/research/full-website-discovery-report.md (page 3).
 * Portraits remain placeholders until genuine photographs are approved.
 */
const boardMembers = [
  {
    id: 'jean-winfrey',
    name: 'Jean Karsten Winfrey',
    role: 'Board Member',
    imageAlt: 'Portrait placeholder for Jean Karsten Winfrey, Board Member',
  },
  {
    id: 'jim-grinnell',
    name: 'Jim Grinnell',
    role: 'Board Member',
    imageAlt: 'Portrait placeholder for Jim Grinnell, Board Member',
  },
  {
    id: 'laura-grinnell',
    name: 'Laura Grinnell',
    role: 'Board Member',
    imageAlt: 'Portrait placeholder for Laura Grinnell, Board Member',
  },
  {
    id: 'linda-steed',
    name: 'Linda Steed',
    role: 'Board Member',
    imageAlt: 'Portrait placeholder for Linda Steed, Board Member',
  },
  {
    id: 'keith-winfrey',
    name: 'Keith Winfrey',
    role: 'Board Member',
    imageAlt: 'Portrait placeholder for Keith Winfrey, Board Member',
  },
] as const;

/* ── Portrait placeholder ──────────────────────────────────────────── */

/**
 * Accessible photo placeholder, designed to be replaced when approved photos arrive.
 */
function PhotoPlaceholder({
  label,
  className,
  position = 'center',
}: {
  label: string;
  className: string;
  position?: 'center' | 'bottom-right';
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[radial-gradient(ellipse_at_72%_24%,rgba(255,255,255,0.78),transparent_38%),linear-gradient(145deg,var(--color-bg-warm),var(--color-bg-soft))] ${className}`}
      role="img"
      aria-label={label}
    >
      <span
        className={`flex flex-col items-center gap-3 px-5 text-center text-[var(--color-text-secondary)] ${
          position === 'bottom-right' ? 'absolute bottom-5 right-5 scale-90' : ''
        }`}
      >
        <svg
          className="h-10 w-10 text-[var(--color-brand)]/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M7 5l1-2h8l1 2" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.12em]">
          Photography placeholder
        </span>
      </span>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function WhoWeArePage() {
  return (
    <>
      <Section
        background="dark"
        aria-labelledby="who-we-are-heading"
        className="relative isolate flex min-h-[360px] items-center overflow-hidden py-12 tablet:min-h-[400px] tablet:py-16 desktop:min-h-[440px] desktop:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(20,32,15,0.92)_0%,rgba(20,32,15,0.76)_52%,rgba(20,32,15,0.52)_100%)]"
        />
        <PhotoPlaceholder
          label="SeedPower community activities photography placeholder"
          className="absolute inset-0 z-0 h-full w-full rounded-none bg-cover bg-center"
          position="bottom-right"
        />
        <Container>
          <div className="relative z-20 max-w-[650px]">
            <Heading
              variant="hero"
              id="who-we-are-heading"
              className="mb-4 text-white"
            >
              Who We Are
            </Heading>
            <Text variant="body-lg" className="max-w-[560px] text-white/90">
              Empowering vulnerable children, youth and women in the community.
            </Text>
          </div>
        </Container>
      </Section>

      <Section
        background="white"
        aria-labelledby="founders-heading"
        className="py-12 tablet:py-16 desktop:py-20"
      >
        <Container>
          <div className="mb-8 tablet:mb-10">
            <div className="mb-5">
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Our beginnings
              </p>
              <Heading
                variant="h2"
                id="founders-heading"
                className="text-[var(--color-text-primary)]"
              >
                Our Founders
              </Heading>
            </div>
            <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-7">
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                Beldon and Peter bring over 13 years of experience working
                with vulnerable communities. They trained and benchmarked
                with educational institutions in Africa and the USA, where
                they were inspired to start SeedPower in Kenya in 2018.
                The organisation was established in September 2018 and
                registered in 2019.
              </Text>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                Their shared childhood experiences inspired them to start
                SeedPower in Kenya in 2018, giving back and helping communities
                realise their potential as agents of transformation.
              </Text>
            </div>
          </div>

          <div className="grid gap-5 tablet:grid-cols-2 tablet:gap-6 desktop:gap-7">
            {founders.map((founder) => (
              <article
                key={founder.id}
                className="min-w-0"
              >
                <PhotoPlaceholder
                  label={founder.imageAlt}
                  className="aspect-[4/3] w-full"
                />
                <div className="pt-4">
                  <Heading
                    variant="h3"
                    className="mb-2 text-[var(--color-brand)]"
                  >
                    {founder.name}
                  </Heading>
                  <Text
                    variant="body-sm"
                    className="font-semibold text-[var(--color-text-secondary)]"
                  >
                    {founder.role}
                  </Text>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        background="warm"
        aria-label="Our mission, vision and aim"
        className="py-12 tablet:py-16 desktop:py-20"
      >
        <Container>
          <div className="grid gap-x-12 gap-y-8 desktop:grid-cols-2 desktop:gap-y-10">
            <article className="border-t border-[var(--color-border)] pt-5">
              <Heading
                variant="h2"
                id="mission-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Our Mission
              </Heading>
              <Text variant="body-lg" className="text-[var(--color-text-primary)]">
                To empower the vulnerable communities by providing them with
                education, resources and skills for future self-reliance and
                the eradication of poverty.
              </Text>
            </article>
            <article className="border-t border-[var(--color-border)] pt-5">
              <Heading
                variant="h2"
                id="vision-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Our Vision
              </Heading>
              <Text variant="body-lg" className="text-[var(--color-text-primary)]">
                We envision a society where vulnerable children and their
                families are empowered and equitably access sustainable
                livelihood opportunities in order to eradicate poverty.
              </Text>
            </article>
          </div>
          <div className="mt-10 grid gap-8 border-t border-[var(--color-border)] pt-7 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-12">
            <div>
              <Heading
                variant="h3"
                id="aim-heading"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Our Aim
              </Heading>
              <Text variant="body" className="text-[var(--color-text-secondary)]">
                SeedPower seeks to empower vulnerable communities to act as
                change agents, initiate solutions and participate in
                activities that affect their communities, while helping
                children, women and youth realise their potential and sharing
                the love and glory of God with all.
              </Text>
            </div>
            <div>
              <Heading
                variant="h3"
                className="mb-3 text-[var(--color-text-primary)]"
              >
                Our Overall Objective
              </Heading>
              <Text variant="body" className="mb-5 text-[var(--color-text-secondary)]">
                To improve the quality of life of vulnerable children through
                environmentally sound interventions and programs focused on
                basic essential services.
              </Text>
              <Text
                as="p"
                variant="label-sm"
                className="mb-3 text-[var(--color-brand)]"
              >
                We do this by
              </Text>
              <ul className="m-0 grid list-none gap-x-8 gap-y-3 p-0 tablet:grid-cols-2">
              {[
                'Increasing access to education for vulnerable children, children with special needs and those at risk.',
                'Working to reduce malnutrition among students in food programs at learning centers.',
                'Providing access to clean and safe water, sanitation, and hygiene education in schools and the community.',
                "Introducing youth and women's empowerment programs to build skills for self-reliance and help eradicate poverty.",
              ].map((objective) => (
                <li key={objective} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                  />
                  <Text
                    variant="body-sm"
                    className="text-[var(--color-text-secondary)]"
                  >
                    {objective}
                  </Text>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        background="white"
        aria-labelledby="values-heading"
        className="py-12 tablet:py-16 desktop:py-20"
      >
        <Container>
          <div className="mb-8 max-w-[680px] tablet:mb-10">
            <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              What guides us
            </p>
            <Heading
              variant="h2"
              id="values-heading"
              className="text-[var(--color-text-primary)]"
            >
              Our Values
            </Heading>
          </div>
          <ul
            className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 tablet:grid-cols-2 desktop:grid-cols-3"
            aria-label="Core values"
          >
            {coreValues.map((value) => (
              <li
                key={value.id}
                className="border-t border-[var(--color-border)] py-5"
              >
                  <Heading
                    variant="h3"
                    className="mb-2 text-[var(--color-text-primary)]"
                  >
                    {value.name}
                  </Heading>
                  <Text variant="body" className="text-[var(--color-text-secondary)]">
                    {value.description}
                  </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        background="soft"
        aria-labelledby="board-heading"
        className="py-12 tablet:py-16 desktop:py-20"
      >
        <Container>
          <div className="mb-8 tablet:mb-10">
            <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              Organisation
            </p>
            <Heading
              variant="h2"
              id="board-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              Advisory Board
            </Heading>
          </div>

          <div className="mb-8 max-w-[850px] desktop:mb-10">
            <Text variant="body" className="text-[var(--color-text-secondary)]">
              The Board supports SeedPower&apos;s vision and mission, bringing
              together people with different skills and experience. Members
              serve without pay, and the Advisory Board adds knowledge and
              abilities to help grow and sustain the organisation.
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 tablet:grid-cols-3 desktop:grid-cols-5 desktop:gap-x-6 desktop:gap-y-10">
            {boardMembers.map((member) => (
              <article
                key={member.id}
                className="min-w-0"
              >
                <PhotoPlaceholder
                  label={member.imageAlt}
                  className="aspect-[4/5] w-full"
                />
                <div>
                  <Heading
                    variant="h3"
                    className="mb-1 text-[var(--color-text-primary)]"
                  >
                    {member.name}
                  </Heading>
                  <Text
                    variant="body-sm"
                    className="text-[var(--color-text-secondary)]"
                  >
                    {member.role}
                  </Text>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        background="brand"
        aria-labelledby="who-we-are-cta-heading"
        className="py-12 tablet:py-14 desktop:py-16"
      >
        <Container>
          <div className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10">
            <div className="max-w-[680px]">
              <Heading
                variant="h2"
                id="who-we-are-cta-heading"
                className="mb-3 text-white"
              >
                Support SeedPower&apos;s work
              </Heading>
              <Text variant="body-lg" className="text-white/90">
                SeedPower works to empower vulnerable children, youth and
                women in the community.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href="/give/donate"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white/10 focus-visible:!outline-white"
              >
                Donate
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white/10 focus-visible:!outline-white"
              >
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
