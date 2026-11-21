/**
 * Homepage — Phase 5 implementation.
 * Architecture v1.2 — Section 13 (Phase 5 deliverables).
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section Sequence).
 *
 * HERO SECTION — AWAITING TWO CLIENT DECISIONS:
 *   1. Hero type: static editorial hero (recommended) OR manually-advanced carousel.
 *   2. Hero headline: approved H1 text.
 *   Reference: VDD v2.0 Section 6.1 and 6.2; Architecture v1.2 Section 14.
 *
 * STATISTICS — confirmed figures only (Architecture v1.2 Section 13, Phase 5):
 *   - 375 students served (confirmed across multiple source pages)
 *   - 1,738 individuals trained across 47 counties — teacher outreach, cumulative
 *   - Nearly 100 women trained (scope unconfirmed: cumulative vs current)
 *   - Founded 2018, Registered 2019
 *
 * EXCLUDED (require client confirmation before display):
 *   - Turkana 2,460 families — interpretation, not a confirmed client statement
 *   - Community reach 3,600 — no timeframe; architecture marks as awaiting clarification
 *   - Any aggregate that mixes incompatible units (families vs individuals)
 */
import type { Metadata } from 'next';
import {
  MissionStrip,
  ImpactStatsSection,
  ProgrammeGridSection,
  FeaturedStorySection,
  GetInvolvedCTA,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'SeedPower Foundation | Empowering Communities Through Education',
  description:
    "SeedPower Foundation empowers vulnerable communities in Kenya through education, women's empowerment, teacher training, and sustainable development programmes.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SeedPower Foundation | Empowering Communities Through Education',
    description:
      "Empowering vulnerable communities in Kenya through education, women's empowerment, teacher training, and sustainable development.",
    url: 'https://seedpowerfoundation.org/',
    siteName: 'SeedPower Foundation',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SeedPower Foundation',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION — AWAITING CLIENT DECISION (review placeholder)

          Two decisions remain unresolved:

          1. Hero type: Static editorial hero (recommended in VDD v2.0
             Section 3.1) OR manually-advanced carousel?

          2. Hero headline: What is the approved hero H1 text?
             The full mission statement is accurate but long for an H1.

          DECISION REFERENCE: VDD v2.0 Section 6.1 and 6.2;
          Architecture v1.2 Section 14.

          This placeholder preserves the specified dimensions and
          heading hierarchy. It must be replaced with the approved
          hero component before the page ships publicly.
          ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Hero — awaiting client decision"
        className="bg-[var(--color-bg-warm)] min-h-[320px] tablet:min-h-[420px]
                   desktop:min-h-[520px] flex items-center justify-center"
      >
        <div className="text-center px-4 max-w-[720px] mx-auto">
          <p
            className="font-[var(--font-body)] text-sm font-medium uppercase
                       tracking-[0.08em] text-[var(--color-text-secondary)] mb-3"
          >
            Kenya, East Africa
          </p>
          <h1
            className="font-[var(--font-heading)] text-[28px] tablet:text-[36px]
                       desktop:text-[48px] font-bold text-[var(--color-text-primary)]
                       leading-[1.15] mb-4"
          >
            [Hero Headline — Awaiting Client Approval]
          </h1>
          <p className="font-[var(--font-body)] text-base tablet:text-lg
                        text-[var(--color-text-secondary)] mb-6">
            Hero decision pending: static editorial hero or manually-advanced
            carousel. See Architecture v1.2 Section 14 decisions.
          </p>
        </div>
      </section>

      {/* ══ Mission Statement Strip ══ */}
      <MissionStrip text="To enable, equip and empower students with special needs and children at risk to develop to their maximum potential in their school, families and the community." />

      {/* ══ Impact Statistics
          Confirmed figures only: Architecture v1.2 Section 13, Phase 5.
          Source list: 375 students, founded 2018, 1,738 educators, ~100 women.
          "8 Active Programmes" excluded — not in confirmed list; campus count
          and in-development status make the figure inaccurate.
          ══ */}
      <ImpactStatsSection
        stats={[
          {
            figure: '375',
            label: 'Students Served',
          },
          {
            figure: '1,738',
            label: 'Educators Trained',
          },
          {
            figure: '~100',
            label: 'Women Trained',
          },
          {
            figure: '2018',
            label: 'Year Founded',
          },
        ]}
      />

      {/* ══ What We Do — Programme Grid (6 programmes) ══ */}
      <ProgrammeGridSection
        heading="What We Do"
        subheading="Sustainable community development through education, empowerment, and care"
        programmes={[
          {
            title: 'Education Centers',
            description:
              'Two campuses serving 375 vulnerable children and those with special needs in Oyugis and Nyakach, Kenya.',
            stats: [{ label: '375 students' }],
            href: '/what-we-do/education',
          },
          {
            title: "Women's Empowerment",
            description:
              'Skills training in sewing, basket making, and entrepreneurship for nearly 100 women, building household stability and self-reliance.',
            stats: [{ label: '~100 women trained' }],
            href: '/what-we-do/womens-empowerment',
          },
          {
            title: 'Teacher Training',
            description:
              'Partnership with Little Light House USA has trained 1,738 teachers, social workers, and community leaders across 47 counties in special needs education.',
            stats: [{ label: '1,738 trained' }, { label: '47 counties' }],
            href: '/what-we-do/teacher-training',
          },
          {
            title: 'Water & Sanitation',
            description:
              'Clean water access, sanitation facilities, and hygiene education for students and community members at both campuses.',
            href: '/what-we-do/wash',
          },
          {
            title: 'Sustainable Food Project',
            description:
              'Poultry, aquaponics, regenerative gardening, and dairy farming to provide nutrition and agricultural skills training. Currently in development.',
            stats: [{ label: 'In development' }],
            href: '/what-we-do/food-project',
          },
          {
            title: 'Community Outreach',
            description:
              'Relief food distribution, hygiene supplies for teenagers, substance abuse prevention, and child rights advocacy across the community.',
            href: '/what-we-do/community-outreach',
          },
        ]}
        viewAllHref="/what-we-do"
      />

      {/* ══ Featured Story ══
          Source: Success Stories page (full-website-discovery-report.md, page 14).
          Verified: "12 students (first month 2019) → 375 students (January 2026)"
          ══ */}
      <FeaturedStorySection
        heading="Growing From 12 to 375 Students"
        content="When SeedPower Foundation opened its first education centre in Oyugis in January 2019, just 12 students enrolled in that first month. Today, 375 children across two campuses receive quality education and the support they need to thrive in school, their families, and the community. This growth reflects lives changed — children who were once at risk now developing toward their full potential."
        ctaHref="/impact/success-stories"
      />

      {/* ══ Get Involved CTA ══ */}
      <GetInvolvedCTA
        columns={[

          {
            title: 'Donate',
            description:
              'Your support provides education and resources to children and families in Kenya.',
            href: '/give/donate',
            buttonText: 'Give Now',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            ),
          },
          {
            title: 'Volunteer',
            description:
              'Join a mission trip or contribute your skills to empower communities in Kenya.',
            href: '/get-involved/volunteer',
            buttonText: 'Get Involved',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            ),
          },
          {
            title: 'Sponsor a Child',
            description:
              'Provide ongoing support directly to a student through our child sponsorship programme.',
            href: '/get-involved/sponsor-a-child',
            buttonText: 'Sponsor',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            ),
          },
        ]}
      />
    </>
  );
}
