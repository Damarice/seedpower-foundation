/**
 * ProgrammeCard — composite card for displaying a programme.
 * Reuses Card (base styles, hover shadow) and ButtonLink (CTA).
 *
 * Visual Design Direction v2.0 — Section 2.7 (Programme Card).
 * Architecture v1.2 — Section 4.1, Phase 4 deliverables.
 *
 * Images are not yet available; a placeholder div is used for the
 * image area until assets are provided.
 */
'use client';

import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/ButtonLink';

export interface ProgrammeCardStat {
  label: string;
}

export interface ProgrammeCardProps {
  /** Programme name — rendered as an H3. */
  title: string;
  /** Programme description — clamped to 3 lines. */
  description: string;
  /** Optional 2–3 key figures displayed beneath the description. */
  stats?: ProgrammeCardStat[];
  /** Internal href for the programme page. */
  href: string;
  /** Optional image src. When absent, a placeholder is shown. */
  imageSrc?: string;
  /** Alt text for the image (required when imageSrc is provided). */
  imageAlt?: string;
  /** Additional className applied to the outer card element. */
  className?: string;
}

/**
 * Inline style for the image wrapper using CSS custom property
 * aspect ratios (4:3 desktop, 16:9 mobile).  Tailwind 4 does not
 * generate arbitrary `aspect-ratio` utilities from CSS variables,
 * so we fall back to explicit Tailwind classes and inline override.
 */
const imageWrapperStyles: CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
};

export function ProgrammeCard({
  title,
  description,
  stats,
  href,
  imageSrc,
  imageAlt,
  className,
}: ProgrammeCardProps) {
  const [imageScale, setImageScale] = useState(false);

  return (
    <article
      className={cn(
        /* Base card — no padding here; padding is managed per-zone below */
        'bg-[var(--color-bg-page)]',
        'border border-[var(--color-border)]',
        'rounded-[var(--radius-md)]',
        'overflow-hidden',
        className
      )}
      style={{ transition: 'box-shadow var(--transition-std)' }}
      onMouseEnter={() => setImageScale(true)}
      onMouseLeave={() => setImageScale(false)}
      onFocusCapture={() => setImageScale(true)}
      onBlurCapture={() => setImageScale(false)}
    >
      {/* ── Image area ──────────────────────────────────────────── */}
      {/* Mobile: 16:9 aspect ratio; Desktop: 4:3 (via CSS override) */}
      <div
        className="aspect-video desktop:aspect-[4/3] w-full"
        style={imageWrapperStyles}
      >
        {imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={imageAlt ?? ''}
            className="w-full h-full object-cover"
            style={{
              transform: imageScale ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform var(--transition-slow)',
            }}
          />
        ) : (
          /* Placeholder — shown until image assets are provided */
          <div
            className="w-full h-full bg-[var(--color-bg-soft)]"
            role="img"
            aria-label={imageAlt ?? `${title} programme`}
            style={{
              transform: imageScale ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform var(--transition-slow)',
            }}
          />
        )}
      </div>

      {/* ── Content area ────────────────────────────────────────── */}
      <div className="p-4 tablet:p-5 desktop:p-6 flex flex-col gap-3">

        {/* Programme name — H3, brand colour, Manrope 24px desktop */}
        <h3
          className={cn(
            'font-[var(--font-heading)]',
            'text-[length:var(--text-h3)]',
            'leading-[var(--text-h3--lh)]',
            'font-semibold',
            'text-[var(--color-brand)]',
          )}
        >
          {title}
        </h3>

        {/* Description — Inter body, max 3 lines */}
        <p
          className={cn(
            'font-[var(--font-body)]',
            'text-[length:var(--text-body)]',
            'leading-[var(--text-body--lh)]',
            'text-[var(--color-text-primary)]',
            'line-clamp-3',
          )}
        >
          {description}
        </p>

        {/* Stats row — 2–3 key figures */}
        {stats && stats.length > 0 && (
          <p
            className={cn(
              'font-[var(--font-body)]',
              'text-[13px]',
              'font-medium',
              'text-[var(--color-text-secondary)]',
            )}
            aria-label="Programme statistics"
          >
            {stats.map((s) => s.label).join(' · ')}
          </p>
        )}

        {/* CTA — Ghost ButtonLink, left-aligned */}
        <div className="mt-auto pt-1">
          <ButtonLink href={href} variant="ghost" size="sm">
            Learn More
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
