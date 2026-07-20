import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how we use cookies to improve your browsing experience.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return (
    <Section className="py-16 lg:py-24">
      <Container>
        <div className="prose prose-gray max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Cookie Policy</h1>

          <p className="text-text-secondary mb-6">
            <em>Last updated: July 20, 2026</em>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. What Are Cookies</h2>
            <p className="text-text-secondary mb-4">
              Cookies are small text files that are stored on your device when you visit a website.
              They are widely used to make websites work efficiently and provide information to
              website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. How We Use Cookies</h2>
            <p className="text-text-secondary mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve your browsing experience</li>
              <li>Analyze website traffic and performance</li>
              <li>Provide personalized content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-text-primary mb-3">Essential Cookies</h3>
            <p className="text-text-secondary mb-4">
              These cookies are necessary for the website to function properly. They enable core
              functionality such as security, network management, and account access.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3">Analytics Cookies</h3>
            <p className="text-text-secondary mb-4">
              These cookies help us understand how visitors interact with our website by collecting
              and reporting information anonymously.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3">Preference Cookies</h3>
            <p className="text-text-secondary mb-4">
              These cookies allow the website to remember choices you make and provide enhanced,
              more personalized features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Managing Cookies</h2>
            <p className="text-text-secondary mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
              <li><strong>Opt-out Links:</strong> Use industry opt-out tools for analytics cookies</li>
              <li><strong>Cookie Consent:</strong> Manage your preferences through our cookie banner</li>
            </ul>
            <p className="text-text-secondary mb-4">
              Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Third-Party Cookies</h2>
            <p className="text-text-secondary mb-4">
              Some cookies are placed by third-party services that appear on our pages. We do not
              control these third-party cookies. You should check the relevant third-party privacy
              policies for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Updates to This Policy</h2>
            <p className="text-text-secondary mb-4">
              We may update this cookie policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have questions about our use of cookies, please contact us at{' '}
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
