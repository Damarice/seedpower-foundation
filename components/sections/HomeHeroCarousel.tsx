'use client';

import { useEffect, useState, type FocusEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';

interface HeroSlide {
  headline: string;
  description: string;
  cta: string;
  href: string;
  imageAlt: string;
  imageSrc: string;
}

const slides: HeroSlide[] = [
  {
    headline: 'Every potential deserves a chance to shine.',
    description:
      'We empower vulnerable children, families and communities through education, opportunity and care.',
    cta: 'Discover Our Mission',
    href: '/who-we-are',
    imageAlt: 'Pupils and staff gather for an outdoor school assembly.',
    imageSrc: '/images/programmes/school-gathering.jpg',
  },
  {
    headline: 'Opening doors to brighter futures.',
    description:
      'We create inclusive learning opportunities that help children reach their full potential.',
    cta: 'Explore Our Schools',
    href: '/what-we-do/education',
    imageAlt: 'Children in school uniforms play outdoors at school.',
    imageSrc: '/images/programmes/pupils-playing-at-school.jpg',
  },
  {
    headline: 'Empowered people. Stronger communities.',
    description:
      'We equip individuals and communities with knowledge, opportunities and the support to create lasting change.',
    cta: 'Explore Our Programmes',
    href: '/what-we-do',
    imageAlt: 'Children and adults perform a cultural dance outdoors.',
    imageSrc: '/images/programmes/community-cultural-dance.jpg',
  },
];

export function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const slide = slides[activeIndex];

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isHovered || isFocused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeIndex, isFocused, isHovered, prefersReducedMotion]);

  if (!slide) {
    throw new Error(`Hero carousel slide index ${activeIndex} is out of range.`);
  }

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <section
      aria-label="Homepage highlights"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleBlur}
      className="home-hero relative isolate overflow-hidden bg-[var(--color-bg-dark)] outline-none focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-[color:var(--focus-ring-color)] focus-visible:outline-offset-[-4px]"
    >
      {slides.map((item, index) => (
        <div
          key={item.headline}
          aria-hidden="true"
          className={`absolute inset-0 -z-20 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="100vw"
            fetchPriority={index === activeIndex ? 'high' : undefined}
            className="object-cover object-center"
          />
        </div>
      ))}
      <div
        role="img"
        aria-label={slide.imageAlt}
        className="sr-only"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#14200f]/78 via-[#1a2713]/58 via-45% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(20,32,15,0.18),transparent_36%)] desktop:bg-none"
      />

      <div className="mx-auto flex min-h-[inherit] w-full max-w-[var(--container-max)] flex-col justify-center px-[var(--container-padding-mobile)] pb-24 pt-8 tablet:px-[var(--container-padding-tablet)] tablet:pb-28">
        <div
          key={activeIndex}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${slides.length}`}
          aria-live="polite"
          className="max-w-[620px] motion-safe:animate-[hero-fade-in_600ms_ease-out]"
        >
          <h1 className="mb-6 max-w-[590px] font-[var(--font-heading)] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-white tablet:text-[44px] desktop:mb-7 desktop:text-[56px] wide:text-[64px]">
            {slide.headline}
          </h1>
          <p className="mb-0 max-w-[520px] font-[var(--font-body)] text-base leading-[1.7] text-white/90 tablet:text-lg">
            {slide.description}
          </p>
          <div className="mt-10 tablet:mt-12">
            <ButtonLink
              href={slide.href}
              variant="primary"
              className="!px-4 !py-3 !text-sm tablet:!px-6 tablet:!text-base"
            >
              {slide.cta}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-label="Carousel controls"
        className="absolute inset-x-0 bottom-5 mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between px-[var(--container-padding-mobile)] tablet:bottom-7 tablet:px-[var(--container-padding-tablet)]"
      >
        <div role="group" aria-label="Choose a slide" className="flex items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.headline}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => showSlide(index)}
              className={`h-3 rounded-full transition-[width,background-color] duration-[var(--transition-std)] motion-reduce:transition-none focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-white focus-visible:outline-offset-2 ${
                index === activeIndex
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/55 hover:bg-white/85'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => showSlide(activeIndex - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/55 text-white transition-colors duration-[var(--transition-std)] hover:bg-white/15 motion-reduce:transition-none focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
              <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => showSlide(activeIndex + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/55 text-white transition-colors duration-[var(--transition-std)] hover:bg-white/15 motion-reduce:transition-none focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
              <path d="M5 12h14m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
