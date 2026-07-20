'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Grid } from '../components/layout/Grid';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import { useSiteConfig } from '../components/providers';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const testimonials = [
  {
    quote: 'The attention to detail is remarkable. Every pixel feels intentional. Our new website has received countless compliments from clients.',
    author: 'Sarah Chen',
    role: 'CEO, TechStart',
  },
  {
    quote: 'Our conversion rate increased 40% after the redesign. The ROI speaks for itself. The team truly understood our vision.',
    author: 'Michael Rodriguez',
    role: 'Marketing Director, GrowthCo',
  },
  {
    quote: 'Finally, a website that matches the quality of our product. Exceptional work from start to finish.',
    author: 'Emily Watson',
    role: 'Founder, DesignLab',
  },
  {
    quote: 'The performance improvements were dramatic. Our pages load instantly now, and our SEO rankings have improved significantly.',
    author: 'David Park',
    role: 'CTO, SpeedStack',
  },
];

/** Map icon names from site.json to emoji glyphs */
const iconMap: Record<string, string> = {
  palette: '🎨',
  zap: '⚡',
  users: '♿',
  mobile: '📱',
  code: '🔧',
  rocket: '🚀',
};

export default function Home() {
  const config = useSiteConfig();
  const { hero, features } = config.content;
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(heroY, springConfig);
  const smoothScale = useSpring(heroScale, springConfig);

  // Parallax for secondary orb (extracted from inline JSX to satisfy Rules of Hooks)
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const featureIcons = features.map((f) => ({
    icon: iconMap[f.icon] ?? '✨',
    title: f.title,
    description: f.description,
  }));

  return (
    <>
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />

        {/* Floating accent orbs with parallax */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          style={{ y: smoothY }}
          animate={{
            x: [0, 30, -20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl"
          style={{ y: orbY }}
          animate={{
            x: [0, -20, 30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />

        <motion.div
          className="relative mx-auto max-w-[var(--container-xl)] px-4 sm:px-6 lg:px-8 py-32 lg:py-40"
          style={{ opacity: heroOpacity, scale: smoothScale }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with micro-interaction */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent bg-accent-light rounded-full mb-8 border border-accent/10 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                {hero.badge}
              </motion.span>
            </motion.div>

            {/* Headline with character animation */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {hero.title}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {hero.subtitle}
            </motion.p>

            {/* CTA Buttons with enhanced hover effects */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 overflow-hidden"
                >
                  <span className="relative z-10">{hero.cta.primary}</span>
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-transparent text-text-primary border border-border hover:bg-background-secondary hover:border-border-hover active:bg-background-tertiary transition-all duration-200"
                >
                  {hero.cta.secondary}
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators with stagger animation */}
            <motion.div
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {['WCAG 2.1 AA', '95+ Lighthouse', 'Mobile First'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-text-tertiary rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-text-tertiary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <Section padding="md" background="secondary">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Built for Excellence
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Every feature is designed to deliver industry-level quality
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Grid columns={3} gap="lg">
              {featureIcons.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card variant="elevated" padding="lg" className="h-full group cursor-default">
                    <CardContent>
                      <motion.span
                        className="text-4xl mb-4 block"
                        aria-hidden="true"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {feature.icon}
                      </motion.span>
                      <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Section with Enhanced Animations */}
      <Section padding="md">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Trusted by Leaders
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              See what our clients say about working with us
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TestimonialsCarousel testimonials={testimonials} autoPlay interval={6000} />
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section with Enhanced Animations */}
      <Section padding="md" background="secondary">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to Build Something Exceptional?
            </motion.h2>
            <motion.p
              className="text-lg text-text-secondary mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let&apos;s create an industry-level website that elevates your brand
              and drives results.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
