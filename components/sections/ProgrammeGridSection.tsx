/**
 * ProgrammeGridSection — homepage "What We Do" programme grid.
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section 5).
 * Architecture v1.2 — Phase 5 deliverables.
 */
import React from 'react';
import { Container } from '@/components/layout/Container';
import { ProgrammeCard, type ProgrammeCardProps } from '@/components/composite/ProgrammeCard';
import { ButtonLink } from '@/components/ui/ButtonLink';

interface ProgrammeGridSectionProps {
  /** Section heading */
  heading: string;
  /** Optional subheading (1 line maximum) */
  subheading?: string;
  /** Array of programmes to display (up to 6 on homepage) */
  programmes: ProgrammeCardProps[];
  /** Optional "View all" link */
  viewAllHref?: string;
}

export function ProgrammeGridSection({
  heading,
  subheading,
  programmes,
  viewAllHref,
}: ProgrammeGridSectionProps) {
  return (
    <section
      aria-labelledby="programmes-heading"
      className="bg-[var(--color-bg-page)] py-12 tablet:py-16"
    >
      <Container>
        <div className="mb-8 max-w-[680px] tablet:mb-10">
          <h2
            id="programmes-heading"
            className="mb-3 font-[var(--font-heading)] text-[length:var(--text-h2)] font-bold text-[var(--color-text-primary)]"
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="max-w-[600px] font-[var(--font-body)] text-[length:var(--text-body-lg)] leading-relaxed text-[var(--color-text-secondary)]"
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Programme grid */}
        <div
          className="grid auto-rows-fr grid-cols-1 items-stretch gap-5 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-3 desktop:gap-7"
        >
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.href} {...programme} />
          ))}
        </div>

        {/* Optional "View all" button */}
        {viewAllHref && (
          <div className="mt-8 tablet:mt-10">
            <ButtonLink href={viewAllHref} variant="ghost" size="default">
              View All Programmes
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
