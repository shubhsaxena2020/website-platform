import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card Accessibility', () => {
  it('should have no accessibility violations with default props', async () => {
    const { container } = render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with all variants', async () => {
    const { container } = render(
      <>
        <Card variant="elevated">
          <p>Elevated</p>
        </Card>
        <Card variant="flat">
          <p>Flat</p>
        </Card>
        <Card variant="interactive">
          <p>Interactive</p>
        </Card>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with full card composition', async () => {
    const { container } = render(
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <CardTitle as="h3">Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>This is a card description</CardDescription>
        </CardContent>
        <CardFooter>
          <button type="button">Action</button>
        </CardFooter>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render proper heading hierarchy with CardTitle', () => {
    const { container } = render(
      <Card>
        <CardTitle as="h2">Section Title</CardTitle>
      </Card>
    );
    const heading = container.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toBe('Section Title');
  });
});
