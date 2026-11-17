/**
 * Phase 1 placeholder homepage.
 * This page exists solely to verify that the application renders.
 * It will be replaced in Phase 5 with the full homepage implementation.
 * No SeedPower content, statistics, or contact details are included here.
 */
export default function HomePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text-primary)',
        backgroundColor: 'var(--color-bg-page)',
        padding: 'var(--space-8)',
        textAlign: 'center',
        gap: 'var(--space-4)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h1)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-brand)',
          lineHeight: 'var(--text-h1--lh)',
        }}
      >
        SeedPower Foundation
      </h1>
      <p
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          maxWidth: '480px',
        }}
      >
        Development in progress — Phase 1 foundation established.
      </p>
    </main>
  );
}
