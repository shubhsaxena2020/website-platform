import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs } from '../../../lib/blog-data';
import { Container } from '../../../components/layout/Container';
import { Section } from '../../../components/layout/Section';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function renderMarkdown(content: string): string {
  // Simple markdown-to-HTML conversion for blog content
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-text-primary mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-text-primary mt-10 mb-5">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 text-sm bg-background-tertiary text-accent rounded font-mono">$1</code>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-text-secondary"><span class="text-accent mt-1.5">•</span><span>$1</span></li>')
    // Ordered lists
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-3 text-text-secondary"><span class="font-semibold text-accent min-w-[1.5rem]">$1.</span><span>$2</span></li>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mb-4">')
    // Single newlines to spaces
    .replace(/\n/g, ' ');

  // Wrap lists
  html = html.replace(
    /(<li class="flex[^"]*">[\s\S]*?<\/li>\s*)+/g,
    (match) => `<ul class="space-y-2 my-4">${match}</ul>`
  );

  return `<p class="text-text-secondary leading-relaxed mb-4">${html}</p>`;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdown(post.content);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Website Platform',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section padding="lg" className="pt-32 lg:pt-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>

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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-6">
              {post.title}
            </h1>

            {/* Author & Date */}
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-text-secondary">
                    {post.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-text-primary block">
                    {post.author}
                  </span>
                  <span>{post.authorRole}</span>
                </div>
              </div>
              <span className="text-text-tertiary">·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span className="text-text-tertiary">·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section padding="md">
        <Container size="sm">
          <article
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </Container>
      </Section>

      {/* CTA */}
      <Section padding="md" background="secondary">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-text-secondary mb-6">
              Let&apos;s discuss how we can create an exceptional website for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Get in Touch
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
