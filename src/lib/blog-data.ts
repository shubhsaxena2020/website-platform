export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'pixel-perfect-design-philosophy',
    title: 'The Philosophy Behind Pixel-Perfect Design',
    description:
      'Why every pixel matters in creating premium digital experiences and how our design philosophy drives exceptional results.',
    date: '2024-12-15',
    author: 'Alex Morgan',
    authorRole: 'Founder & Lead Designer',
    tags: ['Design', 'Philosophy', 'UX'],
    readingTime: '5 min read',
    content: `
## Why Every Pixel Matters

In the world of web design, details aren't just details — they're the difference between a good website and an extraordinary one. At Website Platform, we believe that pixel-perfect design isn't just about aesthetics; it's about creating experiences that feel intentional, premium, and effortless.

### The Apple Standard

When Steve Jobs famously obsessed over the curvature of corners and the spacing between icons, he wasn't being difficult — he was setting a standard. Apple taught us that great design is invisible. When everything is in its right place, users don't notice the design — they simply enjoy the experience.

### Whitespace as a Feature

One of the most misunderstood concepts in design is whitespace. It's not "empty" space — it's breathing room. Generous margins and padding create hierarchy, guide attention, and make content more digestible. Compare a cluttered flyer to a premium magazine layout — the difference is almost entirely whitespace.

### Typography as Architecture

Our type scale follows a strict modular ratio. Every heading size, every line height, every letter spacing value is mathematically related. This creates visual harmony that users feel even if they can't articulate why.

### The 4px Grid

Every measurement in our design system is based on a 4px grid. This ensures consistency across components and makes responsive design predictable. When spacing feels "right," it's usually because it follows a consistent mathematical pattern.

### Color Restraint

We use one accent color — Apple's signature blue (#007AFF) — against a monochrome palette. This restraint creates focus. When everything screams for attention, nothing gets it. But when one color stands out, it carries real weight.

### Conclusion

Pixel-perfect design isn't perfectionism — it's respect for the user. Every intentional choice communicates that their experience matters to us. And that's what separates industry-level websites from the ordinary.
    `,
  },
  {
    slug: 'core-web-vitals-performance-guide',
    title: 'Achieving 95+ Lighthouse Scores: Our Performance Guide',
    description:
      'Technical deep-dive into how we optimize websites for Core Web Vitals and achieve consistently high Lighthouse scores.',
    date: '2024-12-10',
    author: 'Jordan Lee',
    authorRole: 'Head of Engineering',
    tags: ['Performance', 'Technical', 'Next.js'],
    readingTime: '8 min read',
    content: `
## The Performance Imperative

Google's Core Web Vitals aren't just metrics — they're用户体验 indicators that directly impact rankings, conversions, and user satisfaction. Our goal isn't just to pass; it's to achieve consistently high scores across all metrics.

### Largest Contentful Paint (LCP)

LCP measures how quickly the main content of a page loads. Our approach:

1. **Server-Side Rendering**: We render pages on the server so users see content immediately
2. **Image Optimization**: Next.js Image component with automatic format conversion (WebP/AVIF)
3. **Font Loading**: We use \`font-display: swap\` and preload critical fonts
4. **Resource Hints**: Preload, prefetch, and preconnect for critical resources

### Interaction to Next Paint (INP)

INP measures responsiveness. Our strategies:

1. **Code Splitting**: Each page only loads the JavaScript it needs
2. **Lazy Loading**: Components below the fold load on demand
3. **Debounced Interactions**: Event handlers are optimized to prevent jank
4. **Web Workers**: Heavy computations run off the main thread

### Cumulative Layout Shift (CLS)

CLS measures visual stability. We eliminate it through:

1. **Explicit Dimensions**: Every image and component has defined dimensions
2. **Font Loading**: Font swap prevents text reflow
3. **Dynamic Content**: Reserved space for async-loaded content
4. **Animation Guidelines**: Only animate transform and opacity (composite-only properties)

### Our Performance Budget

We maintain strict performance budgets:

- **JavaScript**: < 100KB gzipped per page
- **CSS**: < 20KB gzipped per page
- **Images**: Optimized to WebP, lazy-loaded below the fold
- **Fonts**: Maximum 2 font families, subset for Latin characters

### Conclusion

Performance isn't a feature — it's a requirement. Every millisecond of load time impacts conversion rates. Our commitment to 95+ Lighthouse scores means your website doesn't just look premium — it performs premium.
    `,
  },
  {
    slug: 'building-accessible-web-experiences',
    title: 'Building Accessible Web Experiences That Scale',
    description:
      'How we ensure WCAG 2.1 AA compliance while maintaining design excellence across every project.',
    date: '2024-12-05',
    author: 'Sam Chen',
    authorRole: 'Design Systems Lead',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design'],
    readingTime: '6 min read',
    content: `
## Accessibility Is Not Optional

Accessibility isn't a feature to add later — it's a fundamental requirement that shapes every design decision. At Website Platform, we build accessible experiences that work for everyone, not just as a compliance checkbox, but because it's the right thing to do.

### Semantic HTML First

The foundation of accessibility is semantic HTML. Using the right elements for the right purpose:

- \`<nav>\` for navigation
- \`<main>\` for primary content
- \`<article>\` for independent content pieces
- \`<button>\` for interactive elements
- \`<a>\` for navigation links

When you use semantic HTML, screen readers get a huge head start in understanding your page structure.

### Keyboard Navigation

Every interactive element must be keyboard accessible:

1. **Tab Order**: Logical, predictable tab order through the page
2. **Focus Indicators**: Visible focus rings on all interactive elements
3. **Skip Links**: Allow keyboard users to skip navigation
4. **Arrow Keys**: Used for navigation within widgets (like our testimonial carousel)

### Color Contrast

WCAG 2.1 AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Our design token system ensures every color combination meets these requirements automatically.

### Reduced Motion

We respect \`prefers-reduced-motion\` system preference. Users who have enabled reduced motion see minimal, functional animations instead of decorative ones. This is implemented at the CSS level with our global reset.

### Screen Reader Support

Our components include:

- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: Dynamic content updates announced to screen readers
- **Role Descriptions**: Complex widgets described with ARIA roles
- **Alt Text**: Meaningful descriptions for all images

### Testing Process

Every component is tested with:

1. Keyboard-only navigation
2. Screen readers (VoiceOver, NVDA)
3. Automated tools (axe-core, Lighthouse)
4. Manual accessibility audit

### Conclusion

Accessibility creates better experiences for everyone. Semantic HTML improves SEO. Keyboard navigation improves power-user workflows. Clear focus indicators help all users track their position. When we build for accessibility, we build for excellence.
    `,
  },
  {
    slug: 'component-driven-development',
    title: 'Component-Driven Development: Building for Scale',
    description:
      'Our approach to building reusable component systems that maintain consistency across 100+ websites.',
    date: '2024-11-28',
    author: 'Jordan Lee',
    authorRole: 'Head of Engineering',
    tags: ['Components', 'Systems', 'TypeScript'],
    readingTime: '7 min read',
    content: `
## The Component Philosophy

Building components isn't just about reusability — it's about creating a shared language between designers and developers. When everyone speaks the same component language, efficiency follows naturally.

### Design Tokens as Foundation

Every component in our system is built on design tokens. These CSS custom properties define:

- **Colors**: From gray-50 to gray-950, plus our accent palette
- **Typography**: Strict type scale with modular ratios
- **Spacing**: 4px base unit system
- **Shadows**: Elevation system from xs to xl
- **Transitions**: Consistent easing curves

When design tokens change, every component updates automatically. This is theming at its most powerful.

### Component Architecture

Our components follow a consistent pattern:

1. **Props Interface**: TypeScript interface defining all possible configurations
2. **Variant System**: Multiple visual variants from a single component
3. **Size Variants**: Consistent sizing across the system
4. **Accessibility Built-In**: ARIA attributes and keyboard behavior baked in
5. **Composition Pattern**: Small components combine into complex layouts

### The Three Pillars

**Button**: Primary, secondary, ghost variants with loading states, sizes, and full-width option. Used across every page.

**Card**: Elevated, flat, interactive variants with header, content, footer sections. The workhorse of content display.

**Input**: Text, textarea, select components with labels, errors, helper text, and validation states. Form building at scale.

### Storybook Integration

Every component has corresponding Storybook stories that:

- Show all variants and states
- Test accessibility with the a11y addon
- Document usage patterns
- Serve as a visual regression testing baseline

### Versioning and Breaking Changes

We follow semantic versioning for our component library:

- **Patch**: Bug fixes, style tweaks
- **Minor**: New variants, new props (backward compatible)
- **Major**: Breaking API changes (rare, with migration guides)

### Conclusion

A well-built component system isn't just a development tool — it's a business asset. It reduces design-to-development time, ensures consistency, and makes scaling to 100+ websites not just possible, but efficient.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
