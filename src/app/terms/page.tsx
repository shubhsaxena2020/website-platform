import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read our terms and conditions for using our website creation platform.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <Section className="py-16 lg:py-24">
      <Container>
        <div className="prose prose-gray max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>

          <p className="text-text-secondary mb-6">
            <em>Last updated: July 20, 2026</em>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary mb-4">
              By accessing and using our website creation platform, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Services</h2>
            <p className="text-text-secondary mb-4">
              We provide website creation and development services. Our platform allows users to
              create, customize, and deploy websites. We reserve the right to modify or discontinue
              any part of our services at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Responsibilities</h2>
            <p className="text-text-secondary mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your content complies with applicable laws</li>
              <li>Not using our services for illegal or harmful purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Intellectual Property</h2>
            <p className="text-text-secondary mb-4">
              All content, features, and functionality of our platform are owned by us and are
              protected by copyright, trademark, and other intellectual property laws. You retain
              ownership of content you create using our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Payment Terms</h2>
            <p className="text-text-secondary mb-4">
              If you purchase any paid services, you agree to pay all applicable fees. Fees are
              non-refundable unless otherwise specified. We reserve the right to change our pricing
              with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Limitation of Liability</h2>
            <p className="text-text-secondary mb-4">
              We shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our services. Our total liability shall
              not exceed the amount paid by you in the twelve months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Termination</h2>
            <p className="text-text-secondary mb-4">
              We may terminate or suspend your access to our services immediately, without prior
              notice, for conduct that we determine, in our sole discretion, violates these terms
              or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Changes to Terms</h2>
            <p className="text-text-secondary mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting. Your continued use of our services constitutes acceptance
              of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Contact</h2>
            <p className="text-text-secondary mb-4">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@example.com" className="text-accent hover:underline">
                legal@example.com
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
