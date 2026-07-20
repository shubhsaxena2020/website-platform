import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Container } from '../Container';

describe('Container Accessibility', () => {
  it('should have no accessibility violations with default props', async () => {
    const { container } = render(
      <Container>
        <p>Container content</p>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with all sizes', async () => {
    const { container } = render(
      <>
        <Container size="sm"><p>Small</p></Container>
        <Container size="md"><p>Medium</p></Container>
        <Container size="lg"><p>Large</p></Container>
        <Container size="xl"><p>Extra Large</p></Container>
        <Container size="2xl"><p>2XL</p></Container>
        <Container size="full"><p>Full</p></Container>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render children correctly', () => {
    const { container } = render(
      <Container>
        <p>Test content</p>
      </Container>
    );
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Test content');
  });
});
