# Website Platform

An Apple-tier website creation platform built with Next.js 16, TypeScript, and Tailwind CSS v4. This platform creates industry-level websites with pixel-perfect design, smooth animations, and accessibility compliance.

## Features

- **5 Complete Pages**: Homepage, About, Services, Contact, Blog
- **Responsive Design**: Mobile-first approach with breakpoints at 320px, 768px, 1024px, 1440px, 1920px
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA labels, keyboard navigation
- **Dark Mode**: Automatic support via `prefers-color-scheme`
- **Animations**: Smooth transitions using Framer Motion
- **SEO Optimized**: Dynamic sitemap, robots.txt, and per-page metadata
- **Rate Limiting**: Protection against API abuse
- **Error Handling**: Graceful error boundaries with retry capability
- **Health Monitoring**: API endpoint for health checks

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook 10

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run storybook  # Start Storybook (http://localhost:6006)
npm test           # Run tests with Vitest
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with hero, features, CTA
│   ├── loading.tsx        # Root loading state
│   ├── about/page.tsx     # About page with mission and values
│   ├── services/page.tsx  # Services page with cards and process
│   ├── contact/page.tsx   # Contact page with form
│   ├── blog/              # Blog pages
│   └── api/               # API routes
│       ├── contact/       # Contact form submission
│       ├── health/        # Health check endpoint
│       ├── newsletter/    # Newsletter subscription
│       └── web-vitals/    # Web Vitals reporting
├── components/
│   ├── ui/                # UI components (Button, Card, Input, ErrorBoundary)
│   ├── navigation/        # Navigation components
│   └── layout/            # Layout components
├── lib/
│   ├── rate-limit.ts      # Rate limiting utility
│   └── site-config.ts     # Multi-site configuration
└── styles/
    └── design-tokens.css  # Design token system
```

## Deployment

See [deployment-guide.md](deployment-guide.md) for detailed instructions on deploying to Vercel with CI/CD pipeline.

### Quick Deploy

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push to main

## Quality Metrics

| Metric | Status |
|--------|--------|
| Build | ✅ Passes cleanly |
| TypeScript | ✅ Zero errors (strict mode) |
| ESLint | ✅ 0 errors |
| Unit Tests | ✅ 71/71 passing |
| Accessibility | ✅ WCAG 2.1 AA compliant |
| Responsive | ✅ Mobile-first design |
| Dark Mode | ✅ Supported |
| Animations | ✅ Framer Motion |
| Rate Limiting | ✅ Applied to API routes |
| Error Handling | ✅ Error boundaries with retry |
| Health Checks | ✅ API endpoint available |
| CI/CD | ✅ GitHub Actions workflow |

## License

Private - All rights reserved.
