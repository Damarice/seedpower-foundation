/**
 * Who We Are page — /who-we-are
 *
 * Consolidates content from two original pages:
 *   - /about-us/  (page-about-us.html, WordPress ID 930)
 *   - /who-we-are/  (page-who-we-are.html, WordPress ID 933)
 * A 301 redirect from /about-us/ → /who-we-are is already live in next.config.ts.
 *
 * Content sourced from verified discovery documentation:
 *   - docs/research/full-website-discovery-report.md (pages 2–3)
 *   - docs/research/content-verification-and-sitemap.md (pages 2–3)
 *   - docs/content/page-about-us.html
 *   - docs/content/page-who-we-are.html
 *
 * Content decisions applied per Phase 6B scope verification:
 *   - Registration certificate number OMITTED: two conflicting numbers appear
 *     on the original site (SRD/KK/121731/2019 vs DSD/43/245/02/82873).
 *     Requires client confirmation before either is displayed here.
 *   - "Sixth year" statement NOT carried over: would be inaccurate in 2026.
 *     Replaced with "since 2018".
 *   - Jean Winfrey and Keith Winfrey: no portrait found in media inventory.
 *     The original site shows incorrect photos in those slots (CMS error).
 *     A consistent placeholder is used instead.
 *   - No image assets have been downloaded to /public/images/ yet.
 *     All portrait slots use accessible placeholders until assets arrive.
 *
 * Architecture v1.2 — Sections 2, 5.1, 7, 11.1, 13 (Phase 6).
 * Visual Design Direction v2.0 — Sections 1–4, 2.11 (portrait 2:3 ratio).
 */
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Who We Are',
  description:
    'SeedPower Foundation is a community-based nonprofit founded in 2018 in Kenya. Meet the co-founders and advisory board who guide our mission to empower vulnerable children, youth and women.',
  alternates: {
    canonical: '/who-we-are',
  },
  openGraph: {
    title: 'Who We Are | SeedPower Foundation',
    description:
      'Meet the co-founders and advisory board of SeedPower Foundation, a nonprofit empowering vulnerable communities in Kenya since 2018.',
    url: '/who-we-are',
    type: 'website',
  },
};

/* ── Data ──────────────────────────────────────────────────────────── */

/**
 * Six core values.
 * Source: page-about-us.html and docs/research/full-website-discovery-report.md (page 2).
 */
const coreValues = [
  {
    id: 'faith',
    name: 'Faith',
    description: 'Believing God for and trusting Him to do.',
  },
  {
    id: 'respect',
    name: 'Respect',
    description: 'Respect for human dignity.',
  },
  {
    id: 'integrity',
    name: 'Integrity',
    description: 'Financial transparency and truthful representation.',
  },
  {
    id: 'word-of-god',
    name: 'The Word of God',
    description: 'Biblical literacy and personal disciplines.',
  },
  {
    id: 'prayer',
    name: 'Prayer',
    description: 'Wisdom and protection for our partners and our team.',
  },
  {
    id: 'hope',
    name: 'Hope',
    description: 'Giving hope to those we serve.',
  },
] as const;

/**
 * Co-founders.
 * Source: page-who-we-are.html and docs/research/full-website-discovery-report.md (page 3).
 * Images: not yet copied to /public/images/ — placeholders used.
 */
const founders = [
  {
    id: 'beldon',
    name: 'Beldon Okeyo',
    role: 'Co-Executive Director, Co-Founder',
    bio: 'Beldon has over 13 years of experience working with vulnerable communities across Africa and the United States. He caught the vision for SeedPower in Kenya in 2018 and has led the organisation since its founding.',
    // Confirmed in media inventory: /wp-content/uploads/2022/09/beldon-website...jpg (937×937px)
    // Not yet copied to /public/images/ — placeholder used until assets are provided.
    imageSrc: null as string | null,
    imageAlt: 'Beldon Okeyo, Co-Executive Director and Co-Founder of SeedPower Foundation',
  },
  {
    id: 'peter',
    name: 'Peter Opinya',
    role: 'Co-Executive Director, Co-Founder',
    bio: "Peter has over 13 years of experience working with vulnerable communities. His shared childhood experiences shaped his commitment to empowering others and helped inspire the founding of SeedPower in 2018.",
    // Confirmed in media inventory: /wp-content/uploads/2023/05/peter-web...jpg (540×540px)
    // Not yet copied to /public/images/ — placeholder used until assets are provided.
    imageSrc: null as string | null,
    imageAlt: 'Peter Opinya, Co-Executive Director and Co-Founder of SeedPower Foundation',
  },
] as const;

/**
 * Advisory board members.
 * Source: page-who-we-are.html and docs/research/full-website-discovery-report.md (page 3).
 *
 * Photo availability from media inventory:
 *   - Jim Grinnell:   James-Grinnell.jpg (408×432) — confirmed ✓
 *   - Laura Grinnell: laura-3-863x1024.jpg (863×1024) — confirmed ✓
 *   - Linda Steed:    Linda.-1.jpg (600×600) — confirmed ✓
 *   - Jean K. Winfrey: NO confirmed portrait (original site shows incorrect photo — CMS error)
 *   - Keith Winfrey:   NO confirmed portrait (original site shows incorrect photo — CMS error)
 *
 * All imageSrc values are null until assets are copied to /public/images/.
 */
const boardMembers = [
  {
    id: 'jean-winfrey',
    name: 'Jean Karsten Winfrey',
    role: 'Board Member',
    // No confirmed portrait in media inventory.
    imageSrc: null as string | null,
    imageAlt: 'Jean Karsten Winfrey, Board Member',
  },
  {
    id: 'jim-grinnell',
    name: 'Jim Grinnell',
    role: 'Board Member',
    // Confirmed: James-Grinnell.jpg (408×432px). Path pending asset copy.
    imageSrc: null as string | null,
    imageAlt: 'Jim Grinnell, Board Member',
  },
  {
    id: 'laura-grinnell',
    name: 'Laura Grinnell',
    role: 'Board Member',
    // Confirmed: laura-3-863x1024.jpg (863×1024px). Path pending asset copy.
    imageSrc: null as string | null,
    imageAlt: 'Laura Grinnell, Board Member',
  },
  {
    id: 'linda-steed',
    name: 'Linda Steed',
    role: 'Board Member',
    // Confirmed: Linda.-1.jpg (600×600px). Path pending asset copy.
    imageSrc: null as string | null,
    imageAlt: 'Linda Steed, Board Member',
  },
  {
    id: 'keith-winfrey',
    name: 'Keith Winfrey',
    role: 'Board Member',
    // No confirmed portrait in media inventory.
    imageSrc: null as string | null,
    imageAlt: 'Keith Winfrey, Board Member',
  },
] as const;

/* ── Portrait placeholder ──────────────────────────────────────────── */

/**
 * Accessible portrait placeholder.
 * Used for all portraits until image assets are copied to /public/images/.
 * 2:3 aspect ratio per VDD v2.0 Section 2.11.
 */
function PortraitPlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="w-full aspect-[2/3] bg-[var(--color-bg-soft)]
                 rounded-[var(--radius-md)] flex items-center justify-center"
      role="img"
      aria-label={alt}
    >
      <svg
        className="w-12 h-12 text-[var(--color-border)]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
      </svg>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function WhoWeArePage() {
  return (
    <>
      {/* ── Page header ────────────────────────────────────────────── */}
      <Section background="soft" aria-labelledby="who-we-are-heading">
        <Container variant="narrow">
          <Heading
            variant="h1"
            id="who-we-are-heading"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Who We Are
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-primary)]"
          >
            SeedPower Foundation is a community-based nonprofit organisation
            founded in 2018 and registered in 2019 in Kenya. It was established
            with the mandate to empower vulnerable children, youth and women
            in the community — giving them the education, resources and skills
            they need to become self-reliant and to eradicate poverty.
          </Text>
        </Container>
      </Section>

      {/* ── Mission, Vision and Values ─────────────────────────────── */}
      <Section background="white" aria-labelledby="mission-heading">
        <Container variant="narrow">
          {/* Mission */}
          <div className="mb-10 tablet:mb-12">
            <Heading
              variant="h2"
              id="mission-heading"
              className="text-[var(--color-text-primary)] mb-4"
            >
              Our Mission
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-primary)]"
            >
              To empower the vulnerable communities by providing them with
              education, resources and skill set for future self-reliance and
              eradication of poverty.
            </Text>
          </div>

          {/* Vision */}
          <div className="mb-10 tablet:mb-12">
            <Heading
              variant="h2"
              className="text-[var(--color-text-primary)] mb-4"
            >
              Our Vision
            </Heading>
            <Text
              variant="body-lg"
              className="text-[var(--color-text-primary)]"
            >
              We envision a society where the vulnerable children and their
              families are empowered and equitably access sustainable livelihood
              opportunities in order to eradicate poverty.
            </Text>
          </div>

          {/* Values */}
          <div>
            <Heading
              variant="h2"
              className="text-[var(--color-text-primary)] mb-6"
            >
              Our Values
            </Heading>
            {/* Values rendered as a simple list — avoids dl/dt/dd nesting constraints */}
            <ul className="space-y-4 list-none p-0 m-0" aria-label="Core values">
              {coreValues.map((value) => (
                <li key={value.id} className="flex gap-3">
                  {/* Accent dot — decorative */}
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full
                               bg-[var(--color-brand)] mt-[0.6em] block"
                    aria-hidden="true"
                  />
                  <p className="font-[var(--font-body)] text-[length:var(--text-body)]
                                text-[var(--color-text-primary)] m-0">
                    <strong className="font-[var(--font-heading)] font-semibold">
                      {value.name}
                    </strong>
                    {' \u2014 '}{value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Founders ───────────────────────────────────────────────── */}
      <Section background="warm" aria-labelledby="founders-heading">
        <Container>
          <Heading
            variant="h2"
            id="founders-heading"
            className="text-[var(--color-text-primary)] mb-2 text-center"
          >
            Our Founders
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] text-center mb-10
                       tablet:mb-12 max-w-[600px] mx-auto"
          >
            Beldon Okeyo and Peter Opinya co-founded SeedPower Foundation
            in Kenya in 2018, drawing on over 13 years of combined experience
            serving vulnerable communities.
          </Text>

          <div
            className="grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-12
                       max-w-[800px] mx-auto"
          >
            {founders.map((founder) => (
              <div key={founder.id} className="flex flex-col gap-4">
                {/* Portrait — 2:3 ratio per VDD Section 2.11 */}
                <div className="w-full max-w-[260px] mx-auto tablet:mx-0">
                  <PortraitPlaceholder alt={founder.imageAlt} />
                </div>

                {/* Name and role */}
                <div>
                  <Heading
                    variant="h3"
                    className="text-[var(--color-brand)] mb-1"
                  >
                    {founder.name}
                  </Heading>
                  <Text
                    variant="body-sm"
                    className="font-medium text-[var(--color-text-secondary)]
                               uppercase tracking-[0.04em] mb-3"
                  >
                    {founder.role}
                  </Text>
                  <Text
                    variant="body"
                    className="text-[var(--color-text-primary)]"
                  >
                    {founder.bio}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Advisory Board ─────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="board-heading">
        <Container>
          <Heading
            variant="h2"
            id="board-heading"
            className="text-[var(--color-text-primary)] mb-2 text-center"
          >
            Advisory Board
          </Heading>
          <Text
            variant="body-lg"
            className="text-[var(--color-text-secondary)] text-center mb-4
                       max-w-[640px] mx-auto"
          >
            Our advisory board brings diverse skills and experience to support
            and strengthen SeedPower&apos;s vision and mission.
          </Text>

          {/* Board philosophy */}
          <div
            className="max-w-[720px] mx-auto mb-10 tablet:mb-12 p-6
                       bg-[var(--color-bg-soft)] rounded-[var(--radius-md)]"
          >
            <Text
              variant="body"
              className="text-[var(--color-text-primary)] italic"
            >
              &ldquo;The SeedPower Board promotes, supports, and enhances the
              vision and mission of SeedPower Ministry and seeks opportunities
              to grow and sustain the ministry. Board members bring unique
              skills and talents, serve without pay, and are committed to the
              mission and vision of SeedPower.&rdquo;
            </Text>
          </div>

          {/* Board member grid */}
          <div
            className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5
                       gap-6 tablet:gap-8"
          >
            {boardMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center gap-3"
              >
                {/* Portrait — 2:3 ratio */}
                <div className="w-full max-w-[140px]">
                  <PortraitPlaceholder alt={member.imageAlt} />
                </div>
                <div>
                  <Text
                    as="p"
                    variant="body-sm"
                    className="font-semibold text-[var(--color-text-primary)]"
                  >
                    {member.name}
                  </Text>
                  <Text
                    as="p"
                    variant="body-sm"
                    className="text-[var(--color-text-secondary)]"
                  >
                    {member.role}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
