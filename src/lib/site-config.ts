/**
 * Site Configuration System
 *
 * This module handles multi-site configuration for the website platform.
 * Each site is identified by a SITE_ID environment variable and has its own
 * configuration file in the sites/ directory.
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// Types
// ============================================================================

export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface SiteFonts {
  heading: string;
  body: string;
}

export interface SiteTheme {
  colors: SiteColors;
  darkColors: SiteColors;
  fonts: SiteFonts;
}

export interface SiteHeroCTA {
  primary: string;
  secondary: string;
}

export interface SiteHero {
  badge: string;
  title: string;
  subtitle: string;
  cta: SiteHeroCTA;
}

export interface SiteFeature {
  title: string;
  description: string;
  icon: string;
}

export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteCompany {
  name: string;
  description: string;
}

export interface SiteContent {
  title: string;
  tagline: string;
  description: string;
  company: SiteCompany;
  hero: SiteHero;
  features: SiteFeature[];
  navigation: SiteNavItem[];
  footer: {
    copyright: string;
    links: SiteNavItem[];
  };
}

export interface SiteSEO {
  titleTemplate: string;
  defaultTitle: string;
  description: string;
  keywords: string[];
  ogType: string;
}

export interface SiteAnalytics {
  googleAnalytics: string;
  vercelAnalytics: boolean;
  sentryDsn: string;
}

export interface SiteFeatures {
  darkMode: boolean;
  blog: boolean;
  contactForm: boolean;
  newsletter: boolean;
  testimonials: boolean;
}

export interface SiteBrand {
  logo: string;
  favicon: string;
  ogImage: string;
}

export interface SiteConfig {
  id: string;
  name: string;
  description: string;
  domain: string;
  url: string;
  brand: SiteBrand;
  theme: SiteTheme;
  content: SiteContent;
  seo: SiteSEO;
  analytics: SiteAnalytics;
  features: SiteFeatures;
}

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_SITE_CONFIG: SiteConfig = {
  id: 'default',
  name: 'Website Platform',
  description: 'A website built with the website creation platform',
  domain: 'localhost:3000',
  url: 'http://localhost:3000',

  brand: {
    logo: '/logo.svg',
    favicon: '/favicon.ico',
    ogImage: '/og-image.png',
  },

  theme: {
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      accent: '#FF2D55',
      background: '#FFFFFF',
      surface: '#F2F2F7',
      text: '#1C1C1E',
      textSecondary: '#8E8E93',
    },
    darkColors: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      accent: '#FF375F',
      background: '#1C1C1E',
      surface: '#2C2C2E',
      text: '#FFFFFF',
      textSecondary: '#8E8E93',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },

  content: {
    title: 'Website Platform',
    tagline: 'Apple-tier website creation platform',
    description: 'A website built with the website creation platform',
    company: {
      name: 'Website Platform',
      description: 'Building the future of web development',
    },
    hero: {
      badge: 'Welcome',
      title: 'Build Beautiful Websites',
      subtitle:
        'Create industry-level websites with pixel-perfect design and smooth animations.',
      cta: {
        primary: 'Get Started',
        secondary: 'Learn More',
      },
    },
    features: [
      {
        title: 'Pixel-Perfect Design',
        description: 'Every component follows Apple-tier design principles.',
        icon: 'palette',
      },
      {
        title: 'Lightning Fast',
        description: 'Optimized for Core Web Vitals and performance.',
        icon: 'zap',
      },
      {
        title: 'Fully Accessible',
        description: 'WCAG 2.1 AA compliant with semantic HTML.',
        icon: 'users',
      },
    ],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: {
      copyright: '© 2026 Website Platform. All rights reserved.',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  },

  seo: {
    titleTemplate: '%s | Website Platform',
    defaultTitle: 'Website Platform - Apple-tier website creation platform',
    description: 'A website built with the website creation platform',
    keywords: ['website', 'design', 'development'],
    ogType: 'website',
  },

  analytics: {
    googleAnalytics: '',
    vercelAnalytics: true,
    sentryDsn: '',
  },

  features: {
    darkMode: true,
    blog: true,
    contactForm: true,
    newsletter: false,
    testimonials: true,
  },
};

// ============================================================================
// Configuration Loader
// ============================================================================

/**
 * Get the current site ID from environment variables
 */
export function getSiteId(): string {
  return process.env.SITE_ID || 'demo';
}

/**
 * Load a site configuration by ID.
 * Reads from sites/{id}/site.json at build time / server runtime.
 * Falls back to environment overrides, then to the built-in defaults.
 */
export function getSiteConfig(siteId?: string): SiteConfig {
  const id = siteId || getSiteId();

  // Try to load from sites/{id}/site.json
  let fileConfig: Partial<SiteConfig> | null = null;
  try {
    const configPath = path.join(process.cwd(), 'sites', id, 'site.json');
    const raw = fs.readFileSync(configPath, 'utf-8');
    fileConfig = JSON.parse(raw) as SiteConfig;
  } catch {
    // Site JSON not found – fall through to defaults
  }

  // Merge: file config → defaults → env overrides
  const config: SiteConfig = {
    ...DEFAULT_SITE_CONFIG,
    ...(fileConfig ?? {}),
    id,
    name:
      process.env.SITE_NAME ||
      fileConfig?.name ||
      DEFAULT_SITE_CONFIG.name,
    description:
      process.env.SITE_DESCRIPTION ||
      fileConfig?.description ||
      DEFAULT_SITE_CONFIG.description,
    domain:
      process.env.SITE_DOMAIN ||
      fileConfig?.domain ||
      DEFAULT_SITE_CONFIG.domain,
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      fileConfig?.url ||
      DEFAULT_SITE_CONFIG.url,
  };

  // Override theme colors from environment if provided
  if (process.env.SITE_PRIMARY_COLOR) {
    config.theme.colors.primary = process.env.SITE_PRIMARY_COLOR;
  }
  if (process.env.SITE_SECONDARY_COLOR) {
    config.theme.colors.secondary = process.env.SITE_SECONDARY_COLOR;
  }
  if (process.env.SITE_ACCENT_COLOR) {
    config.theme.colors.accent = process.env.SITE_ACCENT_COLOR;
  }

  // Override content from environment if provided
  if (process.env.SITE_TAGLINE) {
    config.content.tagline = process.env.SITE_TAGLINE;
  }
  if (process.env.SITE_COMPANY_NAME) {
    config.content.company.name = process.env.SITE_COMPANY_NAME;
  }

  // Override SEO from environment if provided
  if (process.env.SITE_SEO_TITLE) {
    config.seo.defaultTitle = process.env.SITE_SEO_TITLE;
  }
  if (process.env.SITE_SEO_DESCRIPTION) {
    config.seo.description = process.env.SITE_SEO_DESCRIPTION;
  }

  return config;
}

/**
 * Generate CSS custom properties from site configuration
 * This is used to inject site-specific theme variables at build time
 */
export function generateThemeCSS(config: SiteConfig): string {
  const { colors, darkColors, fonts } = config.theme;

  return `
:root {
  /* Primary Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};

  /* Background Colors */
  --color-background: ${colors.background};
  --color-surface: ${colors.surface};

  /* Text Colors */
  --color-text: ${colors.text};
  --color-text-secondary: ${colors.textSecondary};

  /* Fonts */
  --font-heading: ${fonts.heading}, system-ui, -apple-system, sans-serif;
  --font-body: ${fonts.body}, system-ui, -apple-system, sans-serif;
}

.dark {
  /* Primary Colors */
  --color-primary: ${darkColors.primary};
  --color-secondary: ${darkColors.secondary};
  --color-accent: ${darkColors.accent};

  /* Background Colors */
  --color-background: ${darkColors.background};
  --color-surface: ${darkColors.surface};

  /* Text Colors */
  --color-text: ${darkColors.text};
  --color-text-secondary: ${darkColors.textSecondary};
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Primary Colors */
    --color-primary: ${darkColors.primary};
    --color-secondary: ${darkColors.secondary};
    --color-accent: ${darkColors.accent};

    /* Background Colors */
    --color-background: ${darkColors.background};
    --color-surface: ${darkColors.surface};

    /* Text Colors */
    --color-text: ${darkColors.text};
    --color-text-secondary: ${darkColors.textSecondary};
  }
}
`.trim();
}

/**
 * Generate metadata for a page based on site configuration
 */
export function generateMetadata(
  config: SiteConfig,
  pageTitle?: string,
  pageDescription?: string
) {
  const title = pageTitle
    ? config.seo.titleTemplate.replace('%s', pageTitle)
    : config.seo.defaultTitle;
  const description = pageDescription || config.seo.description;

  return {
    title,
    description,
    keywords: config.seo.keywords,
    openGraph: {
      title,
      description,
      type: config.seo.ogType as 'website',
      url: config.url,
      siteName: config.name,
      images: [
        {
          url: `${config.url}${config.brand.ogImage}`,
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [`${config.url}${config.brand.ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Check if a feature is enabled for the current site
 */
export function isFeatureEnabled(
  config: SiteConfig,
  feature: keyof SiteFeatures
): boolean {
  return config.features[feature] ?? false;
}

/**
 * List all available sites
 * Scans the sites/ directory for valid site configurations
 */
export async function listAvailableSites(): Promise<string[]> {
  const fs = await import('fs/promises');
  const path = await import('path');

  const sitesDir = path.join(process.cwd(), 'sites');
  const sites: string[] = [];

  try {
    // Check if sites directory exists
    await fs.access(sitesDir);

    // Read all directories in sites/
    const entries = await fs.readdir(sitesDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const siteJsonPath = path.join(sitesDir, entry.name, 'site.json');

        try {
          // Check if site.json exists and is valid
          const content = await fs.readFile(siteJsonPath, 'utf-8');
          const config = JSON.parse(content);

          // Validate required fields
          if (config.id && config.name && config.domain) {
            sites.push(entry.name);
          }
        } catch {
          // Skip invalid site configurations
          console.warn(`Invalid site configuration: ${entry.name}`);
        }
      }
    }
  } catch {
    // If sites directory doesn't exist, return empty array
    console.warn('Sites directory not found');
  }

  // Fallback to demo if no sites found
  if (sites.length === 0) {
    return ['demo'];
  }

  return sites;
}

/**
 * Validate a site configuration
 */
export function validateSiteConfig(config: unknown): config is SiteConfig {
  if (typeof config !== 'object' || config === null) {
    return false;
  }

  const obj = config as Record<string, unknown>;

  // Check required fields
  if (typeof obj.id !== 'string' || typeof obj.name !== 'string') {
    return false;
  }

  if (typeof obj.theme !== 'object' || obj.theme === null) {
    return false;
  }

  const theme = obj.theme as Record<string, unknown>;
  if (typeof theme.colors !== 'object' || theme.colors === null) {
    return false;
  }

  return true;
}
