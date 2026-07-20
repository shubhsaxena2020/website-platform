import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Input, Textarea } from '../Input';

describe('Input Accessibility', () => {
  it('should have no accessibility violations with label', async () => {
    const { container } = render(<Input label="Name" placeholder="Enter name" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with error', async () => {
    const { container } = render(
      <Input label="Email" error="Email is required" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with helper text', async () => {
    const { container } = render(
      <Input label="Password" helperText="Must be at least 8 characters" type="password" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should associate label with input', () => {
    const { container } = render(<Input label="Email" />);
    const label = container.querySelector('label[for]');
    const input = container.querySelector('input');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label?.getAttribute('for')).toBe(input?.id);
  });

  it('should have aria-invalid when error is present', () => {
    const { container } = render(<Input label="Email" error="Invalid email" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have aria-describedby for error messages', () => {
    const { container } = render(
      <Input label="Email" error="Email is required" />
    );
    const input = container.querySelector('input');
    const errorEl = container.querySelector('[role="alert"]');
    expect(input).toHaveAttribute('aria-describedby', errorEl?.id);
  });
});

describe('Textarea Accessibility', () => {
  it('should have no accessibility violations with label', async () => {
    const { container } = render(
      <Textarea label="Message" placeholder="Enter message" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with error', async () => {
    const { container } = render(
      <Textarea label="Message" error="Message is too short" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should associate label with textarea', () => {
    const { container } = render(<Textarea label="Message" />);
    const label = container.querySelector('label[for]');
    const textarea = container.querySelector('textarea');
    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(label?.getAttribute('for')).toBe(textarea?.id);
  });
});
