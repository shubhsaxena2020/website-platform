import { type HTMLAttributes, type ReactNode } from 'react';

export type CardVariant = 'elevated' | 'flat' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-background-elevated shadow-md border border-border',
  flat: 'bg-background-secondary border border-border',
  interactive:
    'bg-background-elevated shadow-sm border border-border hover:shadow-lg hover:border-border-hover transition-all duration-200 cursor-pointer',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'elevated',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const classes = [
    'rounded-xl',
    variantStyles[variant],
    paddingStyles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({
  as: Component = 'h3',
  className = '',
  children,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={`text-xl font-semibold text-text-primary ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function CardDescription({
  className = '',
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p className={`text-text-secondary ${className}`} {...props}>
      {children}
    </p>
  );
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ className = '', children, ...props }: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`} {...props}>
      {children}
    </div>
  );
}
