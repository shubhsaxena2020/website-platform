import { type HTMLAttributes, type ReactNode } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-[var(--container-sm)]',
  md: 'max-w-[var(--container-md)]',
  lg: 'max-w-[var(--container-lg)]',
  xl: 'max-w-[var(--container-xl)]',
  '2xl': 'max-w-[var(--container-2xl)]',
  full: 'max-w-full',
};

export function Container({
  size = 'xl',
  className = '',
  children,
  ...props
}: ContainerProps) {
  const classes = ['mx-auto px-4 sm:px-6 lg:px-8', sizeStyles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
