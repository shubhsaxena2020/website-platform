import { ReactNode } from 'react';
import { SiteConfigProvider } from './components/providers/SiteConfigProvider';
import type { SiteConfig } from './lib/site-config';

const mockSiteConfig: SiteConfig = {
  id: 'test',
  name: 'Test Site',
  description: 'A test site for unit tests',
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
    title: 'Test Site',
    tagline: 'Test tagline',
    description: 'Test description',
    company: {
      name: 'Test Company',
      description: 'Test company description',
    },
    hero: {
      badge: 'Welcome',
      title: 'Test Hero Title',
      subtitle: 'Test Hero Subtitle',
      cta: {
        primary: 'Get Started',
        secondary: 'Learn More',
      },
    },
    features: [],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ],
    footer: {
      copyright: '© 2026 Test',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  },
  seo: {
    titleTemplate: '%s | Test Site',
    defaultTitle: 'Test Site',
    description: 'Test description',
    keywords: ['test'],
    ogType: 'website',
  },
  analytics: {
    googleAnalytics: '',
    vercelAnalytics: false,
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

export function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <SiteConfigProvider config={mockSiteConfig}>
      {children}
    </SiteConfigProvider>
  );
}

export { mockSiteConfig };
