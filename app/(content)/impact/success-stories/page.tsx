/**
 * Success Stories — /impact/success-stories
 * The original URL redirects to /contact/news/success-stories/.
 *
 * The source lists programme milestones rather than named personal stories
 * or testimonials. Conflicting overall student and Turkana totals are omitted.
 * Date-specific photographs are matched to the January 2019 and March 2023
 * groupings on the original Success Stories page.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';
import {
  ProgrammeImagePlaceholder,
  ProgrammePageHero,
} from '@/components/sections/ProgrammePageSections';

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Documented milestones from SeedPower Foundation’s education, teacher development, water, and community programmes.',
  alternates: { canonical: '/impact/success-stories' },
  openGraph: {
    title: 'Success Stories | SeedPower Foundation',
    description:
      'Explore documented milestones from SeedPower Foundation programmes in Kenya.',
    url: '/impact/success-stories',
    type: 'website',
  },
};

const campusWaterProjects = [
  {
    campusName: 'Oyugis Campus',
    pupilReach: '220 pupils',
    communityReach: 'Over 360 community members',
  },
  {
    campusName: 'Grinnell Family Campus · Nyakach',
    pupilReach: '155 pupils',
    communityReach: '290 families',
  },
] as const;

const milestones = [
  {
    figure: '1,738',
    label: 'individuals reached',
    title: 'Teacher development',
    description:
      'Special needs education training reached teachers, ECDE teachers, social workers, parents, community leaders, and community-based organisations across Kenya’s 47 counties.',
  },
  {
    figure: '500+',
    label: 'teachers trained in 2023',
    title: 'Teacher training in Rwanda',
    description:
      'SeedPower reports that its special needs education training extended to Rwanda in 2023.',
  },
  {
    figure: '100',
    label: 'people impacted',
    title: 'Eye tests and reading glasses',
    description:
      'Students and other community members received eye tests, with glasses provided for reading.',
  },
  {
    figure: '1,800',
    label: 'families reached',
    title: 'Relief food in Oyugis and Nyakach',
    description:
      'Disadvantaged families were reached with relief food during and after the COVID period.',
  },
  {
    figure: '1,200',
    label: 'teenage girls reached',
    title: 'Sanitary and hygiene supplies',
    description:
      'Girls received supplies at schools and in the community.',
  },
  {
    figure: '59',
    label: 'people trained',
    title: 'Leadership seminar',
    description:
      'Community church leaders and pastors attended leadership training in July 2022.',
  },
] as const;

const galleryItems = [
  {
    label: 'SeedPower January 2019 success story photograph',
    caption: 'SeedPower, January 2019',
    imageSrc: '/images/programmes/january-2019-classroom.jpg',
    imageAlt: 'Pupils work around tables in a classroom in a January 2019 SeedPower photograph.',
  },
  {
    label: 'SeedPower March 2023 success story photograph',
    caption: 'SeedPower, March 2023',
    imageSrc: '/images/programmes/march-2023-pupils-and-community.jpg',
    imageAlt: 'Pupils and community members gather outside a SeedPower school in a March 2023 photograph.',
  },
  {
    label: 'School and classroom success story photograph placeholder',
    caption: 'School and classroom',
    imageSrc: '/images/programmes/classroom-learning-activity.jpg',
    imageAlt: 'A pupil practices writing in class.',
  },
  {
    label: 'Community water project photograph placeholder',
    caption: 'Water projects',
    imageSrc: '/images/programmes/water-carrier-with-child.jpg',
    imageAlt: 'A community member carries water containers along a rural path with a child.',
  },
  {
    label: 'Student assembly success story photograph placeholder',
    caption: 'School assembly',
    imageSrc: '/images/programmes/student-assembly.jpg',
    imageAlt: 'Pupils gather for a school assembly.',
  },
  {
    label: 'Community engagement success story photograph placeholder',
    caption: 'Community engagement',
    imageSrc: '/images/programmes/community-outreach-workshop.jpg',
    imageAlt: 'Community members take part in an outreach meeting.',
  },
] as const;

export default function SuccessStoriesPage() {
  return (
    <>
      <ProgrammePageHero
        headingId="success-stories-heading"
        title="Success Stories"
        description="Documented milestones from SeedPower’s education, teacher development, water, and community programmes."
        imageLabel="Success stories photography placeholder"
        imageSrc="/images/programmes/success-stories-classroom.jpg"
        imageAlt="Pupils take part in a classroom activity at a SeedPower education centre."
      />

      <Section background="white" aria-labelledby="growth-story-heading">
        <Container>
          <div className="grid items-center gap-8 tablet:grid-cols-2 desktop:gap-16">
            <div>
              <p className="mb-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                Education · Oyugis
              </p>
              <Heading
                variant="h2"
                id="growth-story-heading"
                className="mb-4 text-[var(--color-text-primary)]"
              >
                An early education milestone
              </Heading>
              <p className="mb-2 font-[var(--font-heading)] text-5xl font-bold leading-none text-[var(--color-brand)] tablet:text-6xl">
                12
              </p>
              <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
                students enrolled in the first month of SeedPower’s Oyugis
                education centre, in January 2019.
              </Text>
            </div>
            <ProgrammeImagePlaceholder
              label="SeedPower January 2019 success story photograph"
              imageSrc="/images/programmes/early-students-2019.jpg"
              imageAlt="Children gather outdoors beside a building in a 2019 SeedPower photograph."
              className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
            />
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="water-projects-heading">
        <Container>
          <Heading
            variant="h2"
            id="water-projects-heading"
            className="mb-3 text-[var(--color-text-primary)]"
          >
            Community water projects
          </Heading>
          <Text
            variant="body-lg"
            className="mb-8 max-w-[720px] text-[var(--color-text-secondary)]"
          >
            The source reports each campus project separately, preserving the
            different units used for community reach.
          </Text>

          <ul className="m-0 list-none p-0">
            {campusWaterProjects.map((project) => (
              <li
                key={project.campusName}
                className="grid gap-5 border-t border-[var(--color-border)] py-6 tablet:grid-cols-[0.7fr_1.3fr] tablet:items-center tablet:gap-10 tablet:py-7"
              >
                <Heading variant="h3" className="text-[var(--color-brand)]">
                  {project.campusName}
                </Heading>
                <dl className="m-0 grid grid-cols-2 gap-5">
                  <div className="border-l-2 border-[var(--color-brand)] pl-4">
                    <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                      Students served
                    </dt>
                    <dd className="m-0 font-[var(--font-heading)] text-xl font-bold text-[var(--color-text-primary)]">
                      {project.pupilReach}
                    </dd>
                  </div>
                  <div className="border-l-2 border-[var(--color-brand)] pl-4">
                    <dt className="mb-1 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                      Community reach
                    </dt>
                    <dd className="m-0 font-[var(--font-heading)] text-xl font-bold text-[var(--color-text-primary)]">
                      {project.communityReach}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section background="white" aria-labelledby="milestones-heading">
        <Container>
          <div className="mb-8 max-w-[760px] tablet:mb-10">
            <Heading
              variant="h2"
              id="milestones-heading"
              className="mb-3 text-[var(--color-text-primary)]"
            >
              Documented programme milestones
            </Heading>
            <Text variant="body-lg" className="text-[var(--color-text-secondary)]">
              Selected outcomes reported by SeedPower across education and
              community programmes.
            </Text>
          </div>

          <ul className="m-0 list-none p-0">
            {milestones.map((milestone) => (
              <li
                key={milestone.title}
                className="grid gap-3 border-t border-[var(--color-border)] py-6 tablet:grid-cols-[0.65fr_0.8fr_1.55fr] tablet:items-start tablet:gap-8 tablet:py-7"
              >
                <p className="m-0 font-[var(--font-heading)] text-2xl font-bold leading-tight text-[var(--color-brand)]">
                  {milestone.figure}
                  <span className="mt-1 block font-[var(--font-body)] text-sm font-medium text-[var(--color-text-secondary)]">
                    {milestone.label}
                  </span>
                </p>
                <Heading variant="h3" className="text-[var(--color-text-primary)]">
                  {milestone.title}
                </Heading>
                <Text variant="body" className="text-[var(--color-text-secondary)]">
                  {milestone.description}
                </Text>
              </li>
            ))}
          </ul>
          <Text variant="body" className="mt-6 max-w-[900px] text-[var(--color-text-secondary)]">
            SeedPower also reports hosting mission groups from the USA and
            other countries. The groups helped with school construction,
            student music, art and sports activities, and community outreach.
          </Text>
        </Container>
      </Section>

      <Section background="soft" aria-labelledby="gallery-heading">
        <Container>
          <Heading
            variant="h2"
            id="gallery-heading"
            className="mb-3 text-[var(--color-text-primary)]"
          >
            Impact in Pictures
          </Heading>
          <Text
            variant="body"
            className="mb-8 max-w-[720px] text-[var(--color-text-secondary)]"
          >
            The original page references photographs from January 2019 and
            March 2023, alongside school, water-project, and community images.
            The gallery includes photographs from those dated groupings.
          </Text>
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-6 tablet:grid-cols-3 desktop:grid-cols-4"
            aria-label="Impact photo gallery"
          >
            {galleryItems.map((item) => (
              <figure key={item.label} className="m-0">
                <ProgrammeImagePlaceholder
                  label={item.label}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  imageSizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="relative aspect-[4/3] w-full rounded-[var(--radius-md)]"
                />
                <figcaption className="mt-2 font-[var(--font-body)] text-sm text-[var(--color-text-secondary)]">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="brand" aria-labelledby="stories-cta-heading">
        <Container>
          <div className="flex flex-col items-start gap-6 tablet:flex-col tablet:items-start tablet:gap-6 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-10">
            <div className="max-w-[680px]">
              <Heading
                variant="h2"
                id="stories-cta-heading"
                className="mb-3 text-white"
              >
                Together We Can Change the World
              </Heading>
              <Text variant="body-lg" className="text-white/90">
                Support SeedPower’s education and community programmes.
              </Text>
            </div>
            <div className="flex flex-col gap-3 tablet:flex-row">
              <ButtonLink
                href="/give/donate"
                variant="ghost"
                size="default"
                className="shrink-0 border-white text-white hover:bg-white/10 hover:text-white"
              >
                Donate Now
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
