/**
 * Base input primitive.
 * Unstyled; accepts all standard HTML input attributes.
 * Style via className from consuming components.
 * Visual Design Direction v2.0 — Section 2.8.
 */
import type { InputHTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return <input className={className} {...props} />;
}
