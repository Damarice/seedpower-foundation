/**
 * StoryCard — composite card for displaying a testimonial or success story.
 * Also called "TestimonialCard" in the Visual Design Direction.
 *
 * Visual Design Direction v2.0 — Section 2.7 (Story / Testimonial Card).
 * Architecture v1.2 — Section 4.1, Phase 4 deliverables.
 */
import React from 'react';
import { cn } from '@/lib/cn';

export interface StoryCardProps {
  /** Story or testimonial heading — rendered as an H3. */
  heading: string;
  /** Story or testimonial body text — clamped to 4 lines. */
  body: string;
  /** Optional attribution line (name, role, location). */
  attribution?: string;
  /** Optional avatar image src. Circular, 48px diameter. */
  avatarSrc?: string;
  /** Alt text for the avatar image. */
  avatarAlt?: string;
  /** Additional className applied to the outer card element. */
  className?: string;
}

export function StoryCard({
  heading,
  body,
  attribution,
  avatarSrc,
  avatarAlt,
  className,
}: StoryCardProps) {
  return (
    <article
      className={cn(
        /* Background: page white per VDD Section 2.7 */
        'bg-[var(--color-bg-page)]',
        /* Left border accent — 4px solid brand, full card height */
        'border-l-4 border-l-[var(--color-brand)]',
        /* Standard card border on remaining sides */
        'border border-[var(--color-border)]',
        'border-l-[var(--color-brand)]',
        'rounded-[var(--radius-md)]',
        'overflow-hidden',
        className
      )}
    >
      {/* Inner padding and layout */}
      <div className="p-4 tablet:p-5 desktop:p-6 flex flex-col gap-3 relative">

        {/* Optional avatar — absolute top-right, 48px diameter, circular */}
        {avatarSrc && (
          // eslint-disable-next-line @next/next/no-img-element -- avatar src is a prop; dimensions unknown at build time
          <img
            src={avatarSrc}
            alt={avatarAlt ?? ''}
            width={48}
            height={48}
            className="absolute top-4 right-4 tablet:top-5 tablet:right-5 desktop:top-6 desktop:right-6 w-12 h-12 rounded-full object-cover"
          />
        )}

        {/* Heading — H3, brand colour, Manrope 22px desktop */}
        <h3
          className={cn(
            'font-[var(--font-heading)]',
            /* 22px desktop matches VDD spec; uses text-h3 at desktop breakpoint */
            'text-[length:var(--text-h3)]',
            'leading-[var(--text-h3--lh)]',
            'font-semibold',
            'text-[var(--color-brand)]',
            /* Reserve space for avatar when present */
            avatarSrc ? 'pr-16' : '',
          )}
        >
          {heading}
        </h3>

        {/* Body — Inter 16px weight 400, primary text, max 4 lines */}
        <p
          className={cn(
            'font-[var(--font-body)]',
            'text-[length:var(--text-body)]',
            'leading-[var(--text-body--lh)]',
            'font-normal',
            'text-[var(--color-text-primary)]',
            'line-clamp-4',
          )}
        >
          {body}
        </p>

        {/* Optional attribution — Inter 13px weight 500, secondary text */}
        {attribution && (
          <p
            className={cn(
              'font-[var(--font-body)]',
              'text-[13px]',
              'font-medium',
              'text-[var(--color-text-secondary)]',
            )}
          >
            {attribution}
          </p>
        )}
      </div>
    </article>
  );
}
