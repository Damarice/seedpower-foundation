/**
 * ContactForm — full contact form component.
 * Level 3 Composite component (Architecture v1.2 Section 4.1).
 *
 * Uses React Hook Form with zodResolver for client-side validation.
 * Schema and type are imported from lib/validation.ts — not duplicated here.
 *
 * Submission target: POST /api/contact (Phase 7C deliverable).
 * API contract (Architecture v1.2 Section 8.2):
 *   Request body: { name, email, subject?, message, honeypot }
 *   Success response: { success: true, message: string }
 *   Error response:   { error: string }
 *   Rate limit:       HTTP 429 with { error: string }
 *   Validation error: HTTP 400 with { error: string }
 *
 * Honeypot: hidden via CSS positioning per Architecture Section 8.4.
 *   Must NOT use display:none or visibility:hidden (detectable by bots).
 *   Field and label carry aria-hidden="true" to suppress screen reader output.
 *
 * Visual Design Direction v2.0 — Section 2.8 (Forms).
 * Architecture v1.2 — Sections 8.1, 8.4, 13.
 */
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/cn';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

/* ── Shared style helpers ──────────────────────────────────────────── */

/** VDD Section 2.8 — input base styles */
const inputBase = [
  'w-full px-[14px] py-3',
  'text-base text-[var(--color-text-primary)] bg-white',
  'border border-[var(--color-border)] rounded-[var(--radius-sm)]',
  'placeholder:text-[var(--color-text-placeholder)]',
  'min-h-[var(--touch-target-min)]',
  'transition-shadow duration-[var(--transition-fast)]',
  'focus:border-[var(--color-brand)] focus:outline-none',
  'focus:shadow-[0_0_0_3px_rgba(45,80,22,0.15)]',
].join(' ');

const inputError = [
  'border-[var(--color-error)]',
  'focus:border-[var(--color-error)]',
  'focus:shadow-[0_0_0_3px_rgba(185,28,28,0.15)]',
].join(' ');

const labelBase = [
  'block text-sm font-medium text-[var(--color-text-primary)] mb-1.5',
].join(' ');

const errorBase = [
  'flex items-center gap-1 text-xs text-[var(--color-error)] mt-1',
].join(' ');

/* ── ErrorMessage ──────────────────────────────────────────────────── */

function ErrorIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className={errorBase}>
      <ErrorIcon />
      {message}
    </p>
  );
}

/* ── ContactForm ───────────────────────────────────────────────────── */

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { honeypot: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json: { success?: boolean; message?: string; error?: string } =
        await response.json();

      if (response.ok && json.success) {
        setStatus('success');
        // The API acknowledges receipt but does not deliver email.
        setServerMessage(
          json.message ?? 'Your message has been received.'
        );
        reset();
      } else {
        setStatus('error');
        // Surface the server's error message, never a stack trace
        setServerMessage(
          json.error ?? 'Something went wrong. Please try again.'
        );
      }
    } catch {
      // Network failure or non-JSON response
      setStatus('error');
      setServerMessage(
        'Unable to send your message. Please check your connection and try again.'
      );
    }
  };

  /* ── Success state ──── */
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={[
          'p-6 rounded-[var(--radius-md)]',
          'bg-[var(--color-brand-surface)]',
          'border border-[var(--color-brand)]',
        ].join(' ')}
      >
        <p className="font-semibold text-[var(--color-brand)] mb-1">
          Message received
        </p>
        <p className="text-sm text-[var(--color-text-primary)]">
          {serverMessage}
        </p>
      </div>
    );
  }

  /* ── Form ──── */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact SeedPower Foundation"
    >
      {/* ── Server error banner ── */}
      {status === 'error' && serverMessage && (
        <div
          role="alert"
          className={[
            'mb-6 p-4 rounded-[var(--radius-sm)]',
            'bg-[rgba(185,28,28,0.08)] border border-[var(--color-error)]',
            'text-sm text-[var(--color-error)]',
          ].join(' ')}
        >
          {serverMessage}
        </div>
      )}

      <div className="flex flex-col gap-5">

        {/* ── Name ── */}
        <div>
          <label htmlFor="contact-name" className={labelBase}>
            Name <span aria-hidden="true" className="text-[var(--color-error)]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            aria-invalid={errors.name ? 'true' : undefined}
            placeholder="Your name"
            className={cn(inputBase, errors.name && inputError)}
            {...register('name')}
          />
          {errors.name && (
            <FieldError id="contact-name-error" message={errors.name.message ?? ''} />
          )}
        </div>

        {/* ── Email ── */}
        <div>
          <label htmlFor="contact-email" className={labelBase}>
            Email <span aria-hidden="true" className="text-[var(--color-error)]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            aria-invalid={errors.email ? 'true' : undefined}
            placeholder="your@email.com"
            className={cn(inputBase, errors.email && inputError)}
            {...register('email')}
          />
          {errors.email && (
            <FieldError id="contact-email-error" message={errors.email.message ?? ''} />
          )}
        </div>

        {/* ── Subject (optional) ── */}
        <div>
          <label htmlFor="contact-subject" className={labelBase}>
            Subject{' '}
            <span className="text-[var(--color-text-secondary)] font-normal text-xs">
              (optional)
            </span>
          </label>
          <input
            id="contact-subject"
            type="text"
            autoComplete="off"
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            aria-invalid={errors.subject ? 'true' : undefined}
            placeholder="What is your enquiry about?"
            className={cn(inputBase, errors.subject && inputError)}
            {...register('subject', {
              // Convert empty string to undefined so the optional Zod field
              // receives undefined (absent) rather than "" (fails min(2)).
              setValueAs: (v: string) => v === '' ? undefined : v,
            })}
          />
          {errors.subject && (
            <FieldError id="contact-subject-error" message={errors.subject.message ?? ''} />
          )}
        </div>

        {/* ── Message ── */}
        <div>
          <label htmlFor="contact-message" className={labelBase}>
            Message <span aria-hidden="true" className="text-[var(--color-error)]">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            aria-required="true"
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            aria-invalid={errors.message ? 'true' : undefined}
            placeholder="Your message (at least 10 characters)"
            className={cn(
              inputBase,
              'min-h-[120px] resize-y',
              errors.message && inputError
            )}
            {...register('message')}
          />
          {errors.message && (
            <FieldError id="contact-message-error" message={errors.message.message ?? ''} />
          )}
        </div>

        {/* ── Honeypot — hidden from sighted users, available for server-side bot detection ── */}
        {/* Architecture Section 8.4: use CSS positioning, NOT display:none or visibility:hidden */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          <label htmlFor="contact-honeypot" aria-hidden="true">
            Leave this field empty
          </label>
          <input
            id="contact-honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            {...register('honeypot')}
          />
        </div>

        {/* ── Submit ── */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              'inline-flex items-center justify-center',
              'rounded-[var(--radius-sm)]',
              'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
              'px-6 py-3 text-base font-semibold',
              'min-h-[var(--touch-target-min)]',
              'transition-colors duration-[var(--transition-std)]',
              'hover:bg-[var(--color-brand-hover)]',
              'active:bg-[var(--color-brand-active)]',
              'focus-visible:outline focus-visible:outline-2',
              'focus-visible:outline-offset-3',
              'focus-visible:outline-[var(--focus-ring-color)]',
              'disabled:bg-[var(--color-bg-disabled)]',
              'disabled:text-[var(--color-text-disabled)]',
              'disabled:cursor-not-allowed',
            ].join(' ')}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </div>

      </div>
    </form>
  );
}
