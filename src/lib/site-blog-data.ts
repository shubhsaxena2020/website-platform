/**
 * Site-specific blog data loader.
 *
 * Blog posts live in `sites/{SITE_ID}/blog/` as `.json` files.
 * If a site directory has no blog folder we fall back to the global
 * `blog-data.ts` posts so the blog page always has content.
 */

import type { BlogPost } from './blog-data';
import { blogPosts as fallbackPosts } from './blog-data';
import fs from 'fs';
import path from 'path';

/**
 * Attempt to load site-specific blog posts from the sites directory.
 * Returns the fallback posts when the directory doesn't exist or is empty.
 */
export function loadBlogPosts(siteId: string): BlogPost[] {
  try {
    const blogDir = path.join(process.cwd(), 'sites', siteId, 'blog');

    // Check if the blog directory exists
    if (!fs.existsSync(blogDir)) {
      return fallbackPosts;
    }

    const files = fs.readdirSync(blogDir).filter((f: string) => f.endsWith('.json'));

    if (files.length === 0) {
      return fallbackPosts;
    }

    const posts: BlogPost[] = files.map((file: string) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      return JSON.parse(raw) as BlogPost;
    });

    // Sort by date descending
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return posts;
  } catch {
    // No site-specific blog – use fallback
    return fallbackPosts;
  }
}

/**
 * Get a single blog post by slug for a given site.
 */
export function getBlogPostBySlug(
  siteId: string,
  slug: string
): BlogPost | undefined {
  const posts = loadBlogPosts(siteId);
  return posts.find((p) => p.slug === slug);
}

/**
 * Get all slugs for static path generation.
 */
export function getAllBlogSlugs(siteId: string): string[] {
  const posts = loadBlogPosts(siteId);
  return posts.map((p) => p.slug);
}
