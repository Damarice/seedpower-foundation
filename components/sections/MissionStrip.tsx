/**
 * MissionStrip — single-line mission statement section for homepage.
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section 3).
 * Architecture v1.2 — Phase 5 deliverables.
 */
import React from 'react';
import { Container } from '@/components/layout/Container';

interface MissionStripProps {
  /** Mission statement text */
  text: string;
}

export function MissionStrip({ text }: MissionStripProps) {
  return (
    <section aria-label="Our mission" className="bg-[var(--color-bg-soft)] py-8">
      <Container>
        <p
          className="text-center font-[var(--font-body)] text-[18px] font-normal 
                     text-[var(--color-text-primary)] max-w-[900px] mx-auto"
        >
          {text}
        </p>
      </Container>
    </section>
  );
}
