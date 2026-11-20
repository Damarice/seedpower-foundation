/**
 * Contact form validation schema.
 * Used for both client-side (React Hook Form) and server-side (API route) validation.
 *
 * Architecture v1.2 — Section 8.1.
 * Field names, rules, limits, and error messages are taken verbatim from the architecture.
 */
import { z } from 'zod';

export const contactFormSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:    z.string().email('Invalid email address'),
  subject:  z.string().min(2).max(200).optional(),
  message:  z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Bot detected'), // Must be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
