#!/bin/bash

# ============================================================================
# Site Manager CLI
# ============================================================================
#
# This script manages multi-site deployments for the website platform.
# It provides commands to add, remove, list, and configure sites.
#
# Usage:
#   ./scripts/site-manager.sh <command> [options]
#
# Commands:
#   list                  List all configured sites
#   create <site-id>      Create a new site with default configuration
#   remove <site-id>      Remove a site configuration
#   configure <site-id>   Interactive configuration for a site
#   validate <site-id>    Validate a site configuration
#   build <site-id>       Build a specific site
#   deploy <site-id>      Deploy a specific site to Vercel
#
# ============================================================================

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ============================================================================
# Helper Functions
# ============================================================================

print_header() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# ============================================================================
# Commands
# ============================================================================

cmd_list() {
    print_header "📋 Configured Sites"

    local sites_dir="sites"
    local count=0

    if [ ! -d "$sites_dir" ]; then
        print_warning "No sites directory found. Run 'create' to add your first site."
        return 1
    fi

    echo "ID          | Name                    | Domain"
    echo "------------|-------------------------|------------------"

    for site_dir in "$sites_dir"/*/; do
        if [ -f "${site_dir}site.json" ]; then
            local site_id=$(basename "$site_dir")
            local name=$(node -e "console.log(require('./${site_dir}site.json').name)" 2>/dev/null || echo "Unknown")
            local domain=$(node -e "console.log(require('./${site_dir}site.json').domain)" 2>/dev/null || echo "Unknown")

            echo -e "${site_id}          | ${name}                    | ${domain}"
            count=$((count + 1))
        fi
    done

    echo ""
    print_info "Total sites: $count"
}

cmd_create() {
    local site_id=$1

    if [ -z "$site_id" ]; then
        print_error "Usage: $0 create <site-id>"
        return 1
    fi

    local site_dir="sites/$site_id"

    if [ -d "$site_dir" ]; then
        print_error "Site '$site_id' already exists."
        return 1
    fi

    print_header "🆕 Creating Site: $site_id"

    # Create site directory
    mkdir -p "$site_dir"

    # Generate default configuration
    cat > "$site_dir/site.json" << EOF
{
  "id": "$site_id",
  "name": "$(echo "$site_id" | sed 's/^./\U&/')",
  "description": "A website built with the website creation platform",
  "domain": "$site_id.example.com",
  "url": "https://$site_id.example.com",

  "brand": {
    "logo": "/sites/$site_id/logo.svg",
    "favicon": "/sites/$site_id/favicon.ico",
    "ogImage": "/sites/$site_id/og-image.png"
  },

  "theme": {
    "colors": {
      "primary": "#007AFF",
      "secondary": "#5856D6",
      "accent": "#FF2D55",
      "background": "#FFFFFF",
      "surface": "#F2F2F7",
      "text": "#1C1C1E",
      "textSecondary": "#8E8E93"
    },
    "darkColors": {
      "primary": "#0A84FF",
      "secondary": "#5E5CE6",
      "accent": "#FF375F",
      "background": "#1C1C1E",
      "surface": "#2C2C2E",
      "text": "#FFFFFF",
      "textSecondary": "#8E8E93"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    }
  },

  "content": {
    "title": "$(echo "$site_id" | sed 's/^./\U&/')",
    "tagline": "Built with the website creation platform",
    "description": "A website built with the website creation platform",
    "company": {
      "name": "$(echo "$site_id" | sed 's/^./\U&/') Corp",
      "description": "Building the future of web development"
    },
    "hero": {
      "badge": "Welcome",
      "title": "Build Beautiful Websites",
      "subtitle": "Create industry-level websites with pixel-perfect design and smooth animations.",
      "cta": {
        "primary": "Get Started",
        "secondary": "Learn More"
      }
    },
    "features": [],
    "navigation": [
      { "label": "Home", "href": "/" },
      { "label": "About", "href": "/about" },
      { "label": "Services", "href": "/services" },
      { "label": "Contact", "href": "/contact" }
    ],
    "footer": {
      "copyright": "© 2026 $(echo "$site_id" | sed 's/^./\U&/') Corp. All rights reserved.",
      "links": [
        { "label": "Privacy", "href": "/privacy" },
        { "label": "Terms", "href": "/terms" }
      ]
    }
  },

  "seo": {
    "titleTemplate": "%s | $(echo "$site_id" | sed 's/^./\U&/')",
    "defaultTitle": "$(echo "$site_id" | sed 's/^./\U&/') - Built with the website creation platform",
    "description": "A website built with the website creation platform",
    "keywords": ["website", "design", "development"],
    "ogType": "website"
  },

  "analytics": {
    "googleAnalytics": "",
    "vercelAnalytics": true,
    "sentryDsn": ""
  },

  "features": {
    "darkMode": true,
    "blog": true,
    "contactForm": true,
    "newsletter": false,
    "testimonials": true
  }
}
EOF

    # Create .env file for the site
    cat > "$site_dir/.env" << EOF
# Site Configuration for $site_id
SITE_ID=$site_id
SITE_NAME=$(echo "$site_id" | sed 's/^./\U&/')
SITE_DOMAIN=$site_id.example.com
NEXT_PUBLIC_SITE_URL=https://$site_id.example.com
NEXT_PUBLIC_SITE_ID=$site_id

# Theme Overrides (optional)
# SITE_PRIMARY_COLOR=#007AFF
# SITE_SECONDARY_COLOR=#5856D6
# SITE_ACCENT_COLOR=#FF2D55

# Content Overrides (optional)
# SITE_TAGLINE=Your custom tagline
# SITE_COMPANY_NAME=Your Company Name

# SEO Overrides (optional)
# SITE_SEO_TITLE=Your Custom Title
# SITE_SEO_DESCRIPTION=Your custom description

# Analytics (optional)
# GA_ID=G-XXXXXXXXXX
# SENTRY_DSN=https://...
EOF

    print_success "Site '$site_id' created successfully!"
    print_info "Configuration: $site_dir/site.json"
    print_info "Environment: $site_dir/.env"
    echo ""
    print_info "Next steps:"
    echo "  1. Edit $site_dir/site.json to customize the site"
    echo "  2. Add assets (logo, favicon) to $site_dir/"
    echo "  3. Configure Vercel project for this site"
    echo "  4. Add GitHub secrets for deployment"
}

cmd_remove() {
    local site_id=$1

    if [ -z "$site_id" ]; then
        print_error "Usage: $0 remove <site-id>"
        return 1
    fi

    local site_dir="sites/$site_id"

    if [ ! -d "$site_dir" ]; then
        print_error "Site '$site_id' not found."
        return 1
    fi

    print_header "🗑️  Removing Site: $site_id"

    # Confirm deletion
    read -p "Are you sure you want to remove site '$site_id'? (y/N) " -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Deletion cancelled."
        return 0
    fi

    rm -rf "$site_dir"
    print_success "Site '$site_id' removed."
}

cmd_validate() {
    local site_id=$1

    if [ -z "$site_id" ]; then
        print_error "Usage: $0 validate <site-id>"
        return 1
    fi

    local site_dir="sites/$site_id"
    local config_file="$site_dir/site.json"

    print_header "🔍 Validating Site: $site_id"

    if [ ! -f "$config_file" ]; then
        print_error "Configuration file not found: $config_file"
        return 1
    fi

    # Validate JSON
    if ! node -e "JSON.parse(require('fs').readFileSync('$config_file', 'utf8'))" 2>/dev/null; then
        print_error "Invalid JSON in $config_file"
        return 1
    fi
    print_success "Valid JSON"

    # Check required fields
    local required_fields=("id" "name" "domain" "theme" "content")
    local missing=0

    for field in "${required_fields[@]}"; do
        if ! node -e "const c = require('./$config_file'); if (!c.$field) throw new Error('Missing $field');" 2>/dev/null; then
            print_error "Missing required field: $field"
            missing=$((missing + 1))
        fi
    done

    if [ $missing -eq 0 ]; then
        print_success "All required fields present"
    else
        print_error "$missing required field(s) missing"
        return 1
    fi

    # Check theme colors
    if ! node -e "const c = require('./$config_file'); if (!c.theme?.colors?.primary) throw new Error('Missing theme.colors.primary');" 2>/dev/null; then
        print_warning "Missing theme.colors.primary (will use default)"
    else
        print_success "Theme colors configured"
    fi

    # Check content
    if ! node -e "const c = require('./$config_file'); if (!c.content?.hero?.title) throw new Error('Missing content.hero.title');" 2>/dev/null; then
        print_warning "Missing content.hero.title (will use default)"
    else
        print_success "Content configured"
    fi

    print_success "Site '$site_id' validation passed!"
}

cmd_build() {
    local site_id=$1

    if [ -z "$site_id" ]; then
        print_error "Usage: $0 build <site-id>"
        return 1
    fi

    local site_dir="sites/$site_id"

    if [ ! -d "$site_dir" ]; then
        print_error "Site '$site_id' not found. Run 'create' first."
        return 1
    fi

    print_header "🏗️  Building Site: $site_id"

    # Load site-specific environment
    if [ -f "$site_dir/.env" ]; then
        set -a
        source "$site_dir/.env"
        set +a
    fi

    # Build the site
    SITE_ID=$site_id npm run build

    print_success "Site '$site_id' built successfully!"
}

cmd_deploy() {
    local site_id=$1

    if [ -z "$site_id" ]; then
        print_error "Usage: $0 deploy <site-id>"
        return 1
    fi

    local site_dir="sites/$site_id"

    if [ ! -d "$site_dir" ]; then
        print_error "Site '$site_id' not found. Run 'create' first."
        return 1
    fi

    print_header "🚀 Deploying Site: $site_id"

    # Check for Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI not found. Install with: npm install -g vercel"
        return 1
    fi

    # Load site-specific environment
    if [ -f "$site_dir/.env" ]; then
        set -a
        source "$site_dir/.env"
        set +a
    fi

    # Build and deploy
    print_info "Building site..."
    SITE_ID=$site_id npm run build

    print_info "Deploying to Vercel..."
    vercel deploy --prebuilt --prod

    print_success "Site '$site_id' deployed successfully!"
}

cmd_help() {
    print_header "📖 Site Manager CLI"

    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  list                  List all configured sites"
    echo "  create <site-id>      Create a new site with default configuration"
    echo "  remove <site-id>      Remove a site configuration"
    echo "  validate <site-id>    Validate a site configuration"
    echo "  build <site-id>       Build a specific site"
    echo "  deploy <site-id>      Deploy a specific site to Vercel"
    echo "  help                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 list                           # List all sites"
    echo "  $0 create mysite                   # Create a new site called 'mysite'"
    echo "  $0 validate mysite                 # Validate 'mysite' configuration"
    echo "  $0 build mysite                    # Build 'mysite' for production"
    echo "  $0 deploy mysite                   # Deploy 'mysite' to Vercel"
    echo ""
    echo "Multi-Site Workflow:"
    echo "  1. Create sites with: $0 create <site-id>"
    echo "  2. Configure each site in sites/<site-id>/site.json"
    echo "  3. Add Vercel projects for each site"
    echo "  4. Configure GitHub secrets for deployment"
    echo "  5. Push to main to deploy all sites"
}

# ============================================================================
# Main Script
# ============================================================================

main() {
    local command=$1
    shift || true

    case "$command" in
        list)
            cmd_list
            ;;
        create)
            cmd_create "$@"
            ;;
        remove)
            cmd_remove "$@"
            ;;
        validate)
            cmd_validate "$@"
            ;;
        build)
            cmd_build "$@"
            ;;
        deploy)
            cmd_deploy "$@"
            ;;
        help|--help|-h)
            cmd_help
            ;;
        *)
            if [ -z "$command" ]; then
                cmd_help
            else
                print_error "Unknown command: $command"
                echo ""
                cmd_help
                exit 1
            fi
            ;;
    esac
}

main "$@"
