'use client';

import { useEffect } from 'react';
import type { SiteConfig } from '@/lib/site-config';

/**
 * Injects site-specific CSS custom properties into the document root.
 * This overrides the default design tokens with the active site's theme.
 */
export function ThemeInjector({ config }: { config: SiteConfig }) {
  useEffect(() => {
    const root = document.documentElement;
    const { colors, darkColors, fonts } = config.theme;

    // Light mode overrides
    root.style.setProperty('--color-accent', colors.primary);
    root.style.setProperty('--color-accent-hover', colors.secondary);
    root.style.setProperty('--color-accent-active', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-background-secondary', colors.surface);
    root.style.setProperty('--color-text-primary', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);

    // Font overrides
    root.style.setProperty(
      '--font-family-sans',
      `${fonts.heading}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
    );

    // Store dark-mode values as data attributes so the CSS can pick them up
    root.setAttribute('data-dark-primary', darkColors.primary);
    root.setAttribute('data-dark-secondary', darkColors.secondary);
    root.setAttribute('data-dark-accent', darkColors.accent);
    root.setAttribute('data-dark-background', darkColors.background);
    root.setAttribute('data-dark-surface', darkColors.surface);
    root.setAttribute('data-dark-text', darkColors.text);
    root.setAttribute('data-dark-text-secondary', darkColors.textSecondary);

    // Cleanup on unmount
    return () => {
      const properties = [
        '--color-accent',
        '--color-accent-hover',
        '--color-accent-active',
        '--color-background',
        '--color-background-secondary',
        '--color-text-primary',
        '--color-text-secondary',
        '--font-family-sans',
      ];
      for (const prop of properties) {
        root.style.removeProperty(prop);
      }
    };
  }, [config]);

  return null;
}
