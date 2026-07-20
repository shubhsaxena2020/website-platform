'use client';

import { createContext, useContext } from 'react';
import type { SiteConfig } from '@/lib/site-config';

/**
 * React context for site configuration.
 * The root layout injects the config; any client component can read it.
 */
const SiteConfigContext = createContext<SiteConfig | null>(null);

export interface SiteConfigProviderProps {
  config: SiteConfig;
  children: React.ReactNode;
}

export function SiteConfigProvider({
  config,
  children,
}: SiteConfigProviderProps) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

/**
 * Hook to access the current site configuration from any client component.
 * Must be used inside a <SiteConfigProvider>.
 */
export function useSiteConfig(): SiteConfig {
  const config = useContext(SiteConfigContext);
  if (!config) {
    throw new Error('useSiteConfig must be used inside a <SiteConfigProvider>');
  }
  return config;
}
