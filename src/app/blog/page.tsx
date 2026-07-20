'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '../../lib/blog-data';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* Hero */}
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
              The <span className="text-accent">Blog</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Insights on web design, performance, and building industry-level digital experiences.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Posts Grid */}
      <Section padding="md" background="secondary">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-background-elevated border border-border rounded-2xl p-6 sm:p-8 h-full transition-all duration-200 hover:shadow-lg hover:border-border-hover hover:-translate-y-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-text-secondary mb-6 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-text-tertiary">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-background-tertiary rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-text-secondary">
                            {post.author
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-text-secondary block">
                            {post.author}
                          </span>
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
