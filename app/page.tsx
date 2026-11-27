/**
 * Homepage — Phase 5 implementation.
 * Architecture v1.2 — Section 13 (Phase 5 deliverables).
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section Sequence).
 *
 * STATISTICS — confirmed figures only (Architecture v1.2 Section 13, Phase 5):
 *   - 410 students across the Oyugis and Nyakach campuses
 *   - 1,738 individuals reached through teacher development across 47 counties
 *   - Founded 2018, Registered 2019
 *
 * EXCLUDED (require client confirmation before display):
 *   - Turkana 2,460 families — interpretation, not a confirmed client statement
 *   - Community reach 3,600 — no timeframe; architecture marks as awaiting clarification
 *   - Any aggregate that mixes incompatible units (families vs individuals)
 */
import type { Metadata } from 'next';
import {
  ImpactStatsSection,
  ProgrammeGridSection,
  StoriesOfChangeSection,
  GetInvolvedCTA,
} from '@/components/sections';
import { HomeHeroCarousel } from '@/components/sections/HomeHeroCarousel';

export const metadata: Metadata = {
  title: 'SeedPower Foundation | Empowering Communities Through Education',
  description:
    'SeedPower Foundation empowers vulnerable communities in Kenya through education, teacher development, and sustainable community programmes.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SeedPower Foundation | Empowering Communities Through Education',
    description:
      'Empowering vulnerable communities in Kenya through education, teacher development, and sustainable development.',
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
      <HomeHeroCarousel />

      {/* ══ Impact Statistics
          Confirmed figures only: Architecture v1.2 Section 13, Phase 5.
          Confirmed figures: 410 students, founded 2018, 1,738 people reached.
          "8 Active Programmes" excluded — not in confirmed list; campus count
          and in-development status make the figure inaccurate.
          ══ */}
      <ImpactStatsSection
        stats={[
          {
            figure: '410',
            label: 'Children Supported',
          },
          {
            figure: '1,738',
            label: 'People Reached Through Teacher Development',
          },
          {
            figure: '2018',
            label: 'Year Founded',
          },
        ]}
      />

      {/* ══ What We Do — Programme Grid (5 programmes) ══ */}
      <ProgrammeGridSection
        heading="What We Do"
        subheading="Creating opportunities and lasting change through education, empowerment and community care."
        programmes={[
          {
            title: 'Education Centers',
            description:
              'Inclusive learning and educational support for children, including those with special needs, across our Oyugis and Grinnell Family campuses.',
            impactDetail: '410 students supported',
            href: '/what-we-do/education',
            imageSrc: '/images/programmes/pupils-sharing-classwork.jpg',
            imageAlt: 'Pupils present their learning materials in a classroom.',
          },
          {
            title: 'Teacher Training',
            description:
              'Teacher development and community training initiatives that strengthen inclusive education and support children with special needs.',
            impactDetail: '1,738 people reached across 47 counties',
            href: '/what-we-do/teacher-training',
            imageSrc: '/images/programmes/teacher-training-participants.jpg',
            imageAlt: 'Teachers and community participants gather at a teacher-development conference in Kisumu.',
          },
          {
            title: 'Water & Sanitation',
            description:
              'Improving access to clean water, sanitation facilities and hygiene education for students and surrounding communities.',
            href: '/what-we-do/wash',
            imageSrc: '/images/programmes/community-water-access.jpg',
            imageAlt: 'A community member transports water containers by donkey.',
          },
          {
            title: 'Sustainable Food Project',
            description:
              'Developing practical agricultural initiatives through poultry, aquaponics, regenerative gardening and dairy farming to strengthen nutrition and agricultural skills.',
            status: 'In Development',
            href: '/what-we-do/food-project',
            imageSrc: '/images/programmes/poultry-farming.jpg',
            imageAlt: 'Chickens in a poultry shelter.',
          },
          {
            title: 'Community Outreach',
            description:
              'Supporting vulnerable communities through relief food distribution, hygiene supplies, substance abuse prevention and child rights advocacy.',
            href: '/what-we-do/community-outreach',
            imageSrc: '/images/programmes/community-food-assistance.jpg',
            imageAlt: 'Community members receive relief food during an outreach.',
          },
        ]}
        viewAllHref="/what-we-do"
      />

      {/* ══ Stories of Change ══ */}
      <StoriesOfChangeSection />

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
