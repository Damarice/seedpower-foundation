'use client';

/**
 * ImpactStatsSection — homepage impact statistics section.
 * Figures animate once when the section enters the viewport.
 */
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import type { ImpactCardProps } from '@/components/composite/ImpactCard';

interface ImpactStatsSectionProps {
  /** Array of confirmed statistics to display */
  stats: ImpactCardProps[];
}

function getTargetValue(figure: string): number {
  const digits = figure.replace(/[^\d]/g, '');
  const value = Number(digits);

  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid impact statistic figure: "${figure}".`);
  }

  return value;
}

export function ImpactStatsSection({ stats }: ImpactStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) setProgress(1);
    };

    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      typeof IntersectionObserver === 'undefined' ||
      typeof window.requestAnimationFrame !== 'function'
    ) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProgress(0);
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!hasEnteredViewport || prefersReducedMotion) return;

    const duration = 1800;
    let frameId = 0;
    let startTime: number | undefined;

    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const linearProgress = Math.min((timestamp - startTime) / duration, 1);
      setProgress(1 - (1 - linearProgress) ** 3);

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasEnteredViewport, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our impact"
      className="bg-[var(--color-bg-warm)] py-8 tablet:py-10 desktop:py-12"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 tablet:gap-x-8 tablet:gap-y-8 desktop:grid-cols-4 desktop:gap-8">
          {stats.map((stat) => {
            const target = getTargetValue(stat.figure);
            const currentValue =
              progress === 1
                ? target
                : Math.floor(target * progress);
            const formattedValue = stat.figure.includes(',')
              ? new Intl.NumberFormat('en-US').format(currentValue)
              : String(currentValue);
            const approximation = stat.figure.startsWith('~') ? '~' : '';

            return (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col items-center text-center desktop:items-start desktop:text-left"
              >
                <p
                  data-testid={`impact-counter-${stat.figure.replace(/[^\w]/g, '')}`}
                  className="font-[var(--font-heading)] text-[32px] font-bold leading-none tracking-tight text-[var(--color-brand)] tablet:text-[36px] desktop:text-[40px]"
                >
                  <span className="sr-only">{stat.figure}</span>
                  <span aria-hidden="true">
                    {approximation}
                    {formattedValue}
                  </span>
                </p>
                <p className="mt-2 max-w-[220px] font-[var(--font-body)] text-sm font-medium leading-snug text-[var(--color-text-secondary)] tablet:text-base">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
