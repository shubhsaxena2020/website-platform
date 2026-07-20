# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Apple-tier website creation platform built with Next.js 16, TypeScript, and Tailwind CSS v4. The goal is to create industry-level websites with pixel-perfect design, smooth animations, and accessibility compliance.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook 10

## Development Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run storybook  # Start Storybook (http://localhost:6006)
npm test           # Run tests with Vitest
```

## Architecture

### Design Token System

Located in `src/styles/design-tokens.css`:
- **Colors**: Monochrome palette (gray-50 to gray-950) with one accent color (#007AFF)
- **Typography**: Inter font family with strict type scale (xs to 6xl)
- **Spacing**: Consistent 4px base unit (space-1 to space-32)
- **Shadows**: Subtle elevation system (xs to xl)
- **Transitions**: Smooth cubic-bezier curves (fast, normal, slow)

### Component Library

**UI Components** (`src/components/ui/`):
- `Button.tsx`: primary, secondary, ghost variants with loading states
- `Card.tsx`: elevated, flat, interactive variants with hover effects
- `Input.tsx`: text and textarea with labels, errors, helper text

**Navigation Components** (`src/components/navigation/`):
- `Navigation.tsx`: Responsive navbar with mobile hamburger menu
- `Footer.tsx`: Multi-column footer with links and copyright

**Layout Components** (`src/components/layout/`):
- `Container.tsx`: Responsive max-width containers (sm to 2xl)
- `Section.tsx`: Padding and background variants
- `Grid.tsx`: Responsive column layouts (1-4 columns)

### File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with hero, features, CTA
│   ├── about/page.tsx     # About page with mission and values
│   ├── services/page.tsx  # Services page with cards and process
│   └── contact/page.tsx   # Contact page with form
├── components/
│   ├── ui/                # UI components (Button, Card, Input)
│   ├── navigation/        # Navigation components
│   └── layout/            # Layout components
├── styles/
│   └── design-tokens.css  # Design token system
└── stories/               # Storybook stories for components
```

## Design Principles

1. **Whitespace is a Feature**: Use generous padding and breathing room
2. **Typography is Architecture**: Follow the strict type scale
3. **Color is Restrained**: Use monochrome base with one accent
4. **Motion is Meaningful**: Every animation explains spatial relationships
5. **Components are Systems**: Build for reuse, not one-off solutions
6. **Responsive is Assumed**: Mobile-first at every breakpoint
7. **Accessible is Non-negotiable**: WCAG 2.1 AA minimum

## Accessibility Requirements

- Use semantic HTML elements (nav, main, section, article)
- Add ARIA labels for interactive elements
- Ensure keyboard navigation works
- Support reduced motion preferences
- Maintain color contrast ratios (4.5:1 minimum)

## Performance Targets

- Lighthouse score 95+ on all metrics
- Core Web Vitals passing
- Responsive at 320px, 768px, 1024px, 1440px, 1920px

## Code Conventions

- Use TypeScript strict mode
- Follow ESLint configuration
- Use CSS custom properties for theming
- Support dark mode via `prefers-color-scheme`
- Use Framer Motion for animations
- Use `prefers-reduced-motion` for accessibility

## Testing

- Write unit tests with Vitest
- Write E2E tests with Playwright
- Test component stories in Storybook
- Verify accessibility with Storybook a11y addon

## Common Patterns

### Adding a New Component

1. Create component in appropriate directory
2. Add TypeScript props interface
3. Support variants and sizes
4. Add accessibility features
5. Create Storybook story
6. Export from index.ts

### Adding a New Page

1. Create page in `src/app/[page]/page.tsx`
2. Use layout components (Container, Section, Grid)
3. Add animations with Framer Motion
4. Follow design principles
5. Update navigation links

### Working with Design Tokens

- Use CSS custom properties (e.g., `var(--color-accent)`)
- Reference tokens in Tailwind classes
- Support dark mode with media queries
- Keep tokens in `src/styles/design-tokens.css`

## Important Notes

- This is Next.js 16 with breaking changes from earlier versions
- Read `node_modules/next/dist/docs/` before writing code
- Tailwind CSS v4 uses `@import "tailwindcss"` not `tailwind.config.js`
- ESLint 9 uses flat config format
- Use `'use client'` directive for client components
