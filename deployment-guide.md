# Deployment Guide

This guide covers setting up Vercel deployment, CI/CD pipeline, custom domains, and monitoring for the Website Platform.

---

## Table of Contents

1. [Initial Vercel Setup](#1-initial-vercel-setup)
2. [GitHub Repository Setup](#2-github-repository-setup)
3. [Environment Variables](#3-environment-variables)
4. [CI/CD Pipeline](#4-cicd-pipeline)
5. [Preview Deployments](#5-preview-deployments)
6. [Production Deployment](#6-production-deployment)
7. [Custom Domain Configuration](#7-custom-domain-configuration)
8. [Monitoring & Alerting](#8-monitoring--alerting)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Initial Vercel Setup

### Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Install the Vercel CLI:
   ```bash
   npm install --global vercel@latest
   ```
3. Log in to Vercel:
   ```bash
   vercel login
   ```

### Link Your Project

```bash
cd website-platform
vercel link
```

Follow the prompts:
- Select your team/organization
- Choose to create a new project or link to existing
- Confirm the project settings

This creates a `.vercel/` directory (gitignored) with project configuration.

### Get Your Vercel IDs

```bash
# Get Org ID
cat .vercel/project.json | grep orgId

# Get Project ID
cat .vercel/project.json | grep projectId
```

---

## 2. GitHub Repository Setup

### Create a GitHub Repository

1. Create a new repository on GitHub
2. Initialize and push your code:
   ```bash
   cd website-platform
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-ORG/website-platform.git
   git push -u origin main
   ```

### Configure GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |
| `VERCEL_TOKEN` | Vercel access token (create at vercel.com/account/tokens) |

### Create Vercel Access Token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create"
3. Give it a name (e.g., "GitHub Actions CI/CD")
4. Copy the token and add it to GitHub Secrets

---

## 3. Environment Variables

### Local Development

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Vercel Dashboard

Set environment variables in the Vercel dashboard:

1. Go to your project → **Settings → Environment Variables**
2. Add variables for each environment:

| Variable | Preview | Production | Description |
|----------|---------|------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://preview-xxx.vercel.app` | `https://yourdomain.com` | Site URL |
| `NEXT_PUBLIC_SITE_NAME` | "Website Platform" | "Website Platform" | Site name |

### GitHub Actions Environment

For environment-specific secrets in production deployments:

1. Go to **Settings → Environments**
2. Create a `production` environment
3. Add environment-specific secrets

---

## 4. CI/CD Pipeline

The pipeline runs on every push and PR to `main`:

### Pipeline Jobs

```
┌─────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │  Lint   │  │  Test   │  │  Build  │  ← Parallel│
│  │& Type   │  │ (Vitest)│  │ (Next)  │             │
│  │ Check   │  │         │  │         │             │
│  └────┬────┘  └────┬────┘  └────┬────┘            │
│       │            │            │                   │
│       └────────────┼────────────┘                   │
│                    ▼                                │
│  ┌─────────────────────────────────────────────┐   │
│  │         Vercel Deployment                   │   │
│  │  PR → Preview URL    Main → Production URL  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### What Each Job Does

| Job | Trigger | Description |
|-----|---------|-------------|
| **Lint & Type Check** | All pushes/PRs | ESLint + TypeScript type checking |
| **Test** | All pushes/PRs | Vitest unit/component tests |
| **Build** | All pushes/PRs | Next.js production build |
| **Deploy Preview** | PRs only | Vercel preview deployment + PR comment |
| **Deploy Production** | Push to main | Vercel production deployment |

---

## 5. Preview Deployments

### How It Works

1. Push a commit to a PR branch
2. CI pipeline runs lint, test, and build checks
3. If checks pass, Vercel deploys a preview
4. A comment is posted to the PR with the preview URL

### Preview URL Format

```
https://website-platform-git-{branch-name}-{org}.vercel.app
```

### Updating Previews

Each new push to the PR branch automatically updates the preview deployment.

---

## 6. Production Deployment

### How It Works

1. Merge PR to `main` (or push directly)
2. CI pipeline runs all checks
3. Vercel deploys to production automatically

### Manual Production Deploy

```bash
vercel --prod
```

### Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

---

## 7. Custom Domain Configuration

### Step 1: Add Domain in Vercel

1. Go to your Vercel project → **Settings → Domains**
2. Enter your custom domain (e.g., `yourdomain.com`)
3. Click "Add"

### Step 2: Configure DNS

Choose one of these options:

#### Option A: Vercel Nameservers (Recommended)

1. In Vercel, select "Use Vercel Nameservers"
2. Update your domain registrar to use Vercel's nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. Wait for DNS propagation (up to 48 hours)

#### Option B: External Nameservers

Add these DNS records at your registrar:

**For Apex Domain (`yourdomain.com`):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For Subdomain (`www.yourdomain.com`):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify Domain

1. In Vercel, go to **Settings → Domains**
2. Click "Verify" next to your domain
3. Wait for SSL certificate provisioning (automatic)

### Step 4: Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` in Vercel to match your domain.

### Step 5: Configure Redirects (Optional)

Add redirects in `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

---

## 8. Monitoring & Alerting

### Vercel Analytics

1. Enable Vercel Analytics in your project dashboard
2. Track Core Web Vitals:
   - **LCP** (Largest Contentful Paint) - Target: < 2.5s
   - **FID** (First Input Delay) - Target: < 100ms
   - **CLS** (Cumulative Layout Shift) - Target: < 0.1

### Vercel Speed Insights

Add to your app:
```bash
npm install @vercel/speed-insights
```

```tsx
// src/app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Error Monitoring (Optional)

#### Sentry Setup

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Configure DSN

Add to `.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx
```

### Uptime Monitoring

Set up uptime monitoring with one of these services:
- **UptimeRobot** (free tier available)
- **Better Stack** (formerly Uptime)
- **Checkly** (for API monitoring)

### Custom Alerts

Configure alerts in Vercel:
1. Go to **Settings → Monitoring**
2. Set up alerts for:
   - Build failures
   - Deployment errors
   - Function errors

---

## 9. Troubleshooting

### Build Failures

```bash
# Check build locally
npm run build

# Common issues:
# 1. TypeScript errors → Fix type issues
# 2. ESLint errors → Run npm run lint and fix
# 3. Missing dependencies → Run npm ci
```

### Deployment Issues

```bash
# Check deployment logs
vercel logs

# Check function logs
vercel logs --follow
```

### Environment Variable Issues

```bash
# Verify env vars are set
vercel env ls

# Pull env vars locally
vercel env pull .env.local
```

### Domain Issues

```bash
# Check DNS resolution
dig yourdomain.com

# Verify SSL certificate
curl -vI https://yourdomain.com 2>&1 | grep -E '(SSL|certificate)'
```

### Performance Issues

```bash
# Run Lighthouse audit
npx lighthouse https://yourdomain.com --output=html

# Check bundle size
npx next build && cat .next/trace
```

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter
npm run test             # Run tests

# Vercel
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel logs              # View deployment logs
vercel env ls            # List environment variables
vercel rollback          # Rollback to previous deployment

# Git
git push origin main     # Trigger production deployment
```

### Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel project configuration |
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `.env.example` | Environment variable template |
| `next.config.ts` | Next.js configuration |

---

## Support

For issues with:
- **Vercel**: Check [Vercel Docs](https://vercel.com/docs) or [Vercel Support](https://vercel.com/support)
- **GitHub Actions**: Check [GitHub Actions Docs](https://docs.github.com/en/actions)
- **Next.js**: Check [Next.js Docs](https://nextjs.org/docs)
