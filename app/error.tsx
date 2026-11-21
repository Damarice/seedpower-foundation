'use client';
/**
 * Custom error boundary — app/error.tsx.
 *
 * Next.js calls this component when an unhandled error is thrown inside a
 * route segment. It MUST be a Client Component (the 'use client' directive
 * above is required by the framework).
 *
 * Props (Next.js error boundary contract):
 *   error  — the Error object that was thrown.
 *   reset  — a function that attempts to re-render the failing segment.
 *
 * Requirements satisfied (Phase 8E):
 *   - 'use client' directive present.
 *   - Correct TypeScript types for error and reset.
 *   - Friendly, non-technical error message — no stack traces exposed.
 *   - Functional retry button wired to reset().
 *   - Homepage navigation option via ButtonLink.
 *   - Existing brand components and design tokens — no new CSS.
 *   - Keyboard-accessible; responsive.
 *
 * Architecture v1.2 — Section 11 (error handling).
 * Visual Design Direction v2.0 — Section 3.
 */
import { useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  /**
   * Log the error to the console in development; in production a real
   * application would forward this to an error-tracking service.
   * The digest is a Next.js server-side error ID, safe to log.
   */
  useEffect(() => {
    console.error('Unhandled error (digest:', error.digest ?? 'none', ')');
  }, [error]);

  return (
    <Section
      background="soft"
      aria-labelledby="error-heading"
      className="min-h-[60vh] flex items-center"
    >
      <Container variant="narrow" className="text-center py-8">
        {/* Decorative icon — hidden from AT */}
        <div
          className="inline-flex items-center justify-center
                     w-16 h-16 rounded-full
                     bg-[var(--color-bg-warm)]
                     mb-6 mx-auto"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-[var(--color-brand)]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <Heading
          variant="h1"
          id="error-heading"
          className="text-[var(--color-text-primary)] mb-4"
        >
          Something Went Wrong
        </Heading>

        <Text
          variant="body-lg"
          className="text-[var(--color-text-secondary)] mb-8 max-w-[480px] mx-auto"
        >
          We&apos;re sorry — an unexpected problem occurred. You can try again
          or return to the homepage.
        </Text>

        <div className="flex flex-col tablet:flex-row gap-3 justify-center items-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <ButtonLink href="/" variant="ghost">
            Go to Homepage
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
