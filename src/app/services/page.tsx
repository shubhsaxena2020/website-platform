import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'End-to-end website solutions — design, development, design systems, and SEO optimization for industry-level digital experiences.',
  openGraph: {
    title: 'Services | Website Platform',
    description:
      'End-to-end website solutions — design, development, design systems, and SEO optimization for industry-level digital experiences.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
