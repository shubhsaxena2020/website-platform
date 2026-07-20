'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Grid } from '../../components/layout/Grid';

const services = [
  {
    icon: '🎨',
    title: 'Website Design',
    description:
      'Custom, pixel-perfect designs that capture your brand essence and deliver premium user experiences.',
    features: ['Custom design', 'Brand alignment', 'Responsive layouts', 'Animation systems'],
  },
  {
    icon: '⚙️',
    title: 'Development',
    description:
      'Performance-optimized development using modern frameworks. Fast, accessible, and maintainable.',
    features: ['Next.js/React', 'TypeScript', 'API integration', 'CMS setup'],
  },
  {
    icon: '🔧',
    title: 'Design Systems',
    description:
      'Scalable component libraries that ensure consistency across your digital presence.',
    features: ['Component library', 'Documentation', 'Theme system', 'Usage guidelines'],
  },
  {
    icon: '📈',
    title: 'SEO & Performance',
    description:
      'Technical optimization that ensures your website ranks and performs at the highest level.',
    features: ['Core Web Vitals', 'Technical SEO', 'Analytics setup', 'Performance audits'],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We learn about your brand, goals, and audience to create a strategic foundation.',
  },
  {
    step: '02',
    title: 'Design',
    description:
      'Pixel-perfect mockups and prototypes that bring your vision to life with Apple-tier quality.',
  },
  {
    step: '03',
    title: 'Develop',
    description:
      'Clean, performant code built with modern frameworks and best practices.',
  },
  {
    step: '04',
    title: 'Launch',
    description:
      'Thorough testing, optimization, and deployment to ensure a flawless launch.',
  },
];

export function ServicesPageClient() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="pt-32 lg:pt-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} aria-hidden="true" />
        <Container>
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="text-accent">Services</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From concept to launch, we deliver end-to-end website solutions
              that elevate your brand and drive results.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section padding="md" background="secondary">
        <Container>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comprehensive solutions for industry-level websites
            </motion.p>
          </div>

          <Grid columns={2} gap="lg">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <CardContent>
                    <span className="text-4xl mb-4 block" aria-hidden="true">
                      {service.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-text-secondary"
                        >
                          <svg
                            className="h-4 w-4 text-accent mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Process Section */}
      <Section padding="md">
        <Container>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A proven approach that delivers exceptional results every time
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-accent/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="md" background="secondary">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your project and create something exceptional
              together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Contact Us
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
