import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    variable: 'font-inter',
    subsets: ['latin'],
    display: 'swap',
  }),
}));

vi.mock('../../components/navigation/Navigation', () => ({
  Navigation: () => <nav aria-label="Main navigation"><span data-testid="mock-link">Home</span></nav>,
}));

vi.mock('../../components/navigation/Footer', () => ({
  Footer: () => <footer role="contentinfo"><p>Footer</p></footer>,
}));

vi.mock('../../components/ui/WebVitals', () => ({
  WebVitals: () => null,
}));

import RootLayout from '../layout';

describe('Root Layout Accessibility', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have skip link', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    const skipLink = container.querySelector('a.skip-link');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have main landmark with id', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    const main = container.querySelector('main#main-content');
    expect(main).toBeInTheDocument();
  });
});
