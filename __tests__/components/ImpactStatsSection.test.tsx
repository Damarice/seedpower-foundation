import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { ImpactStatsSection } from '@/components/sections/ImpactStatsSection';

const stats = [
  { figure: '375', label: 'Children Supported' },
  { figure: '1,738', label: 'People Reached Through Teacher Development' },
  { figure: '~100', label: 'Women Trained' },
  { figure: '2018', label: 'Year Founded' },
];

let intersectionCallback: IntersectionObserverCallback;
let observe: jest.Mock;
let disconnect: jest.Mock;

function getVisibleCounterText(testId: string): string {
  const visibleValue = screen.getByTestId(testId).querySelector('[aria-hidden="true"]');
  if (!visibleValue) throw new Error(`Visible counter value not found: ${testId}`);
  return visibleValue.textContent ?? '';
}

function installBrowserMocks(reducedMotion = false) {
  observe = jest.fn();
  disconnect = jest.fn();
  const constructor = jest.fn((callback: IntersectionObserverCallback) => {
    intersectionCallback = callback;
    return {
      observe,
      disconnect,
      unobserve: jest.fn(),
      takeRecords: jest.fn(() => []),
      root: null,
      rootMargin: '0px',
      thresholds: [0.2],
    } as unknown as IntersectionObserver;
  });

  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: constructor,
  });
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn().mockReturnValue({
      matches: reducedMotion,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
}

describe('ImpactStatsSection', () => {
  beforeEach(() => {
    installBrowserMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    Reflect.deleteProperty(window, 'IntersectionObserver');
  });

  it('renders exactly the approved figures and labels without a title or introduction', () => {
    render(<ImpactStatsSection stats={stats} />);

    expect(screen.getByRole('region', { name: 'Our impact' })).toBeInTheDocument();
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
    for (const stat of stats) {
      expect(screen.getByText(stat.figure, { selector: '.sr-only' })).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
    expect(getVisibleCounterText('impact-counter-1738')).toBe('1,738');
  });

  it('animates from zero after the section enters view and finishes within two seconds', () => {
    jest.useFakeTimers();
    render(<ImpactStatsSection stats={stats} />);

    const section = screen.getByRole('region', { name: 'Our impact' });
    expect(observe).toHaveBeenCalledWith(section);

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(getVisibleCounterText('impact-counter-375')).toBe('0');
    act(() => jest.advanceTimersByTime(900));
    const midwayValue = Number(
      screen.getByTestId('impact-counter-375').querySelector('[aria-hidden]')?.textContent
    );
    expect(midwayValue).toBeGreaterThan(0);
    expect(midwayValue).toBeLessThan(375);

    act(() => jest.advanceTimersByTime(1000));
    expect(getVisibleCounterText('impact-counter-375')).toBe('375');
    expect(getVisibleCounterText('impact-counter-1738')).toBe('1,738');
    expect(getVisibleCounterText('impact-counter-100')).toBe('~100');
    expect(getVisibleCounterText('impact-counter-2018')).toBe('2018');
    expect(disconnect).toHaveBeenCalled();
  });

  it('shows final formatted figures immediately when reduced motion is enabled', () => {
    installBrowserMocks(true);
    jest.useFakeTimers();
    render(<ImpactStatsSection stats={stats} />);

    expect(getVisibleCounterText('impact-counter-375')).toBe('375');
    expect(getVisibleCounterText('impact-counter-1738')).toBe('1,738');
    expect(getVisibleCounterText('impact-counter-100')).toBe('~100');
    expect(getVisibleCounterText('impact-counter-2018')).toBe('2018');
    expect(observe).not.toHaveBeenCalled();
  });

  it('keeps final figures visible if IntersectionObserver is unavailable', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');
    render(<ImpactStatsSection stats={stats} />);

    expect(getVisibleCounterText('impact-counter-375')).toBe('375');
    expect(getVisibleCounterText('impact-counter-1738')).toBe('1,738');
    expect(getVisibleCounterText('impact-counter-100')).toBe('~100');
    expect(getVisibleCounterText('impact-counter-2018')).toBe('2018');
  });
});
