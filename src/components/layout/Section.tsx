import { type HTMLAttributes, type ReactNode } from 'react';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';
export type SectionBackground = 'default' | 'secondary' | 'tertiary';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  padding?: SectionPadding;
  background?: SectionBackground;
  children: ReactNode;
}

const paddingStyles: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-10 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
};

const backgroundStyles: Record<SectionBackground, string> = {
  default: '',
  secondary: 'bg-background-secondary',
  tertiary: 'bg-background-tertiary',
};

export function Section({
  padding = 'md',
  background = 'default',
  className = '',
  children,
  ...props
}: SectionProps) {
  const classes = [
    paddingStyles[padding],
    backgroundStyles[background],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
