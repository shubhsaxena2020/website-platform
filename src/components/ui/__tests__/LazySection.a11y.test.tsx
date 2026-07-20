import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { LazySection } from '../LazySection';

describe('LazySection Accessibility', () => {
  it('should have no accessibility violations with children', async () => {
    const { container } = render(
      <LazySection>
        <p>Lazy loaded content</p>
      </LazySection>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with custom fallback', async () => {
    const { container } = render(
      <LazySection fallback={<div>Loading...</div>}>
        <p>Content</p>
      </LazySection>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render children correctly', () => {
    const { container } = render(
      <LazySection>
        <p>Test content</p>
      </LazySection>
    );
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Test content');
  });
});
