'use client';

import { type ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function DefaultFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function LazySection({ children, fallback }: LazySectionProps) {
  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      {children}
    </Suspense>
  );
}

// Dynamic import wrapper for heavy components
export function dynamicImport<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options?: { loading?: () => ReactNode; ssr?: boolean }
) {
  return dynamic(importFn, {
    loading: options?.loading || (() => <DefaultFallback />),
    ssr: options?.ssr ?? true,
  });
}
