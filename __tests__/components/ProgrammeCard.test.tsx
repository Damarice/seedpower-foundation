import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ProgrammeCard } from '@/components/composite/ProgrammeCard';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const baseProps = {
  title: 'Education Centers',
  description: 'Providing quality education to children in Oyugis and Nyakach.',
  href: '/what-we-do/education',
};

describe('ProgrammeCard', () => {
  it('renders without error', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders the programme title as an H3', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    const heading = screen.getByRole('heading', { level: 3, name: 'Education Centers' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it('renders the CTA link pointing to the given href', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toHaveAttribute('href', '/what-we-do/education');
  });

  it('renders a placeholder image area when imageSrc is not provided', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    expect(
      screen.getByRole('img', { name: 'Photo placeholder for Education Centers' })
    ).toBeInTheDocument();
    expect(screen.getByText('Photo placeholder')).toBeInTheDocument();
  });

  it('renders an img element when imageSrc is provided', async () => {
    await act(async () => {
      render(
        <ProgrammeCard
          {...baseProps}
          imageSrc="/images/programmes/education.jpg"
          imageAlt="Students in a classroom"
        />
      );
    });
    const img = screen.getByRole('img', { name: 'Students in a classroom' });
    expect(img.getAttribute('src')).toContain(
      encodeURIComponent('/images/programmes/education.jpg')
    );
  });

  it('renders stats when provided', async () => {
    await act(async () => {
      render(
        <ProgrammeCard
          {...baseProps}
          stats={[{ label: '375 students' }, { label: 'Est. 2019' }]}
        />
      );
    });
    expect(screen.getByText('375 students · Est. 2019')).toBeInTheDocument();
  });

  it('does not render stats section when stats prop is absent', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    expect(screen.queryByLabelText('Programme statistics')).not.toBeInTheDocument();
  });

  it('renders the approved impact detail', async () => {
    await act(async () => {
      render(
        <ProgrammeCard
          {...baseProps}
          impactDetail="375 students supported"
        />
      );
    });
    expect(screen.getByLabelText('Programme impact')).toHaveTextContent(
      '375 students supported'
    );
  });

  it('renders programme status when provided', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} status="In Development" />);
    });
    expect(screen.getByLabelText('Programme status')).toHaveTextContent('In Development');
  });

  it('applies additional className to the outer element', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} className="extra-class" />);
    });
    expect(screen.getByRole('article').className).toContain('extra-class');
  });

  it('renders an accessible link with programme-specific name', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    const link = screen.getByRole('link', { name: /learn more about education centers/i });
    expect(link).toBeInTheDocument();
  });

  it('has the correct heading colour class', async () => {
    await act(async () => {
      render(<ProgrammeCard {...baseProps} />);
    });
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.className).toContain('text-[var(--color-brand)]');
  });

  it('passes axe accessibility check', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <ProgrammeCard
          {...baseProps}
          stats={[{ label: '375 students' }]}
          imageAlt="Students"
        />
      ));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
