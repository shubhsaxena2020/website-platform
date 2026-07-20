import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Website Platform — our mission to elevate web design standards and create industry-level digital experiences.',
  openGraph: {
    title: 'About | Website Platform',
    description:
      'Learn about Website Platform — our mission to elevate web design standards and create industry-level digital experiences.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
