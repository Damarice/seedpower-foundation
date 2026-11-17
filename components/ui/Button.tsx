/**
 * Button — interactive action element.
 * Three variants: primary, secondary, ghost.
 * Two sizes: default, sm.
 *
 * Use Button for actions (form submit, toggle, etc.).
 * Use ButtonLink for navigation.
 *
 * Visual Design Direction v2.0 — Section 2.5.
 * Architecture v1.2 — Section 4.2.
 */
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
}

const variantStyles = {
  primary: [
    'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
    'hover:bg-[var(--color-brand-hover)]',
    'active:bg-[var(--color-brand-active)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]',
    'hover:bg-[var(--color-bg-dark-hover)]',
    'active:bg-[var(--color-bg-dark-active)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--color-brand)]',
    'border-2 border-[var(--color-brand)]',
    'hover:bg-[var(--color-brand-surface)]',
    'active:bg-[var(--color-brand-active-surface)]',
  ].join(' '),
} satisfies Record<string, string>;

const sizeStyles = {
  default: 'px-6 py-3 text-base font-semibold',
  sm: 'px-4 py-2 text-sm font-semibold',
} satisfies Record<string, string>;

/** Ghost buttons reduce padding by 2px each axis to account for the 2px border. */
const ghostSizeStyles = {
  default: 'px-[22px] py-[10px] text-base font-semibold',
  sm: 'px-[14px] py-[6px] text-sm font-semibold',
} satisfies Record<string, string>;

const baseStyles = [
  'inline-flex items-center justify-center',
  'rounded-[var(--radius-sm)]',
  'transition-colors duration-[var(--transition-std)]',
  'min-h-[var(--touch-target-min)]',
  'cursor-pointer',
  /* Focus ring */
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-[color:var(--focus-ring-color)]',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
  /* Disabled state */
  'disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]',
  'disabled:cursor-not-allowed disabled:border-[var(--color-bg-disabled)]',
  'disabled:pointer-events-none',
].join(' ');

export function Button({
  variant = 'primary',
  size = 'default',
  className,
  children,
  ...props
}: ButtonProps) {
  const resolvedSize =
    variant === 'ghost' ? ghostSizeStyles[size] : sizeStyles[size];

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], resolvedSize, className)}
      {...props}
    >
      {children}
    </button>
  );
}
