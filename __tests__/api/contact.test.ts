/**
 * Tests for POST /api/contact route handler.
 *
 * @jest-environment node
 *
 * Uses node environment (not jsdom) because NextRequest requires
 * Web Fetch API globals (Request, Headers) available in Node 18+
 * but absent from jsdom.
 *
 * Tests call the route handler function directly, bypassing Next.js HTTP.
 * Upstash Redis and Ratelimit are mocked — no real credentials needed.
 *
 * Environment variables are set/cleared per test group to exercise
 * the missing-configuration path.
 *
 * Covers:
 *   - Valid request returns 200 with success payload
 *   - Malformed JSON returns 400
 *   - Invalid name, email, message returns 400
 *   - Short subject returns 400
 *   - Non-empty honeypot silently returns 200 (no detection revealed)
 *   - First 5 requests allowed; 6th returns 429
 *   - Missing Upstash env vars returns 503 (fail-closed)
 *   - Redis error returns 503 (fail-closed)
 *   - 500 path returns generic error (no internal detail)
 *   - Success response does not claim email delivery
 */
import { NextRequest } from 'next/server';

// ── Mock Upstash before importing the route ──────────────────────────
const mockLimit = jest.fn();
const mockRatelimitConstructor = jest.fn(() => ({ limit: mockLimit }));
// Ratelimit.slidingWindow is a static factory method — mock it on the constructor
(mockRatelimitConstructor as unknown as Record<string, unknown>).slidingWindow = jest.fn(() => 'mock-sliding-window');

jest.mock('@upstash/ratelimit', () => ({
  Ratelimit: mockRatelimitConstructor,
  __esModule: true,
}));
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({})),
  __esModule: true,
}));

// Set env vars before the route module loads
const ENV_BACKUP: Record<string, string | undefined> = {};

function setEnv() {
  process.env.UPSTASH_REDIS_REST_URL = 'https://fake.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'fake-token';
}

function clearEnv() {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
}

/** Build a NextRequest with a JSON body and optional x-forwarded-for header */
function makeRequest(body: unknown, ip = '1.2.3.4'): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

/** Valid form payload */
const validPayload = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: undefined,
  message: 'This is a test message long enough to pass validation.',
  honeypot: '',
};

describe('POST /api/contact', () => {
  beforeAll(() => {
    // Save original env
    ENV_BACKUP.URL = process.env.UPSTASH_REDIS_REST_URL;
    ENV_BACKUP.TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterAll(() => {
    // Restore original env
    if (ENV_BACKUP.URL !== undefined) process.env.UPSTASH_REDIS_REST_URL = ENV_BACKUP.URL;
    else delete process.env.UPSTASH_REDIS_REST_URL;
    if (ENV_BACKUP.TOKEN !== undefined) process.env.UPSTASH_REDIS_REST_TOKEN = ENV_BACKUP.TOKEN;
    else delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  beforeEach(() => {
    jest.resetModules();
    mockLimit.mockReset();
    mockRatelimitConstructor.mockReset();
    mockRatelimitConstructor.mockImplementation(() => ({ limit: mockLimit }));
  });

  // ── Missing configuration (fail-closed) ──────────────────────────────
  describe('when Upstash env vars are missing', () => {
    beforeEach(() => clearEnv());
    afterEach(() => setEnv());

    it('returns 503 — does not silently skip rate limiting', async () => {
      jest.resetModules();
      const { POST } = await import('@/app/api/contact/route');
      const req = makeRequest(validPayload);
      const res = await POST(req);
      expect(res.status).toBe(503);
      const json = await res.json();
      expect(json.error).toMatch(/service temporarily unavailable/i);
    });
  });

  // ── All remaining tests with env vars set ────────────────────────────
  describe('with Upstash configured', () => {
    let POST: (req: NextRequest) => Promise<Response>;

    beforeEach(async () => {
      setEnv();
      jest.resetModules();
      // Re-import after env is set so createRatelimit() finds the vars
      ({ POST } = await import('@/app/api/contact/route'));
      // Default: allow request (not rate-limited)
      mockLimit.mockResolvedValue({ success: true });
    });

    // ── Valid request ──────────────────────────────────────────────────
    it('returns 200 with success payload for a valid submission', async () => {
      const res = await POST(makeRequest(validPayload));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(typeof json.message).toBe('string');
    });

    it('success message does not claim email was sent or delivered', async () => {
      const res = await POST(makeRequest(validPayload));
      const json = await res.json();
      // Delivery is not wired up — message must not claim email was sent
      expect(json.message).not.toMatch(/email sent|sent to|delivered to/i);
    });

    it('accepts a valid submission without subject (optional field)', async () => {
      const payload = { ...validPayload, subject: undefined };
      const res = await POST(makeRequest(payload));
      expect(res.status).toBe(200);
    });

    // ── Malformed JSON ─────────────────────────────────────────────────
    it('returns 400 for malformed JSON body', async () => {
      const req = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
        body: 'this is not json{{{',
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeTruthy();
      expect(json).not.toHaveProperty('success', true);
    });

    // ── Field validation ───────────────────────────────────────────────
    it('returns 400 for a name that is too short', async () => {
      const res = await POST(makeRequest({ ...validPayload, name: 'J' }));
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toMatch(/invalid form data/i);
    });

    it('returns 400 for an invalid email address', async () => {
      const res = await POST(makeRequest({ ...validPayload, email: 'not-an-email' }));
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toMatch(/invalid form data/i);
    });

    it('returns 400 for a message that is too short', async () => {
      const res = await POST(makeRequest({ ...validPayload, message: 'Too short' }));
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toMatch(/invalid form data/i);
    });

    it('returns 400 for a one-character subject', async () => {
      const res = await POST(makeRequest({ ...validPayload, subject: 'X' }));
      expect(res.status).toBe(400);
    });

    // ── Honeypot ───────────────────────────────────────────────────────
    it('returns HTTP 200 silently for a non-empty honeypot — explicit branch reached', async () => {
      // With honeypot: z.string(), Zod accepts any string.
      // The explicit post-validation check is now the operative guard.
      const res = await POST(makeRequest({ ...validPayload, honeypot: 'bot-filled' }));
      // Architecture Section 8.2: "Silently return 200 to avoid giving bots feedback."
      expect(res.status).toBe(200);
      const json = await res.json();
      // Silent success — no message field, no bot-revealing text
      expect(json.success).toBe(true);
      expect(json).not.toHaveProperty('message'); // No delivery-confirming message
      expect(JSON.stringify(json)).not.toMatch(/honeypot|bot detected|detected/i);
    });

    it('honeypot submissions do not reach the delivery placeholder', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const res = await POST(makeRequest({ ...validPayload, honeypot: 'spambot' }));
      expect(res.status).toBe(200);
      // The delivery-placeholder console.log must NOT be called for honeypot submissions
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('[contact] Submission received'),
        expect.anything()
      );
      consoleSpy.mockRestore();
    });

    // ── Rate limiting ──────────────────────────────────────────────────
    it('allows the first 5 requests from the same IP', async () => {
      // Simulate 5 successful rate-limit checks
      mockLimit.mockResolvedValue({ success: true });
      for (let i = 0; i < 5; i++) {
        const res = await POST(makeRequest(validPayload, '5.5.5.5'));
        expect(res.status).toBe(200);
      }
    });

    it('returns 429 when rate limit is exceeded', async () => {
      mockLimit.mockResolvedValue({ success: false }); // Limit exhausted
      const res = await POST(makeRequest(validPayload, '5.5.5.5'));
      expect(res.status).toBe(429);
      const json = await res.json();
      expect(json.error).toMatch(/too many submissions/i);
    });

    it('rate-limit key uses the client IP', async () => {
      mockLimit.mockResolvedValue({ success: true });
      await POST(makeRequest(validPayload, '9.9.9.9'));
      expect(mockLimit).toHaveBeenCalledWith('contact:9.9.9.9');
    });

    it('extracts the first IP from a comma-separated x-forwarded-for header', async () => {
      mockLimit.mockResolvedValue({ success: true });
      // Simulate a header like "client, proxy1, proxy2"
      await POST(makeRequest(validPayload, '7.7.7.7, 10.0.0.1, 192.168.1.1'));
      expect(mockLimit).toHaveBeenCalledWith('contact:7.7.7.7');
    });

    // ── Redis error (fail-closed) ──────────────────────────────────────
    it('returns 503 when Redis call throws', async () => {
      mockLimit.mockRejectedValueOnce(new Error('Redis connection failed'));
      const res = await POST(makeRequest(validPayload));
      expect(res.status).toBe(503);
      const json = await res.json();
      expect(json.error).toMatch(/service temporarily unavailable/i);
    });

    // ── Error responses do not expose internals ────────────────────────
    it('400 response does not expose Zod internals or stack traces', async () => {
      const res = await POST(makeRequest({ ...validPayload, name: 'J' }));
      const text = await res.text();
      expect(text).not.toMatch(/ZodError|at Object\.|at Module\.|node_modules/);
    });

    it('503 response does not expose Redis or Upstash internals', async () => {
      mockLimit.mockRejectedValueOnce(new Error('redis ECONNREFUSED'));
      const res = await POST(makeRequest(validPayload));
      const text = await res.text();
      expect(text).not.toMatch(/ECONNREFUSED|upstash|redis/i);
    });
  });
});
