import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'error' | 'success';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, variant = 'default', className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;
    const hasError = variant === 'error' || !!error;

    const baseInputStyles =
      'w-full px-4 py-2.5 text-base bg-background border rounded-lg transition-colors duration-200 placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantInputStyles: Record<InputVariant, string> = {
      default:
        'border-border focus:border-accent focus:ring-accent',
      error:
        'border-error focus:border-error focus:ring-error',
      success:
        'border-success focus:border-success focus:ring-success',
    };

    const inputClasses = [baseInputStyles, variantInputStyles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, variant = 'default', className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;
    const hasError = variant === 'error' || !!error;

    const baseTextareaStyles =
      'w-full px-4 py-2.5 text-base bg-background border rounded-lg transition-colors duration-200 placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[120px]';

    const variantTextareaStyles: Record<InputVariant, string> = {
      default:
        'border-border focus:border-accent focus:ring-accent',
      error:
        'border-error focus:border-error focus:ring-error',
      success:
        'border-success focus:border-success focus:ring-success',
    };

    const textareaClasses = [baseTextareaStyles, variantTextareaStyles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
