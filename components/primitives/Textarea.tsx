/**
 * Base textarea primitive.
 * Unstyled; accepts all standard HTML textarea attributes.
 * Style via className from consuming components.
 * Visual Design Direction v2.0 — Section 2.8.
 */
import type { TextareaHTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={className} {...props} />;
}
