import type { NextConfig } from "next";

// ============================================================================
// Multi-Site Configuration
// ============================================================================

/**
 * Get the current site ID from environment variables
 * Each site has its own configuration and can be deployed independently
 */
const SITE_ID = process.env.SITE_ID || "demo";

/**
 * Site-specific configuration
 * In production, this would load from sites/{SITE_ID}/site.json
 */
const siteConfig: Record<string, { basePath: string; assetPrefix: string }> = {
  demo: {
    basePath: "",
    assetPrefix: "",
  },
  'client-a': {
    basePath: "",
    assetPrefix: "",
  },
  acme: {
    basePath: "",
    assetPrefix: "",
  },
  techcorp: {
    basePath: "",
    assetPrefix: "",
  },
};

const currentSite = siteConfig[SITE_ID] || siteConfig.demo;

const nextConfig: NextConfig = {
  /* Multi-Site Base Path & Asset Prefix */
  basePath: currentSite.basePath,
  assetPrefix: currentSite.assetPrefix,

  /* Environment Variables */
  env: {
    SITE_ID,
    NEXT_PUBLIC_SITE_ID: SITE_ID,
  },

  /* Security & Performance Headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* Redirects */
  async redirects() {
    return [];
  },

  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
    ],
  },

  /* Output for static export (optional, for full SSG) */
  // output: "export",

  /* TypeScript during build */
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
