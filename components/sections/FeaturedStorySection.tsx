/**
 * FeaturedStorySection — homepage featured story/impact narrative.
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section 6).
 * Architecture v1.2 — Phase 5 deliverables.
 * 
 * Two-column layout: image left (60%), content right (40%) on desktop.
 * Stacked on mobile.
 */
import React from 'react';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';

interface FeaturedStorySectionProps {
  /** Story heading */
  heading: string;
  /** Story text content (2-3 paragraphs) */
  content: string;
  /** Optional image source */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Link to success stories page */
  ctaHref: string;
}

export function FeaturedStorySection({
  heading,
  content,
  imageSrc,
  imageAlt,
  ctaHref,
}: FeaturedStorySectionProps) {
  return (
    <section aria-labelledby="featured-story-heading" className="bg-[var(--color-bg-page)] py-12 tablet:py-16">
      <Container>
        <div
          className="flex flex-col desktop:flex-row gap-8 desktop:gap-12 
                     items-center"
        >
          {/* Image (60% desktop, full width mobile) */}
          <div className="w-full desktop:w-[60%]">
            {imageSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageSrc}
                alt={imageAlt ?? ''}
                className="w-full h-auto rounded-[var(--radius-lg)] object-cover"
              />
            ) : (
              /* Placeholder — review state only; remove when image asset is provided */
              <div
                className="w-full aspect-[4/3] bg-[var(--color-bg-soft)] 
                           rounded-[var(--radius-lg)] flex items-center 
                           justify-center"
                role="img"
                aria-label={imageAlt ?? `Image for: ${heading}`}
              >
                <span className="text-[var(--color-text-secondary)] text-sm">
                  Image pending
                </span>
              </div>
            )}
          </div>

          {/* Content (40% desktop) */}
          <div className="w-full desktop:w-[40%] flex flex-col gap-4">
            <h2
              id="featured-story-heading"
              className="font-[var(--font-heading)] text-[length:var(--text-h2)] 
                         font-bold text-[var(--color-text-primary)]"
            >
              {heading}
            </h2>

            <p
              className="font-[var(--font-body)] text-[length:var(--text-body)] 
                         text-[var(--color-text-primary)] leading-[1.65]"
            >
              {content}
            </p>

            <div className="mt-2">
              <ButtonLink href={ctaHref} variant="ghost" size="default" aria-label="More success stories">
                More Stories
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
