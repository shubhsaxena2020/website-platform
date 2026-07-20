import { type HTMLAttributes, type ReactNode } from 'react';

export type GridColumns = 1 | 2 | 3 | 4;
export type GridGap = 'none' | 'sm' | 'md' | 'lg';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  gap?: GridGap;
  children: ReactNode;
}

const columnsStyles: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gapStyles: Record<GridGap, string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6 lg:gap-8',
  lg: 'gap-8 lg:gap-12',
};

export function Grid({
  columns = 3,
  gap = 'md',
  className = '',
  children,
  ...props
}: GridProps) {
  const classes = ['grid', columnsStyles[columns], gapStyles[gap], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4;
  children: ReactNode;
}

const spanStyles: Record<number, string> = {
  1: '',
  2: 'sm:col-span-2',
  3: 'sm:col-span-2 lg:col-span-3',
  4: 'sm:col-span-2 lg:col-span-3 xl:col-span-4',
};

export function GridItem({
  span = 1,
  className = '',
  children,
  ...props
}: GridItemProps) {
  const classes = [spanStyles[span], className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
