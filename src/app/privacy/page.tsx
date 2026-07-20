import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn about how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <Section className="py-16 lg:py-24">
      <Container>
        <div className="prose prose-gray max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>

          <p className="text-text-secondary mb-6">
            <em>Last updated: July 20, 2026</em>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Introduction</h2>
            <p className="text-text-secondary mb-4">
              Welcome to our website creation platform. We respect your privacy and are committed to
              protecting your personal data. This privacy policy explains how we collect, use, and
              safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
            <p className="text-text-secondary mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li>Personal information you provide (name, email address, phone number)</li>
              <li>Usage data (pages visited, time spent, interaction patterns)</li>
              <li>Device information (browser type, operating system, device type)</li>
              <li>Contact form submissions and inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-text-secondary mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send relevant updates (with your consent)</li>
              <li>Analyze website usage to enhance user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
            <p className="text-text-secondary mb-4">
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Cookies</h2>
            <p className="text-text-secondary mb-4">
              We use cookies to enhance your browsing experience. You can choose to disable cookies
              through your browser settings, though some features may not function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Third-Party Services</h2>
            <p className="text-text-secondary mb-4">
              We may use third-party services that collect information used to identify you. These
              services have their own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Your Rights</h2>
            <p className="text-text-secondary mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Changes to This Policy</h2>
            <p className="text-text-secondary mb-4">
              We may update this privacy policy from time to time. We will notify you of any
              changes by posting the new policy on this page with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:privacy@example.com" className="text-accent hover:underline">
                privacy@example.com
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
