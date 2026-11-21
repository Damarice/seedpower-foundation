/**
 * Contact form API route — POST /api/contact
 *
 * Architecture v1.2 — Sections 8.1, 8.2, 8.4.
 *
 * Implements:
 *   1. JSON parsing with safe error handling.
 *   2. Rate limiting: Upstash Redis slidingWindow(5, '1 h') per IP.
 *   3. Zod validation using the shared contactFormSchema.
 *   4. Honeypot check — the operative bot guard, reached after Zod validation.
 *   5. Delivery placeholder — decision pending client confirmation.
 *
 * Response shapes (Architecture Section 8.2):
 *   Success:          HTTP 200  { success: true, message: string }
 *   Validation error: HTTP 400  { error: string }
 *   Rate limited:     HTTP 429  { error: string }
 *   Server error:     HTTP 500  { error: string }
 *
 * ── DELIVERY STEP — BLOCKED ───────────────────────────────────────────
 * The email delivery mechanism and confirmed recipient address are pending
 * client decisions. Options from Architecture Section 8.2:
 *   (a) Transactional email provider (Resend, Postmark, SendGrid)
 *   (b) Database storage for manual review
 *   (c) Webhook (Zapier, Make)
 * Until decided, validated submissions are logged server-side only.
 * The success response accurately reflects that the message was received
 * for review — not that an email was sent.
 * ──────────────────────────────────────────────────────────────────────
 *
 * ── RATE-LIMIT CONFIGURATION ──────────────────────────────────────────
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local.
 * If either variable is absent, the route returns HTTP 503 to prevent silently
 * bypassing rate limiting in a production environment. This is intentionally
 * fail-closed: an unconfigured service does not silently allow unlimited traffic.
 * See .env.example for required variable names.
 * ──────────────────────────────────────────────────────────────────────
 *
 * ── IP EXTRACTION ─────────────────────────────────────────────────────
 * On Vercel, x-forwarded-for is set by edge infrastructure and is reliable.
 * On other platforms, this header can be spoofed — do not deploy without
 * verifying the proxy trust model for your deployment environment.
 * ──────────────────────────────────────────────────────────────────────
 */
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { contactFormSchema } from '@/lib/validation';

/**
 * Lazily create the rate limiter only when both required env vars are present.
 * This prevents `Redis.fromEnv()` from throwing at module load time in
 * environments where Upstash is not yet configured.
 *
 * Returns null if configuration is missing, allowing the POST handler to
 * return HTTP 503 rather than crashing the entire route module.
 */
function createRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: false,
  });
}

/**
 * Extract the client IP from the request.
 * On Vercel, x-forwarded-for is set by the edge and is the first value.
 * Falls back to 'unknown' when the header is absent.
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return 'unknown';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── 1. Rate limiting ────────────────────────────────────────────────
  const ratelimit = createRatelimit();

  if (!ratelimit) {
    // Upstash is not configured — fail closed rather than silently skipping.
    // This prevents rate limiting from being accidentally bypassed in
    // environments that have not yet set the required credentials.
    console.error('[contact] Rate limiting unavailable: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set.');
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const ip = getClientIp(request);
    const { success: withinLimit } = await ratelimit.limit(`contact:${ip}`);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }
  } catch (err) {
    // Redis call failed — fail closed: do not allow submission through
    // an unverified rate-limiting path.
    console.error('[contact] Rate limit check failed:', err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  // ── 2. Parse JSON body ──────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // Body is not valid JSON
    return NextResponse.json(
      { error: 'Invalid request. Please check your inputs.' },
      { status: 400 }
    );
  }

  // ── 3. Validate with Zod ────────────────────────────────────────────
  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    // Rejects all field violations. Honeypot is now z.string() so any value
    // passes Zod — the explicit check below is the operative honeypot guard.
    return NextResponse.json(
      { error: 'Invalid form data. Please check your inputs.' },
      { status: 400 }
    );
  }

  // ── 4. Honeypot check ──────────────────────────────────────────────
  // This is the operative bot guard. The schema accepts any honeypot string
  // so this branch is reachable. Silently returns HTTP 200 to deny bots
  // feedback that detection occurred. No logging, storage, or delivery.
  // Architecture Section 8.2: "Silently return 200 to avoid giving bots feedback."
  if (result.data.honeypot) {
    return NextResponse.json({ success: true });
  }

  // ── 5. Delivery placeholder ─────────────────────────────────────────
  // Delivery mechanism and recipient address pending client confirmation.
  // See module-level documentation for options.
  const { name, email, subject, message } = result.data;
  console.log('[contact] Submission received — delivery not yet configured:', {
    name,
    email,
    subject: subject ?? '(none)',
    messageLength: message.length,
  });

  // Success response: message was received for review, not necessarily emailed.
  return NextResponse.json({
    success: true,
    message: 'Your message has been received and will be reviewed shortly.',
  });
}
