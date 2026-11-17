import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StoryCard } from '@/components/composite/StoryCard';

expect.extend(toHaveNoViolations);

const baseProps = {
  heading: 'From 12 to 375 Students',
  body: 'SeedPower Foundation began with just 12 students in 2019 and has grown to support 375 students across two campuses.',
};

describe('StoryCard', () => {
  it('renders without error', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders the heading as an H3', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    const heading = screen.getByRole('heading', { level: 3, name: 'From 12 to 375 Students' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the body text', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    expect(screen.getByText(baseProps.body)).toBeInTheDocument();
  });

  it('renders attribution when provided', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} attribution="Beldon Winfrey, Executive Director" />);
    });
    expect(screen.getByText('Beldon Winfrey, Executive Director')).toBeInTheDocument();
  });

  it('does not render attribution when prop is absent', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    // No third paragraph — only heading (h3) and body (p)
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBe(1);
  });

  it('renders an avatar image when avatarSrc is provided', async () => {
    await act(async () => {
      render(
        <StoryCard
          {...baseProps}
          avatarSrc="/images/team/beldon.jpg"
          avatarAlt="Beldon Winfrey"
        />
      );
    });
    const avatar = screen.getByRole('img', { name: 'Beldon Winfrey' });
    expect(avatar).toHaveAttribute('src', '/images/team/beldon.jpg');
  });

  it('does not render an avatar when avatarSrc is absent', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies the brand colour class to the heading', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} />);
    });
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.className).toContain('text-[var(--color-brand)]');
  });

  it('applies the left border accent class', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<StoryCard {...baseProps} />));
    });
    const article = container.querySelector('article') as HTMLElement;
    expect(article.className).toContain('border-l-4');
    expect(article.className).toContain('border-l-[var(--color-brand)]');
  });

  it('applies additional className to the outer element', async () => {
    await act(async () => {
      render(<StoryCard {...baseProps} className="extra-class" />);
    });
    expect(screen.getByRole('article').className).toContain('extra-class');
  });

  it('passes axe accessibility check', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <StoryCard
          {...baseProps}
          attribution="Beldon Winfrey, Executive Director"
        />
      ));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe accessibility check with avatar', async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(
        <StoryCard
          {...baseProps}
          avatarSrc="/images/team/beldon.jpg"
          avatarAlt="Beldon Winfrey"
        />
      ));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
