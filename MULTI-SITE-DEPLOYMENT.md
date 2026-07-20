# Multi-Site Deployment Guide

This guide explains how to deploy multiple websites from a single codebase using the website platform's multi-site deployment system.

## Overview

The multi-site deployment system allows you to:

- Deploy multiple websites from a single codebase
- Each site has its own configuration, theme, and content
- Sites can be deployed independently or together
- Each site gets its own Vercel project and domain

## Architecture

```
website-platform/
├── sites/
│   ├── demo/                    # Demo site
│   │   ├── site.json           # Site configuration
│   │   ├── .env                # Site-specific environment variables
│   │   └── assets/             # Site-specific assets (logo, favicon, etc.)
│   ├── acme/                   # Acme Corp site
│   │   ├── site.json
│   │   └── .env
│   └── techcorp/               # TechCorp site
│       ├── site.json
│       └── .env
├── src/
│   └── lib/
│       └── site-config.ts      # Site configuration loader
├── .github/workflows/
│   └── ci.yml                  # Multi-site CI/CD pipeline
└── scripts/
    └── site-manager.sh         # Site management CLI
```

## Getting Started

### 1. Create a New Site

```bash
# Create a new site with default configuration
./scripts/site-manager.sh create mysite
```

This creates:
- `sites/mysite/site.json` - Site configuration
- `sites/mysite/.env` - Environment variables

### 2. Configure the Site

Edit `sites/mysite/site.json` to customize:

```json
{
  "id": "mysite",
  "name": "My Awesome Site",
  "domain": "mysite.com",
  "theme": {
    "colors": {
      "primary": "#007AFF",
      "secondary": "#5856D6",
      "accent": "#FF2D55"
    }
  },
  "content": {
    "hero": {
      "title": "Welcome to My Site",
      "subtitle": "Building the future of web development"
    }
  }
}
```

### 3. Configure Vercel Project

For each site, you need to create a separate Vercel project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the root directory to the project root (not a subdirectory)
5. Add environment variables from `sites/mysite/.env`

### 4. Configure GitHub Secrets

Add the following secrets for each site in your GitHub repository:

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets for each site:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID_DEMO=demo-project-id
VERCEL_PROJECT_ID_ACME=acme-project-id
VERCEL_PROJECT_ID_TECHCORP=techcorp-project-id
```

### 5. Deploy

Push to main to deploy all sites:

```bash
git add .
git commit -m "Add new site: mysite"
git push origin main
```

## Site Configuration Reference

### site.json Structure

```json
{
  "id": "string",                    // Unique site identifier
  "name": "string",                  // Display name
  "description": "string",          // Site description
  "domain": "string",               // Primary domain
  "url": "string",                  // Full URL with protocol

  "brand": {
    "logo": "string",               // Path to logo
    "favicon": "string",            // Path to favicon
    "ogImage": "string"             // Path to Open Graph image
  },

  "theme": {
    "colors": {
      "primary": "string",          // Primary brand color
      "secondary": "string",        // Secondary color
      "accent": "string",           // Accent color
      "background": "string",       // Background color
      "surface": "string",          // Surface/card color
      "text": "string",             // Primary text color
      "textSecondary": "string"     // Secondary text color
    },
    "darkColors": { ... },          // Dark mode colors
    "fonts": {
      "heading": "string",          // Heading font family
      "body": "string"              // Body font family
    }
  },

  "content": {
    "title": "string",
    "tagline": "string",
    "description": "string",
    "company": {
      "name": "string",
      "description": "string"
    },
    "hero": {
      "badge": "string",
      "title": "string",
      "subtitle": "string",
      "cta": {
        "primary": "string",
        "secondary": "string"
      }
    },
    "features": [
      {
        "title": "string",
        "description": "string",
        "icon": "string"
      }
    ],
    "navigation": [
      { "label": "string", "href": "string" }
    ],
    "footer": {
      "copyright": "string",
      "links": [
        { "label": "string", "href": "string" }
      ]
    }
  },

  "seo": {
    "titleTemplate": "string",      // e.g., "%s | My Site"
    "defaultTitle": "string",
    "description": "string",
    "keywords": ["string"],
    "ogType": "string"
  },

  "analytics": {
    "googleAnalytics": "string",
    "vercelAnalytics": boolean,
    "sentryDsn": "string"
  },

  "features": {
    "darkMode": boolean,
    "blog": boolean,
    "contactForm": boolean,
    "newsletter": boolean,
    "testimonials": boolean
  }
}
```

### Environment Variables

Each site has its own `.env` file with:

```bash
# Required
SITE_ID=mysite
SITE_NAME=My Site
SITE_DOMAIN=mysite.com
NEXT_PUBLIC_SITE_URL=https://mysite.com
NEXT_PUBLIC_SITE_ID=mysite

# Optional - Theme Overrides
SITE_PRIMARY_COLOR=#007AFF
SITE_SECONDARY_COLOR=#5856D6
SITE_ACCENT_COLOR=#FF2D55

# Optional - Content Overrides
SITE_TAGLINE=Your custom tagline
SITE_COMPANY_NAME=Your Company Name

# Optional - SEO Overrides
SITE_SEO_TITLE=Your Custom Title
SITE_SEO_DESCRIPTION=Your custom description

# Optional - Analytics
GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://...
```

## Site Manager CLI

The site manager script provides commands to manage sites:

```bash
# List all configured sites
./scripts/site-manager.sh list

# Create a new site
./scripts/site-manager.sh create mysite

# Validate a site configuration
./scripts/site-manager.sh validate mysite

# Build a specific site
./scripts/site-manager.sh build mysite

# Deploy a specific site
./scripts/site-manager.sh deploy mysite

# Remove a site
./scripts/site-manager.sh remove mysite

# Detect sites (used by CI/CD pipeline)
./scripts/detect-sites.sh --list    # Human-readable output
./scripts/detect-sites.sh           # JSON output for CI
```

## Deployment Workflows

### Automatic Deployment (CI/CD)

The CI/CD pipeline automatically discovers and deploys all sites when you push to main:

1. **Detect Sites** - Scans `sites/` directory for configured sites
2. **Lint & Type Check** - Validates code quality
3. **Tests** - Runs unit and integration tests
4. **Build & Deploy** - Builds and deploys each site in parallel
5. **Deployment Summary** - Reports deployment status

> **Dynamic Site Discovery:** The pipeline automatically finds all sites with valid `site.json` files in the `sites/` directory. No manual CI configuration changes needed when adding new sites!

### Manual Deployment

To deploy a single site manually:

```bash
# Build and deploy a specific site
./scripts/site-manager.sh deploy mysite
```

### Preview Deployments

Pull requests automatically get preview deployments for all configured sites. Each site gets its own preview URL with a comment posted to the PR.

## Domain Configuration

### Adding a Custom Domain

1. **Add domain to Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **Configure DNS:**
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records pointing to Vercel's IP addresses

3. **Update site configuration:**
   - Update `domain` and `url` in `site.json`
   - Update `SITE_DOMAIN` and `NEXT_PUBLIC_SITE_URL` in `.env`

### SSL Certificates

Vercel automatically provisions SSL certificates for all custom domains. No manual configuration is required.

## Monitoring & Analytics

### Vercel Analytics

Each site can have its own Vercel Analytics configuration:

1. Enable Vercel Analytics in project settings
2. Set `vercelAnalytics: true` in `site.json`
3. View analytics in the Vercel dashboard for each project

### Google Analytics

To add Google Analytics to a site:

1. Create a GA4 property for the site
2. Add the measurement ID to `site.json`:
   ```json
   "analytics": {
     "googleAnalytics": "G-XXXXXXXXXX"
   }
   ```
3. Add the GA_ID to the site's `.env` file

### Error Monitoring

To add Sentry error monitoring:

1. Create a Sentry project for the site
2. Add the DSN to `site.json`:
   ```json
   "analytics": {
     "sentryDsn": "https://..."
   }
   ```
3. Add the SENTRY_DSN to the site's `.env` file

## Troubleshooting

### Build Failures

**Problem:** Build fails with "Site not found"

**Solution:** Ensure the `SITE_ID` environment variable matches a directory in `sites/`

```bash
# Check available sites
./scripts/site-manager.sh list

# Validate site configuration
./scripts/site-manager.sh validate mysite
```

### Deployment Failures

**Problem:** Deployment fails with "Project not found"

**Solution:** Ensure Vercel project ID is correctly configured in GitHub secrets

```bash
# Check GitHub secrets
gh secret list
```

### Domain Issues

**Problem:** Custom domain not working

**Solution:** Verify DNS configuration and SSL certificate status

1. Check DNS propagation: `dig mysite.com`
2. Check SSL status in Vercel dashboard
3. Ensure domain is verified in Vercel project settings

## Best Practices

### Site Configuration

1. **Use descriptive IDs** - Choose site IDs that are easy to remember and type
2. **Keep configurations in sync** - Use the same structure for all sites
3. **Test configurations** - Always validate before deploying

### Deployment

1. **Deploy one site at a time** - When making site-specific changes, deploy only that site
2. **Use preview deployments** - Test changes in preview before production
3. **Monitor deployments** - Check the deployment summary after each push

### Performance

1. **Optimize images** - Use Next.js Image component for all images
2. **Enable caching** - Configure appropriate cache headers
3. **Monitor Core Web Vitals** - Use Vercel Analytics to track performance

### Security

1. **Keep secrets secure** - Never commit `.env` files to git
2. **Use environment variables** - Store sensitive data in Vercel environment variables
3. **Enable security headers** - The platform includes security headers by default

## Advanced Configuration

### Custom Build Scripts

To add custom build scripts for a site:

1. Create a `scripts/` directory in the site folder
2. Add build scripts that run before the main build
3. Update the CI/CD pipeline to run site-specific scripts

### Shared Resources

To share resources between sites:

1. Create a `shared/` directory at the project root
2. Import shared components and utilities
3. Use site-specific configuration to customize shared resources

### Multiple Environments

To deploy to multiple environments (staging, production):

1. Create separate Vercel projects for each environment
2. Configure environment-specific secrets
3. Update the CI/CD pipeline to deploy to different environments

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the site configuration documentation
3. Run the validation script: `./scripts/site-manager.sh validate <site-id>`
4. Check the deployment logs in GitHub Actions

## Next Steps

1. Create your first site: `./scripts/site-manager.sh create mysite`
2. Configure the site in `sites/mysite/site.json`
3. Set up Vercel project and GitHub secrets
4. Push to main to deploy
5. Add custom domain and analytics
6. Monitor performance and iterate

---

*Last updated: 2026-07-20*
