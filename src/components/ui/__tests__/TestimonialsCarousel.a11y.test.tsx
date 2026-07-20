import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { TestimonialsCarousel } from '../TestimonialsCarousel';
import type { Testimonial } from '../TestimonialsCarousel';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    <img alt={alt} {...props} />
  ),
}));

const mockTestimonials: Testimonial[] = [
  {
    quote: 'Amazing work!',
    author: 'John Doe',
    role: 'CEO',
  },
  {
    quote: 'Highly recommended!',
    author: 'Jane Smith',
    role: 'CTO',
  },
];

describe('TestimonialsCarousel Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={mockTestimonials} autoPlay={false} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper carousel ARIA attributes', () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={mockTestimonials} autoPlay={false} />
    );
    const region = container.querySelector('[role="region"]');
    expect(region).toBeTruthy();
    expect(region).toHaveAttribute('aria-label', 'Testimonials');
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('should have slide group with proper ARIA', () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={mockTestimonials} autoPlay={false} />
    );
    const slideGroup = container.querySelector('[role="group"]');
    expect(slideGroup).toBeTruthy();
    expect(slideGroup).toHaveAttribute('aria-roledescription', 'slide');
    expect(slideGroup).toHaveAttribute('aria-label', 'Testimonial 1 of 2');
  });

  it('should have navigation buttons with accessible labels', () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={mockTestimonials} autoPlay={false} />
    );
    const prevButton = container.querySelector('[aria-label="Previous testimonial"]');
    const nextButton = container.querySelector('[aria-label="Next testimonial"]');
    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  it('should have dot navigation with tab roles', () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={mockTestimonials} autoPlay={false} />
    );
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toBeTruthy();
    expect(tablist).toHaveAttribute('aria-label', 'Testimonial slides');

    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });
});
