'use client';

import { motion } from 'framer-motion';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Grid } from '../../components/layout/Grid';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/Card';

const values = [
  {
    icon: '✨',
    title: 'Excellence',
    description:
      'We never settle for good enough. Every pixel, every animation, every interaction is crafted to perfection.',
  },
  {
    icon: '🎯',
    title: 'Precision',
    description:
      'Attention to detail is our superpower. We measure in pixels and perfect in proportions.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description:
      'We stay at the cutting edge of web technology to deliver experiences that feel premium.',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description:
      'Your success is our success. We work as an extension of your team to achieve exceptional results.',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Lead Designer',
    bio: 'Former Apple designer with 10+ years of experience creating premium digital experiences.',
  },
  {
    name: 'Jordan Lee',
    role: 'Head of Engineering',
    bio: 'Full-stack architect specializing in high-performance, accessible web applications.',
  },
  {
    name: 'Sam Chen',
    role: 'Design Systems Lead',
    bio: 'Expert in building scalable design systems that maintain consistency across products.',
  },
];

export function AboutPageClient() {
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
              About <span className="text-accent">Website Platform</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We&apos;re on a mission to elevate the standard of web design. Every
              website we create is a testament to what&apos;s possible when craft
              meets technology.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section padding="md" background="secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary mb-4">
                The web is filled with mediocre websites. We believe every business
                deserves an online presence that matches the quality of their work.
                That&apos;s why we build industry-level websites — the kind Apple
                creates.
              </p>
              <p className="text-lg text-text-secondary">
                Our approach combines pixel-perfect design with cutting-edge
                technology. We obsess over whitespace, typography, and color. We
                craft animations that guide attention and explain spatial
                relationships. We build systems that scale.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
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
              Our Values
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <Grid columns={2} gap="lg">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <CardContent>
                    <span className="text-4xl mb-4 block" aria-hidden="true">
                      {value.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team Section */}
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
              Meet the Team
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The people behind the pixel-perfect websites
            </motion.p>
          </div>

          <Grid columns={3} gap="lg">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="flat" padding="lg" className="h-full text-center">
                  <CardContent>
                    <div className="w-20 h-20 bg-background-tertiary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-text-secondary">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-accent mb-3">{member.role}</p>
                    <p className="text-text-secondary text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="md">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Work With Us
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              Ready to elevate your digital presence? We&apos;d love to hear about your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
