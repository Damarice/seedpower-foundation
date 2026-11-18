/**
 * ImpactStatsSection — homepage impact statistics section.
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section 4).
 * Architecture v1.2 — Phase 5 deliverables.
 * 
 * Only displays confirmed figures from discovery documentation.
 */
import React from 'react';
import { Container } from '@/components/layout/Container';
import { ImpactCard, type ImpactCardProps } from '@/components/composite/ImpactCard';

interface ImpactStatsSectionProps {
  /** Array of confirmed statistics to display */
  stats: ImpactCardProps[];
}

export function ImpactStatsSection({ stats }: ImpactStatsSectionProps) {
  return (
    <section aria-label="Our impact" className="bg-[var(--color-bg-warm)] py-12 tablet:py-16">
      <Container>
        <div
          className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 
                     gap-6 tablet:gap-8"
        >
          {stats.map((stat, index) => (
            <ImpactCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
