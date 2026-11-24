/**
 * Contact — /contact
 * Phase 6 shell: contact information and form placeholder.
 *
 * Content sourced from:
 *   - docs/research/full-website-discovery-report.md (sections 6, 7)
 *   - docs/research/content-verification-and-sitemap.md
 *
 * Contact details included:
 *   - WhatsApp: https://wa.me/message/UIEW6BV2N5LCK1
 *     — confirmed in discovery report section 6.
 *   - Facebook: https://www.facebook.com/seedpoweredfoundation
 *     — confirmed in discovery report section 6.
 *
 * Contact details deliberately OMITTED:
 *   - Email: info@seedpowerfoundation.org — Architecture v1.2 Section 5.3
 *     explicitly requires client confirmation before use on the new site.
 *   - Phone: +254 758 585750 — found in one HTML snapshot but not confirmed
 *     for the new site. Architecture Section 5.3 notes phone as missing from
 *     discovery. Omitted pending client confirmation.
 *   - Postal address, office hours — not found in any source document.
 *
 * Contact form:
 *   - Phase 7 deliverable (Architecture v1.2 Section 13).
 *   - Requires: React Hook Form, Zod, API route, email delivery decision,
 *     Upstash Redis for rate limiting, confirmed recipient email.
 *   - A clearly labelled placeholder is shown; no non-functional form is
 *     rendered.
 *
 * Architecture v1.2 — Sections 5.1, 5.3, 8.2, 11.1, 13 (Phase 6 / Phase 7).
 * Visual Design Direction v2.0 — Sections 1–3.
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ExternalLink } from '@/components/primitives/ExternalLink';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with SeedPower Foundation. Reach us on WhatsApp or Facebook — an online enquiry form is coming soon.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | SeedPower Foundation',
    description:
      'Reach SeedPower Foundation via WhatsApp or Facebook. An online enquiry form is coming soon.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Section
        background="brand"
        aria-labelledby="contact-heading"
        className="py-10 tablet:py-12 desktop:py-14"
      >
        <Container variant="wide">
          <div className="grid gap-4 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] tablet:items-end tablet:gap-10">
            <Heading
              variant="hero"
              id="contact-heading"
              className="text-white"
            >
              Contact
            </Heading>
            <Text variant="body-lg" className="max-w-[680px] text-white/90">
              We would love to hear from you. Reach SeedPower Foundation
              through any of the channels below. An online enquiry form
              will be available here soon.
            </Text>
          </div>
        </Container>
      </Section>

      <Section background="white" aria-labelledby="contact-channels-heading">
        <Container>
          <Heading
            variant="h2"
            id="contact-channels-heading"
            className="mb-6 text-[var(--color-text-primary)] tablet:mb-8"
          >
            Get in Touch
          </Heading>

          <div className="grid gap-6 tablet:grid-cols-2 tablet:gap-10 desktop:max-w-[1000px]">
            <div className="flex items-start gap-4 border-t border-[var(--color-border)] pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-surface)] text-[var(--color-brand)]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div>
                <Heading
                  variant="h3"
                  className="mb-2 font-semibold text-[var(--color-text-primary)]"
                >
                  WhatsApp
                </Heading>
                <ExternalLink
                  href="https://wa.me/message/UIEW6BV2N5LCK1"
                  className="inline-flex min-h-[var(--touch-target-min)] items-center font-[var(--font-body)] text-[length:var(--text-body)] font-semibold text-[var(--color-brand)] underline underline-offset-4 hover:text-[var(--color-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                  aria-label="Contact SeedPower Foundation on WhatsApp (opens in new tab)"
                >
                  Message us on WhatsApp
                </ExternalLink>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-[var(--color-border)] pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-surface)] text-[var(--color-brand)]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </span>
              <div>
                <Heading
                  variant="h3"
                  className="mb-2 font-semibold text-[var(--color-text-primary)]"
                >
                  Facebook
                </Heading>
                <ExternalLink
                  href="https://www.facebook.com/seedpoweredfoundation"
                  className="inline-flex min-h-[var(--touch-target-min)] items-center font-[var(--font-body)] text-[length:var(--text-body)] font-semibold text-[var(--color-brand)] underline underline-offset-4 hover:text-[var(--color-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                  aria-label="Follow SeedPower Foundation on Facebook (opens in new tab)"
                >
                  Follow us on Facebook
                </ExternalLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="warm" aria-labelledby="enquiry-form-heading">
        <Container>
          <div className="grid gap-5 tablet:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] tablet:gap-10">
            <Heading
              variant="h2"
              id="enquiry-form-heading"
              className="text-[var(--color-text-primary)]"
            >
              Send an Enquiry
            </Heading>
            <div className="max-w-[760px] space-y-3">
              <Text
                variant="body-lg"
                className="font-semibold text-[var(--color-brand)]"
              >
                Contact form coming soon.
              </Text>
              <Text
                variant="body-sm"
                className="text-[var(--color-text-secondary)]"
              >
                An online enquiry form will be available here in a future update.
                In the meantime, please reach us via WhatsApp or Facebook above.
              </Text>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
