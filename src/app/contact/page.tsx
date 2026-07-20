import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Ready to create something exceptional? Get in touch with Website Platform to discuss your project.',
  openGraph: {
    title: 'Contact | Website Platform',
    description:
      'Ready to create something exceptional? Get in touch with Website Platform to discuss your project.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
