import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

interface ProgrammeImagePlaceholderProps {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageClassName?: string;
  className?: string;
  placement?: 'center' | 'bottom-right';
}

export function ProgrammeImagePlaceholder({
  label,
  imageSrc,
  imageAlt,
  imageSizes = '100vw',
  imageClassName,
  className,
  placement = 'center',
}: ProgrammeImagePlaceholderProps) {
  return (
    <div
      {...(!imageSrc ? { role: 'img', 'aria-label': label } : {})}
      className={cn(
        'flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_72%_24%,rgba(255,255,255,0.78),transparent_38%),linear-gradient(145deg,var(--color-bg-warm),var(--color-bg-soft))]',
        className
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? label}
          fill
          sizes={imageSizes}
          className={cn('object-cover object-center', imageClassName)}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex flex-col items-center gap-3 px-5 text-center text-[var(--color-text-secondary)]',
            placement === 'bottom-right' && 'absolute bottom-5 right-5 scale-90'
          )}
        >
          <svg
            className="h-10 w-10 text-[var(--color-brand)]/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M7 5l1-2h8l1 2" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.12em]">
            Photography placeholder
          </span>
        </span>
      )}
    </div>
  );
}

interface ProgrammePageHeroProps {
  headingId: string;
  title: string;
  description: string;
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageClassName?: string;
}

export function ProgrammePageHero({
  headingId,
  title,
  description,
  imageLabel,
  imageSrc,
  imageAlt,
  imageSizes = '100vw',
  imageClassName,
}: ProgrammePageHeroProps) {
  return (
    <Section
      background="brand"
      aria-labelledby={headingId}
      className="relative isolate flex min-h-[360px] items-center overflow-hidden py-12 tablet:min-h-[420px] tablet:py-16 desktop:min-h-[460px] desktop:py-20"
    >
      <ProgrammeImagePlaceholder
        label={imageLabel}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        imageSizes={imageSizes}
        imageClassName={imageClassName}
        placement="bottom-right"
        className="absolute inset-0 z-0 rounded-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(45,80,22,0.82)_0%,rgba(45,80,22,0.62)_55%,rgba(45,80,22,0.24)_100%)]"
      />
      <Container>
        <div className="relative z-20 max-w-[680px]">
          <Heading
            variant="hero"
            id={headingId}
            className="mb-4 text-white"
          >
            {title}
          </Heading>
          <Text variant="body-lg" className="max-w-[620px] text-white/90">
            {description}
          </Text>
        </div>
      </Container>
    </Section>
  );
}

interface ProgrammePageCtaProps {
  headingId: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export function ProgrammePageCta({
  headingId,
  heading,
  description,
  buttonLabel,
  buttonHref,
}: ProgrammePageCtaProps) {
  return (
    <Section
      background="brand"
      aria-labelledby={headingId}
      className="py-12 tablet:py-14 desktop:py-16"
    >
      <Container>
        <div className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10">
          <div className="max-w-[680px]">
            <Heading
              variant="h2"
              id={headingId}
              className="mb-3 text-white"
            >
              {heading}
            </Heading>
            <Text variant="body-lg" className="text-white/90">
              {description}
            </Text>
          </div>
          <ButtonLink
            href={buttonHref}
            variant="ghost"
            size="default"
            className="shrink-0 border-white text-white hover:bg-white/10 hover:text-white"
          >
            {buttonLabel}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
