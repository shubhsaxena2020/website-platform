<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Platform - Agent Guidelines

## Project Overview

This is an Apple-tier website creation platform built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook 10

## Design Principles

1. **Whitespace is a Feature** - Generous padding and breathing room
2. **Typography is Architecture** - Strict type scale with weight contrast
3. **Color is Restrained** - Monochrome base with one accent color
4. **Motion is Meaningful** - Every animation explains spatial relationships
5. **Components are Systems** - Build for reuse, not one-off solutions
6. **Responsive is Assumed** - Mobile-first at every breakpoint
7. **Accessible is Non-negotiable** - WCAG 2.1 AA minimum

## Component Library

### UI Components (`src/components/ui/`)
- **Button**: primary, secondary, ghost variants; sm, md, lg sizes
- **Card**: elevated, flat, interactive variants
- **Input**: text and textarea with labels, errors, helper text

### Navigation Components (`src/components/navigation/`)
- **Navigation**: Responsive navbar with mobile hamburger menu
- **Footer**: Multi-column footer with links and copyright

### Layout Components (`src/components/layout/`)
- **Container**: Responsive max-width containers
- **Section**: Padding and background variants
- **Grid**: Responsive column layouts (1-4 columns)

## Design Tokens

Located in `src/styles/design-tokens.css`:
- Colors: monochrome palette with accent color
- Typography: Inter font family, strict type scale
- Spacing: consistent 4px base unit
- Shadows: subtle elevation system
- Transitions: smooth cubic-bezier curves

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run storybook  # Start Storybook
```

## File Structure

```
src/
├── app/                    # Next.js pages
├── components/
│   ├── ui/                # UI components
│   ├── navigation/        # Navigation components
│   └── layout/            # Layout components
├── styles/
│   └── design-tokens.css  # Design tokens
└── stories/               # Storybook stories
```

## Accessibility Requirements

- Use semantic HTML elements (nav, main, section, article)
- Add ARIA labels for interactive elements
- Ensure keyboard navigation works
- Support reduced motion preferences
- Maintain color contrast ratios

## Performance Targets

- Lighthouse score 95+ on all metrics
- Core Web Vitals passing
- Responsive at 320px, 768px, 1024px, 1440px, 1920px
