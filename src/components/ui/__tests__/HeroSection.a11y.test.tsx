import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { HeroSection } from '../HeroSection';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HeroSection Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HeroSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have a main heading (h1)', () => {
    const { container } = render(<HeroSection />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('Industry-Level Websites');
  });

  it('should have proper landmark regions', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });

  it('should have accessible links with href', () => {
    const { container } = render(<HeroSection />);
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('should have accessible CTA buttons', () => {
    const { container } = render(<HeroSection />);
    const links = container.querySelectorAll('a');
    // Should have at least "Start Your Project" and "Learn More"
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
