import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Footer } from '../Footer';
import { TestWrapper } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have footer element', () => {
    const { container } = render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should have proper list structure for link sections', () => {
    const { container } = render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
    const lists = container.querySelectorAll('ul[role="list"]');
    expect(lists.length).toBeGreaterThan(0);
  });

  it('should have accessible social media links', () => {
    const { container } = render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
    const twitter = container.querySelector('a[aria-label="Twitter"]');
    const github = container.querySelector('a[aria-label="GitHub"]');
    const linkedin = container.querySelector('a[aria-label="LinkedIn"]');
    expect(twitter).toBeInTheDocument();
    expect(github).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
  });
});
