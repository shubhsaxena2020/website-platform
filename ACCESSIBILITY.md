# Accessibility & Performance Standards

## Overview

This document outlines the accessibility and performance standards implemented in the Acme website platform, ensuring WCAG 2.1 AA compliance and 90+ Lighthouse scores across all metrics.

## Quick Commands

```bash
# Run accessibility tests
npm run test:a11y

# Run Lighthouse CI audit (requires dev server)
npm run lighthouse

# Individual Lighthouse commands
npm run lighthouse:collect   # Run Lighthouse audits
npm run lighthouse:assert    # Assert against thresholds
npm run lighthouse:upload    # Upload reports
```

## Accessibility Features

### WCAG 2.1 AA Compliance

The platform implements the following accessibility features:

#### 1. Semantic HTML
- All pages use proper heading hierarchy (h1 → h2 → h3)
- Landmark elements: `<nav>`, `<main>`, `<footer>`, `<article>`
- ARIA labels on all interactive elements

#### 2. Keyboard Navigation
- Skip to main content link (`Skip to main content`)
- All interactive elements are keyboard accessible
- Focus indicators visible on all focusable elements
- Tab order follows logical document flow

#### 3. Screen Reader Support
- ARIA labels on navigation, buttons, and links
- `aria-expanded` on collapsible menus
- `aria-controls` for interactive relationships
- `aria-live` regions for dynamic content updates
- `aria-hidden="true"` on decorative elements

#### 4. Color & Contrast
- Monochrome palette with sufficient contrast ratios (4.5:1 minimum)
- Focus indicators with high contrast
- Dark mode support via CSS custom properties

#### 5. Reduced Motion
- `prefers-reduced-motion` media query respected
- Framer Motion animations respect reduced motion preferences
- CSS transition durations reduced to 0.01ms when reduced motion is preferred

#### 6. Form Accessibility
- All form inputs have associated labels
- Error messages linked via `aria-describedby`
- `aria-invalid` on inputs with errors
- `role="alert"` for error announcements
- `autoComplete` attributes on form fields

#### 7. Image Alt Text
- All meaningful images have descriptive alt text
- Decorative images marked with `aria-hidden="true"`
- SVG icons wrapped with `aria-hidden="true"`

### Test Suite

**26 accessibility tests** across 5 test files:

| Test File | Tests | Coverage |
|-----------|-------|----------|
| Button.a11y.test.tsx | 6 | All button variants, loading, disabled states |
| Input.a11y.test.tsx | 9 | Input, Textarea, labels, errors, helper text |
| Navigation.a11y.test.tsx | 4 | Nav landmarks, mobile menu, aria attributes |
| Footer.a11y.test.tsx | 4 | Contentinfo, lists, social links |
| layout.a11y.test.tsx | 3 | Skip link, main landmark, axe audit |

Run tests: `npm run test:a11y`

## Performance Standards

### Lighthouse CI Configuration

Located in `lighthouserc.js`:

| Category | Target Score |
|----------|-------------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| FCP (First Contentful Paint) | ≤ 1.8s | ≤ 3.0s | > 3.0s |
| TTFB (Time to First Byte) | ≤ 800ms | ≤ 1800ms | > 1800ms |

### Core Web Vitals Monitoring

The platform includes a `WebVitals` component that:
- Tracks LCP, INP, CLS, FCP, and TTFB
- Sends metrics to `/api/web-vitals` endpoint
- Uses `sendBeacon` for non-blocking analytics
- Logs metrics in development mode
- Respects `prefers-reduced-motion` preferences

### Performance Optimizations

1. **Image Optimization**: Next.js automatic image optimization with WebP/AVIF
2. **Font Optimization**: `display: 'swap'` for web fonts
3. **Code Splitting**: Dynamic imports for heavy components
4. **Caching**: Immutable cache headers for static assets
5. **Compression**: Text compression enabled by default
6. **Security Headers**: XSS protection, CORS, CSP headers

## CI/CD Integration

### GitHub Actions Workflow

The CI pipeline includes:

1. **Lint & Type Check**: ESLint + TypeScript
2. **Tests**: Vitest (Storybook) + Accessibility tests
3. **Lighthouse Audit**: Automated Lighthouse CI with threshold assertions
4. **Deploy**: Vercel preview (PR) and production (main)

### Lighthouse Reports

Reports are uploaded as artifacts and retained for 30 days. Access them in the GitHub Actions workflow under "Lighthouse Audit" → "Download Lighthouse Reports".

## Component Accessibility Checklist

When adding new components, ensure:

- [ ] Semantic HTML elements used
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Reduced motion respected
- [ ] Screen reader tested
- [ ] Accessibility test added (`*.a11y.test.tsx`)

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Core Web Vitals](https://web.dev/vitals/)
