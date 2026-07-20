#!/bin/bash

# Multi-Site Deployment Verification Script
# Validates that all deployment infrastructure is properly configured for multi-site deployment

set -e

echo "🔍 Multi-Site Deployment Verification"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check vercel.json
echo "1. Checking vercel.json..."
if [ -f "vercel.json" ]; then
    if node -e "const v = require('./vercel.json'); if (!v.framework || !v.buildCommand || !v.headers) throw new Error('Missing required fields');" 2>/dev/null; then
        echo -e "${GREEN}   ✓ vercel.json exists and has required fields${NC}"
    else
        echo -e "${RED}   ✗ vercel.json exists but missing required fields${NC}"
    fi
else
    echo -e "${RED}   ✗ vercel.json not found${NC}"
fi

# Check CI/CD pipeline
echo ""
echo "2. Checking CI/CD pipeline..."
if [ -f ".github/workflows/ci.yml" ]; then
    if grep -q "deploy-preview" .github/workflows/ci.yml && grep -q -E "build-and-deploy|deploy-production" .github/workflows/ci.yml; then
        echo -e "${GREEN}   ✓ CI/CD pipeline has preview and production jobs${NC}"
    else
        echo -e "${RED}   ✗ CI/CD pipeline missing deployment jobs${NC}"
    fi
else
    echo -e "${RED}   ✗ CI/CD pipeline not found${NC}"
fi

# Check environment template
echo ""
echo "3. Checking environment template..."
if [ -f ".env.example" ]; then
    if grep -q "VERCEL_ORG_ID" .env.example && grep -q "VERCEL_PROJECT_ID" .env.example; then
        echo -e "${GREEN}   ✓ .env.example has Vercel configuration${NC}"
    else
        echo -e "${RED}   ✗ .env.example missing Vercel configuration${NC}"
    fi
else
    echo -e "${RED}   ✗ .env.example not found${NC}"
fi

# Check deployment guide
echo ""
echo "4. Checking deployment guide..."
if [ -f "deployment-guide.md" ]; then
    if grep -q "Custom Domain" deployment-guide.md && grep -q "Monitoring" deployment-guide.md; then
        echo -e "${GREEN}   ✓ deployment-guide.md has domain and monitoring sections${NC}"
    else
        echo -e "${YELLOW}   ⚠ deployment-guide.md missing some sections${NC}"
    fi
else
    echo -e "${RED}   ✗ deployment-guide.md not found${NC}"
fi

# Check package.json scripts
echo ""
echo "5. Checking package.json scripts..."
if [ -f "package.json" ]; then
    if grep -q '"test": "vitest run"' package.json && grep -q '"build": "next build"' package.json; then
        echo -e "${GREEN}   ✓ package.json has required scripts${NC}"
    else
        echo -e "${RED}   ✗ package.json missing required scripts${NC}"
    fi
else
    echo -e "${RED}   ✗ package.json not found${NC}"
fi

# Summary
echo ""
echo "=================================="
echo "Verification complete!"
echo ""
echo "Next steps:"
echo "1. Run: vercel link"
echo "2. Add GitHub Secrets: VERCEL_ORG_ID, VERCEL_PROJECT_ID, VERCEL_TOKEN"
echo "3. Push to main to trigger production deployment"
echo ""
echo "For detailed instructions, see deployment-guide.md"

# Multi-site specific checks
echo ""
echo "Multi-Site Deployment Checks:"
echo "=============================="

# Check sites directory
echo ""
echo "6. Checking sites directory..."
if [ -d "sites" ]; then
    SITE_COUNT=$(ls -d sites/*/ 2>/dev/null | wc -l)
    if [ $SITE_COUNT -gt 0 ]; then
        echo -e "${GREEN}   ✓ Found $SITE_COUNT site(s) in sites/ directory${NC}"
        # List sites
        for site_dir in sites/*/; do
            if [ -f "${site_dir}site.json" ]; then
                site_id=$(basename "$site_dir")
                if node -e "JSON.parse(require('fs').readFileSync('${site_dir}site.json', 'utf8'))" 2>/dev/null; then
                    echo -e "${GREEN}     ✓ $site_id (valid configuration)${NC}"
                else
                    echo -e "${YELLOW}     ⚠ $site_id (invalid configuration)${NC}"
                fi
            fi
        done
    else
        echo -e "${YELLOW}   ⚠ No sites found in sites/ directory${NC}"
    fi
else
    echo -e "${RED}   ✗ sites/ directory not found${NC}"
fi

# Check site-manager script
echo ""
echo "7. Checking site-manager script..."
if [ -f "scripts/site-manager.sh" ] && [ -x "scripts/site-manager.sh" ]; then
    echo -e "${GREEN}   ✓ site-manager.sh exists and is executable${NC}"
else
    echo -e "${RED}   ✗ site-manager.sh not found or not executable${NC}"
fi

# Check detect-sites script
echo ""
echo "8. Checking detect-sites script..."
if [ -f "scripts/detect-sites.sh" ] && [ -x "scripts/detect-sites.sh" ]; then
    echo -e "${GREEN}   ✓ detect-sites.sh exists and is executable${NC}"
else
    echo -e "${RED}   ✗ detect-sites.sh not found or not executable${NC}"
fi

# Test site detection
echo ""
echo "9. Testing site detection..."
if [ -f "scripts/detect-sites.sh" ] && [ -x "scripts/detect-sites.sh" ]; then
    SITES_JSON=$(./scripts/detect-sites.sh 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}   ✓ Site detection works (JSON output: $SITES_JSON)${NC}"
    else
        echo -e "${RED}   ✗ Site detection failed${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠ Skipping site detection test (script not found)${NC}"
fi

# Check site-config.ts
echo ""
echo "10. Checking site-config.ts..."
if [ -f "src/lib/site-config.ts" ]; then
    if grep -q "listAvailableSites" src/lib/site-config.ts && grep -q "sites/" src/lib/site-config.ts; then
        echo -e "${GREEN}   ✓ site-config.ts has dynamic site scanning${NC}"
    else
        echo -e "${YELLOW}   ⚠ site-config.ts may not have dynamic site scanning${NC}"
    fi
else
    echo -e "${RED}   ✗ site-config.ts not found${NC}"
fi

echo ""
echo "=================================="
echo "Multi-Site Verification complete!"
echo ""
echo "To add a new site:"
echo "  ./scripts/site-manager.sh create <site-id>"
echo ""
echo "To list all sites:"
echo "  ./scripts/site-manager.sh list"
echo ""
echo "To validate a site:"
echo "  ./scripts/site-manager.sh validate <site-id>"
