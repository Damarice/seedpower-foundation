'use client';

/**
 * StoriesOfChangeSection — compact, image-led editorial story gallery.
 */
import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';

const stories = [
  {
    id: 'education',
    category: 'Education & Inclusion',
    title: 'From 12 Students to 375',
    description:
      'What began with 12 students in January 2019 has grown into two learning campuses supporting 375 children, including children with special educational needs.',
    impact: '375 children supported',
    placeholder: 'Education and inclusive classroom photography placeholder',
    href: '/what-we-do/education',
    imageSrc: '/images/programmes/inclusive-classroom-support.jpg',
    imageAlt: 'A teacher works with pupils using classroom learning materials.',
  },
  {
    id: 'women',
    category: "Women's Empowerment",
    title: 'Skills That Build Stronger Communities',
    description:
      'Through sewing, basket-making and entrepreneurship training, SeedPower has reached nearly 100 women. One women’s group also came together with community members to build a home for an elderly woman.',
    impact: 'Nearly 100 women trained',
    placeholder: "Women's empowerment and skills training photography placeholder",
    href: '/what-we-do/womens-empowerment',
    imageSrc: '/images/programmes/women-home-beneficiary.jpg',
    imageAlt: 'A woman stands outside the home built through community support.',
  },
  {
    id: 'water',
    category: 'Water & Sanitation',
    title: 'Bringing Clean Water Closer',
    description:
      'SeedPower’s school and community water projects support pupils and surrounding communities in Oyugis and Nyakach.',
    impact: 'Oyugis: 220 pupils · 360 community members',
    placeholder: 'Clean water infrastructure photography placeholder',
    href: '/what-we-do/wash',
    imageSrc: '/images/programmes/school-handwashing.jpg',
    imageAlt: 'Pupils wash their hands at an outdoor handwashing station.',
  },
] ;

export function StoriesOfChangeSection() {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="stories-of-change-heading"
      className="bg-[var(--color-bg-soft)] py-12 tablet:py-16 desktop:py-20"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-5 tablet:mb-10 tablet:flex-row tablet:items-end tablet:justify-between desktop:mb-12">
          <div className="max-w-[680px]">
            <p className="mb-3 font-[var(--font-body)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              REAL STORIES. LASTING CHANGE.
            </p>
            <h2
              id="stories-of-change-heading"
              className="mb-3 font-[var(--font-heading)] text-[length:var(--text-h2)] font-bold leading-[var(--text-h2--lh)] text-[var(--color-text-primary)]"
            >
              Stories of Change
            </h2>
            <p className="max-w-[620px] font-[var(--font-body)] text-[length:var(--text-body-lg)] leading-relaxed text-[var(--color-text-secondary)]">
              Discover the people and communities moving towards a brighter future.
            </p>
          </div>
          <ButtonLink
            href="/impact/success-stories"
            variant="ghost"
            size="default"
            className="shrink-0"
          >
            View All Stories
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-3">
          {stories.map((story) => {
            const isActive = activeStory === story.id;

            return (
              <article
                key={story.id}
                tabIndex={0}
                aria-labelledby={`${story.id}-story-title`}
                className={[
                  'group relative isolate min-h-[430px] overflow-hidden rounded-[var(--radius-lg)]',
                  'border border-[var(--color-border)] bg-[var(--color-bg-warm)]',
                  'outline-none',
                  '[@media(hover:hover)]:hover:border-[var(--color-brand)]',
                  '[@media(hover:hover)]:hover:shadow-[var(--shadow-card)]',
                  'transition-[border-color,box-shadow] duration-[var(--transition-std)]',
                  'motion-reduce:transition-none',
                  isActive ? 'border-[var(--color-brand)] shadow-[var(--shadow-card)]' : '',
                ].join(' ')}
              >
                {story.imageSrc ? (
                  <Image
                    src={story.imageSrc}
                    alt={story.imageAlt ?? ''}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className={[
                      'object-cover',
                      '[transition:transform_var(--transition-slow)]',
                      '[@media(hover:hover)]:group-hover:scale-[1.025]',
                      '[@media(hover:hover)]:group-focus-within:scale-[1.025]',
                      isActive ? 'scale-[1.025]' : '',
                    ].join(' ')}
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={story.placeholder}
                    className={[
                      'absolute inset-0 flex items-center justify-center',
                      'bg-[radial-gradient(ellipse_at_72%_24%,rgba(255,255,255,0.78),transparent_38%),linear-gradient(145deg,var(--color-bg-warm),var(--color-bg-soft))]',
                      'text-[var(--color-text-secondary)]',
                    ].join(' ')}
                  >
                    <span className="max-w-[210px] px-6 text-center text-sm font-medium">
                      {story.placeholder}
                    </span>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className={[
                    'absolute inset-0',
                    'bg-[linear-gradient(180deg,rgba(20,32,15,0.06)_18%,rgba(20,32,15,0.68)_100%)]',
                    '[@media(hover:hover)]:group-hover:bg-[linear-gradient(180deg,rgba(20,32,15,0.12)_8%,rgba(20,32,15,0.82)_100%)]',
                    '[@media(hover:hover)]:group-focus-within:bg-[linear-gradient(180deg,rgba(20,32,15,0.12)_8%,rgba(20,32,15,0.82)_100%)]',
                    'transition-[background] duration-[var(--transition-slow)]',
                    isActive
                      ? 'bg-[linear-gradient(180deg,rgba(20,32,15,0.12)_8%,rgba(20,32,15,0.82)_100%)]'
                      : '',
                  ].join(' ')}
                />

                <button
                  type="button"
                  aria-label={`${isActive ? 'Close' : 'Reveal'} details for ${story.title}`}
                  aria-expanded={isActive}
                  aria-controls={`${story.id}-story-details`}
                  onClick={() => setActiveStory(isActive ? null : story.id)}
                  className={[
                    'absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center',
                    'rounded-full border border-white/60 bg-[rgba(20,32,15,0.72)] text-white',
                    'text-xl leading-none backdrop-blur-sm',
                    'transition-colors duration-[var(--transition-std)]',
                    'hover:bg-[var(--color-brand)]',
                  ].join(' ')}
                >
                  <span aria-hidden="true">{isActive ? '−' : '+'}</span>
                </button>

                <div
                  id={`${story.id}-story-details`}
                  className={[
                    'absolute inset-x-0 bottom-0 z-10 p-6 text-white',
                    '[@media(hover:hover)]:group-hover:translate-y-0',
                    '[@media(hover:hover)]:group-focus-within:translate-y-0',
                    isActive ? 'translate-y-0' : 'translate-y-[calc(100%-112px)]',
                    'transition-transform duration-[var(--transition-slow)] ease-out',
                    'motion-reduce:transition-none',
                  ].join(' ')}
                >
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
                    {story.category}
                  </p>
                  <h3
                    id={`${story.id}-story-title`}
                    className="mb-3 max-w-[330px] font-[var(--font-heading)] text-[22px] font-bold leading-[1.2] text-white"
                  >
                    {story.title}
                  </h3>
                  <div
                    className={[
                      'opacity-0',
                      '[@media(hover:hover)]:group-hover:opacity-100',
                      '[@media(hover:hover)]:group-focus-within:opacity-100',
                      'transition-opacity duration-[var(--transition-slow)]',
                      'motion-reduce:transition-none',
                      isActive ? 'opacity-100' : '',
                    ].join(' ')}
                  >
                    <p className="mb-3 text-sm leading-[1.55] text-white/95">
                      {story.description}
                    </p>
                    <p className="mb-4 text-sm font-semibold text-white">
                      {story.impact}
                    </p>
                    <ButtonLink
                      href={story.href}
                      variant="ghost"
                      size="sm"
                      className="!border-white !text-white hover:!bg-white/10"
                    >
                      Explore Story
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
