import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Blog from '../blog/page';

describe('Blog Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Blog />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Blog />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].tagName).toBe('H1');
  });

  it('should have accessible blog post links', () => {
    const { container } = render(<Blog />);
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});
