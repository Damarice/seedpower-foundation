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
    <section aria-labelledby="programmes-heading" className="bg-[var(--color-bg-page)] py-12 tablet:py-16">
      <Container>
        {/* Heading and subheading */}
        <div className="text-center mb-8 tablet:mb-12">
          <h2
            id="programmes-heading"
            className="font-[var(--font-heading)] text-[length:var(--text-h2)] 
                       font-bold text-[var(--color-text-primary)] mb-2"
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="font-[var(--font-body)] text-[18px] 
                         text-[var(--color-text-secondary)] max-w-[600px] mx-auto"
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Programme grid */}
        <div
          className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 
                     gap-6 tablet:gap-8"
        >
          {programmes.map((programme, index) => (
            <ProgrammeCard key={index} {...programme} />
          ))}
        </div>

        {/* Optional "View all" button */}
        {viewAllHref && (
          <div className="text-center mt-8 tablet:mt-12">
            <ButtonLink href={viewAllHref} variant="ghost" size="default">
              View All Programmes
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
