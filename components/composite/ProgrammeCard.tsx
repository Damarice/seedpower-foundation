/**
 * ProgrammeCard — composite card for displaying a programme.
 * Reuses Card (base styles, hover shadow) and ButtonLink (CTA).
 *
 * Visual Design Direction v2.0 — Section 2.7 (Programme Card).
 * Architecture v1.2 — Section 4.1, Phase 4 deliverables.
 *
 * Uses responsive Next.js images when a verified asset is available and
 * retains the existing placeholder for unmatched programme areas.
 *
 * Server Component — hover scale effect is handled via CSS group utility
 * rather than useState, eliminating the need for 'use client'.
 */
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/ButtonLink';

export interface ProgrammeCardStat {
  label: string;
}

export interface ProgrammeCardProps {
  /** Programme name — rendered as an H3. */
  title: string;
  /** Programme description. */
  description: string;
  /** Approved impact detail displayed beneath the description. */
  impactDetail?: string;
  /** Programme status, when applicable. */
  status?: string;
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

export function ProgrammeCard({
  title,
  description,
  impactDetail,
  status,
  stats,
  href,
  imageSrc,
  imageAlt,
  className,
}: ProgrammeCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)]',
        'bg-[var(--color-bg-page)]',
        'border border-[var(--color-border)]',
        '[transition:transform_var(--transition-std),border-color_var(--transition-std),box-shadow_var(--transition-std)]',
        '[@media(hover:hover)]:hover:-translate-y-1',
        '[@media(hover:hover)]:hover:border-[var(--color-brand)]',
        '[@media(hover:hover)]:hover:shadow-[var(--shadow-card)]',
        className
      )}
    >
      {/* ── Image area ──────────────────────────────────────────── */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-bg-soft)]"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover [transition:transform_var(--transition-slow)] group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_78%_32%,rgba(255,255,255,0.7),transparent_38%),linear-gradient(135deg,var(--color-bg-warm),var(--color-bg-soft))]"
            role="img"
            aria-label={imageAlt ?? `Photo placeholder for ${title}`}
          >
            <span className="flex flex-col items-center gap-2 text-center text-[var(--color-text-secondary)]">
              <svg
                className="h-8 w-8 text-[var(--color-brand)]/70"
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
              <span className="text-xs font-medium uppercase tracking-[0.12em]">
                Photo placeholder
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ── Content area ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-start p-4 tablet:p-5">
        <h3
          className={cn(
            'mb-2 font-[var(--font-heading)] text-[length:var(--text-h3)]',
            'leading-[var(--text-h3--lh)] font-semibold text-[var(--color-brand)]'
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            'font-[var(--font-body)] text-[length:var(--text-body)]',
            'leading-[var(--text-body--lh)] text-[var(--color-text-primary)]'
          )}
        >
          {description}
        </p>

        {(impactDetail || status || (stats && stats.length > 0)) && (
          <p
            className={cn(
              'mt-4 font-[var(--font-body)] text-sm font-semibold',
              status && !impactDetail && (!stats || stats.length === 0)
                ? 'rounded-full bg-[var(--color-bg-warm)] px-3 py-1 text-[var(--color-brand)]'
                : 'text-[var(--color-text-secondary)]'
            )}
            aria-label={status ? 'Programme status' : 'Programme impact'}
          >
            {impactDetail ?? (stats?.length ? stats.map((s) => s.label).join(' · ') : status)}
          </p>
        )}

        <div className="mt-auto pt-4">
          <ButtonLink href={href} variant="ghost" size="sm" aria-label={`Learn more about ${title}`}>
            Learn More
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
