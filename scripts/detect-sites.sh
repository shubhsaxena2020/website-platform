#!/bin/bash

# ============================================================================
# Detect Sites Script
# ============================================================================
#
# Scans the sites/ directory for configured sites and outputs a JSON matrix
# compatible with GitHub Actions. Used by the CI/CD pipeline to dynamically
# build the deployment matrix.
#
# Usage:
#   ./scripts/detect-sites.sh              # Output JSON matrix
#   ./scripts/detect-sites.sh --list       # Output human-readable list
#
# Exit codes:
#   0 - Success (sites found or fallback used)
#   1 - No sites found and no fallback
#
# ============================================================================

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

MODE="json"
if [ "$1" = "--list" ]; then
  MODE="list"
fi

# ============================================================================
# Detect Sites
# ============================================================================

SITES=()

if [ -d "sites" ]; then
  for site_dir in sites/*/; do
    if [ -f "${site_dir}site.json" ]; then
      site_id=$(basename "$site_dir")
      # Validate JSON
      if node -e "JSON.parse(require('fs').readFileSync('${site_dir}site.json', 'utf8'))" 2>/dev/null; then
        SITES+=("$site_id")
      else
        echo -e "${YELLOW}⚠ Invalid site config: $site_id (skipping)${NC}" >&2
      fi
    fi
  done
fi

# Fallback to demo if no sites found
if [ ${#SITES[@]} -eq 0 ]; then
  echo -e "${YELLOW}⚠ No sites found in sites/ directory, using fallback: demo${NC}" >&2
  SITES=("demo")
fi

# ============================================================================
# Output
# ============================================================================

if [ "$MODE" = "list" ]; then
  echo -e "${BLUE}📦 Configured Sites (${#SITES[@]}):${NC}"
  echo ""
  for site in "${SITES[@]}"; do
    echo -e "  ${GREEN}✓${NC} $site"
  done
  echo ""
  echo -e "${BLUE}These sites will be deployed by the CI/CD pipeline.${NC}"
else
  # Output JSON matrix for GitHub Actions
  if command -v jq &> /dev/null; then
    printf '%s\n' "${SITES[@]}" | jq -R . | jq -sc '.'
  else
    # Fallback without jq: build JSON manually
    echo -n "["
    first=true
    for site in "${SITES[@]}"; do
      if [ "$first" = true ]; then
        first=false
      else
        echo -n ","
      fi
      echo -n "\"$site\""
    done
    echo "]"
  fi
fi
