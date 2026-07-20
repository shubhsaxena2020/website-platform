import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Contact from '../contact/page';

describe('Contact Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Contact />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Contact />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].tagName).toBe('H1');
  });

  it('should have accessible form with labels', () => {
    const { container } = render(<Contact />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      // Input should have either a label, aria-label, or aria-labelledby
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(
          label || ariaLabel || ariaLabelledBy
        ).toBeTruthy();
      }
    });
  });
});
