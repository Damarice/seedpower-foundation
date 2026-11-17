import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ImpactCard } from '@/components/composite/ImpactCard';

expect.extend(toHaveNoViolations);

describe('ImpactCard', () => {
  it('renders without error', async () => {
    await act(async () => {
      render(<ImpactCard figure="375" label="Students supported" />);
    });
    expect(screen.getByText('375')).toBeInTheDocument();
  });

  it('renders the figure', async () => {
    await act(async () => {
      render(<ImpactCard figure="1,738+" label="Educators trained" />);
    });
    expect(screen.getByText('1,738+')).toBeInTheDocument();
  });

  it('renders the label', async () => {
    await act(async () => {
      render(<ImpactCard figure="375" label="Students supported" />);
    });
    expect(screen.getByText('Students supported')).toBeInTheDocument();
  });

  it('renders an icon when provided', async () => {
    const TestIcon = () => <svg data-testid="test-icon" aria-hidden="true" />;
    await act(async () => {
      render(<ImpactCard figure="375" label="Students supported" icon={<TestIcon />} />);
    });
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('does not render the icon wrapper when icon prop is absent', async () => {
    const { container } = render(
      <ImpactCard figure="375" label="Students supported" />
    );
    // No aria-hidden icon wrapper spans beyond the component root
    const iconSpans = container.querySelectorAll('span[aria-hidden="true"]');
    expect(iconSpans.length).toBe(0);
  });

  it('applies the warm background class', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<ImpactCard figure="2018" label="Year founded" />));
    });
    expect((container.firstChild as HTMLElement).className).toContain(
      'bg-[var(--color-bg-warm)]'
    );
  });

  it('applies the brand colour class to the figure', async () => {
    await act(async () => {
      render(<ImpactCard figure="375" label="Students supported" />);
    });
    const figure = screen.getByText('375');
    expect(figure.className).toContain('text-[var(--color-brand)]');
  });

  it('applies additional className to the outer element', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <ImpactCard figure="375" label="Students" className="extra-class" />
      ));
    });
    expect((container.firstChild as HTMLElement).className).toContain('extra-class');
  });

  it('provides an accessible label combining figure and label', async () => {
    await act(async () => {
      render(<ImpactCard figure="375" label="Students supported" />);
    });
    expect(screen.getByLabelText('375 — Students supported')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <ImpactCard figure="375" label="Students supported" />
      ));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe accessibility check with icon', async () => {
    const TestIcon = () => <svg aria-hidden="true" />;
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <ImpactCard figure="1,738+" label="Educators trained" icon={<TestIcon />} />
      ));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
