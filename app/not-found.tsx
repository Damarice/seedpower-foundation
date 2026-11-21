/**
 * Custom 404 — Not Found page.
 *
 * Rendered by Next.js whenever no route matches the requested URL.
 * Does not receive any props; relies on the root layout for Header/Footer.
 *
 * Requirements satisfied (Phase 8E):
 *   - Clear 404 message with accessible heading hierarchy (H1 → H2).
 *   - Brief, helpful explanation.
 *   - Prominent primary ButtonLink returning visitors to the homepage.
 *   - Secondary ghost ButtonLink for the "What We Do" section as an alternative.
 *   - Existing brand components and design tokens — no new CSS added.
 *   - Responsive, vertically centred layout.
 *
 * Architecture v1.2 — Section 11 (error handling).
 * Visual Design Direction v2.0 — Section 3.
 */
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/ButtonLink';

export default function NotFoundPage() {
  return (
    <Section
      background="soft"
      aria-labelledby="not-found-heading"
      className="min-h-[60vh] flex items-center"
    >
      <Container variant="narrow" className="text-center py-8">
        {/* Large decorative status code — hidden from AT as the H1 carries the message */}
        <p
          className="font-[var(--font-heading)] font-bold text-[var(--color-brand)]
                     text-[72px] tablet:text-[96px] leading-none mb-4 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <Heading
          variant="h1"
          id="not-found-heading"
          className="text-[var(--color-text-primary)] mb-4"
        >
          Page Not Found
        </Heading>

        <Text
          variant="body-lg"
          className="text-[var(--color-text-secondary)] mb-8 max-w-[480px] mx-auto"
        >
          The page you are looking for doesn&apos;t exist or may have been
          moved. Try returning to the homepage or exploring what we do.
        </Text>

        <div className="flex flex-col tablet:flex-row gap-3 justify-center items-center">
          <ButtonLink href="/" variant="primary">
            Go to Homepage
          </ButtonLink>
          <ButtonLink href="/what-we-do" variant="ghost">
            What We Do
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
