/**
 * ImpactCard — composite card for displaying a statistic/impact figure.
 * Also called "StatCard" in the Visual Design Direction.
 *
 * Visual Design Direction v2.0 — Section 2.7 (Impact / Statistics Card).
 * Architecture v1.2 — Section 4.1, Phase 4 deliverables.
 *
 * Statistics passed to this component must come from confirmed content only.
 * No values are hardcoded here.
 */
import React from 'react';
import { cn } from '@/lib/cn';

export interface ImpactCardProps {
  /** The statistic or headline figure (e.g. "375", "2018", "1,738+"). */
  figure: string;
  /** Descriptive label for the figure (e.g. "Students supported"). */
  label: string;
  /**
   * Optional SVG icon element.
   * Rendered at 32px (--icon-size-lg); colour is brand green via CSS.
   */
  icon?: React.ReactNode;
  /** Additional className applied to the outer card element. */
  className?: string;
}

export function ImpactCard({ figure, label, icon, className }: ImpactCardProps) {
  return (
    <div
      className={cn(
        /* Background: warm off-white per VDD Section 2.7 */
        'bg-[var(--color-bg-warm)]',
        'rounded-[var(--radius-md)]',
        /* No border, no shadow per VDD Section 2.7 */
        'p-4 tablet:p-5 desktop:p-6',
        'flex flex-col items-start gap-2',
        className
      )}
    >
      {/* Optional icon — 32px, brand colour */}
      {icon && (
        <span
          className="text-[var(--color-brand)]"
          aria-hidden="true"
          style={{ width: 'var(--icon-size-lg)', height: 'var(--icon-size-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {icon}
        </span>
      )}

      {/* Statistic figure — Manrope 40px desktop / 32px mobile, weight 700, brand colour */}
      <p
        className={cn(
          'font-[var(--font-heading)]',
          /* Mobile: 32px, Desktop: 40px — responsive via tokens */
          'text-[2rem]',
          'desktop:text-[2.5rem]',
          'font-bold',
          'leading-none',
          'text-[var(--color-brand)]',
        )}
        aria-label={`${figure} — ${label}`}
      >
        {figure}
      </p>

      {/* Label — Inter 14px, weight 500, primary text colour */}
      <p
        className={cn(
          'font-[var(--font-body)]',
          'text-[0.875rem]',
          'font-medium',
          'leading-snug',
          'text-[var(--color-text-primary)]',
        )}
      >
        {label}
      </p>
    </div>
  );
}
