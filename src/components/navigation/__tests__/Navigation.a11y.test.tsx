import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Navigation } from '../Navigation';
import { TestWrapper } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('../../ui/ThemeToggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">Theme</button>,
}));

describe('Navigation Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper nav landmark with label', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('should have mobile menu button with aria-expanded', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('should have proper link names for logo', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    const logos = screen.getAllByRole('link', { name: /go to .* homepage/i });
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });
});
