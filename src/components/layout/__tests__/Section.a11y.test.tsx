import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Section } from '../Section';

describe('Section Accessibility', () => {
  it('should have no accessibility violations with default props', async () => {
    const { container } = render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with all padding options', async () => {
    const { container } = render(
      <>
        <Section padding="none"><p>None padding</p></Section>
        <Section padding="sm"><p>Small padding</p></Section>
        <Section padding="md"><p>Medium padding</p></Section>
        <Section padding="lg"><p>Large padding</p></Section>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with background variants', async () => {
    const { container } = render(
      <>
        <Section background="default"><p>Default background</p></Section>
        <Section background="secondary"><p>Secondary background</p></Section>
        <Section background="tertiary"><p>Tertiary background</p></Section>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render as a section element', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
