/**
 * GetInvolvedCTA — homepage "Get Involved" CTA section.
 * Visual Design Direction v2.0 — Section 3.2 (Homepage Section 7).
 * Architecture v1.2 — Phase 5 deliverables.
 * 
 * Three equal columns: Donate, Volunteer, Sponsor a Child.
 * Each with icon, heading, description, and white ghost button.
 */
import React from 'react';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';

interface GetInvolvedColumn {
  /** Column title */
  title: string;
  /** One-sentence description */
  description: string;
  /** Link destination */
  href: string;
  /** Button text */
  buttonText: string;
  /** SVG icon (inline) */
  icon: React.ReactNode;
}

interface GetInvolvedCTAProps {
  columns: [GetInvolvedColumn, GetInvolvedColumn, GetInvolvedColumn];
}

export function GetInvolvedCTA({ columns }: GetInvolvedCTAProps) {
  return (
    <section
      aria-labelledby="get-involved-heading"
      className="bg-[var(--color-brand)] py-12 tablet:py-16"
      style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}
    >
      <Container>
        {/* Visually hidden heading provides accessible section name */}
        <h2
          id="get-involved-heading"
          className="sr-only"
        >
          Get Involved
        </h2>
        <div
          className="grid grid-cols-1 tablet:grid-cols-3 gap-8 tablet:gap-12"
        >
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              {/* Icon (32px, white) */}
              <div
                className="text-white w-8 h-8 flex items-center justify-center"
                aria-hidden="true"
              >
                {column.icon}
              </div>

              {/* Heading (white, Manrope 20px) */}
              <h3
                className="font-[var(--font-heading)] text-[20px] font-semibold 
                           text-white"
              >
                {column.title}
              </h3>

              {/* Description (white, Inter 15px) */}
              <p className="font-[var(--font-body)] text-[15px] text-white">
                {column.description}
              </p>

              {/* Ghost button (white outline variant) */}
              <ButtonLink
                href={column.href}
                variant="ghost"
                size="default"
                className="border-white text-white hover:bg-white/10"
              >
                {column.buttonText}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
