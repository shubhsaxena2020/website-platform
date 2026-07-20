'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Grid } from '../../components/layout/Grid';

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Office',
      content: '123 Design Street\nSan Francisco, CA 94102',
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'hello@websiteplatform.com',
    },
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
  ];

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
              Get in <span className="text-accent">Touch</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to create something exceptional? Let&apos;s start a conversation
              about your project.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section padding="md" background="secondary">
        <Container>
          <Grid columns={2} gap="lg">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="elevated" padding="lg">
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8" role="status" aria-live="polite">
                      <span className="text-5xl mb-4 block" aria-hidden="true">
                        ✅
                      </span>
                      <h2 className="text-2xl font-semibold text-text-primary mb-2">
                        Thank You!
                      </h2>
                      <p className="text-text-secondary">
                        We&apos;ve received your message and will get back to you
                        within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                      <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                      />
                      <Input
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        autoComplete="organization"
                      />
                      <Textarea
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        placeholder="Tell us about your project..."
                        required
                      />
                      {submitError && (
                        <p className="text-sm text-error" role="alert" aria-live="assertive">
                          {submitError}
                        </p>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {contactInfo.map((info) => (
                <Card key={info.title} variant="flat" padding="lg">
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl" aria-hidden="true">
                        {info.icon}
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold text-text-primary mb-1">
                          {info.title}
                        </h2>
                        <p className="text-text-secondary whitespace-pre-line">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map Placeholder */}
              <Card variant="flat" padding="none">
                <div className="aspect-video bg-background-tertiary flex items-center justify-center rounded-xl" role="img" aria-label="Map location placeholder">
                  <div className="text-center text-text-tertiary">
                    <svg
                      className="h-12 w-12 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <p className="text-sm">Map coming soon</p>
                  </div>
                </div>
              </Card>
            </motion.div>
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
              Prefer a Conversation?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              Our team typically responds within 24 hours. We&apos;re excited to learn about your project.
            </p>
            <a
              href="mailto:hello@websiteplatform.com"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Send Us an Email
            </a>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
