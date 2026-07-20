import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '../components/navigation/Navigation';
import { Footer } from '../components/navigation/Footer';
import { WebVitals } from '../components/ui/WebVitals';
import { SiteConfigProvider, ThemeInjector } from '../components/providers';
import { PageTransition } from '../components/layout/PageTransition';
import { getSiteConfig, generateMetadata } from '../lib/site-config';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const siteConfig = getSiteConfig();

export const metadata: Metadata = generateMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <WebVitals />
        <ThemeInjector config={siteConfig} />
        <SiteConfigProvider config={siteConfig}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation
            items={siteConfig.content.navigation}
            cta={{
              label: siteConfig.content.hero.cta.primary,
              href: '/contact',
            }}
          />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer
            copyright={siteConfig.content.footer.copyright}
            sections={[
              {
                title: siteConfig.content.company.name,
                links: [
                  { label: 'About', href: '/about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Contact', href: '/contact' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Blog', href: '/blog' },
                  { label: 'Services', href: '/services' },
                  { label: 'Contact', href: '/contact' },
                ],
              },
              {
                title: 'Legal',
                links: siteConfig.content.footer.links.map((link) => ({
                  label: link.label,
                  href: link.href,
                })),
              },
            ]}
          />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
