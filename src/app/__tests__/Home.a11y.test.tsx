import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Home from '../page';
import { TestWrapper } from '@/test-utils';

describe('Home Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);
    // First heading should be h1
    expect(headings[0].tagName).toBe('H1');
  });

  it('should have accessible links', () => {
    const { container } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});
