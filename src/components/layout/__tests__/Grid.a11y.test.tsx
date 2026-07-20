import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Grid, GridItem } from '../Grid';

describe('Grid Accessibility', () => {
  it('should have no accessibility violations with default props', async () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with all column configurations', async () => {
    const { container } = render(
      <>
        <Grid columns={1}><div>1 col</div></Grid>
        <Grid columns={2}><div>2 col</div></Grid>
        <Grid columns={3}><div>3 col</div></Grid>
        <Grid columns={4}><div>4 col</div></Grid>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with GridItem', async () => {
    const { container } = render(
      <Grid columns={3}>
        <GridItem span={1}>Span 1</GridItem>
        <GridItem span={2}>Span 2</GridItem>
      </Grid>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render grid structure correctly', () => {
    const { container } = render(
      <Grid columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    const grid = container.querySelector('.grid');
    expect(grid).toBeTruthy();
  });
});
