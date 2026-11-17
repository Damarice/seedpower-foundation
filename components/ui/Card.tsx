/**
 * Card — base card wrapper.
 * Flat by default; shadow on hover.
 * Visual Design Direction v2.0 — Section 2.7.
 */
import type { CSSProperties, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Polymorphic element type. Defaults to 'div'. */
  as?: ElementType;
}

const baseStyles = [
  'bg-[var(--color-bg-page)]',
  'border border-[var(--color-border)]',
  'rounded-[var(--radius-md)]',
  'shadow-[var(--shadow-none)]',
  'hover:shadow-[var(--shadow-card)]',
  /* Responsive padding: 16px mobile, 20px tablet, 24px desktop */
  'p-4',
  'tablet:p-5',
  'desktop:p-6',
  'overflow-hidden',
].join(' ');

const cardTransition: CSSProperties = {
  transition: 'box-shadow var(--transition-std)',
};

export function Card({
  as: Tag = 'div',
  className,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(baseStyles, className)}
      style={{ ...cardTransition, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
