module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
        'http://localhost:3000/services',
        'http://localhost:3000/blog',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 1,
      // Use production server for accurate Lighthouse scores.
      // In CI, the build is done before running lighthouse.
      // For local use: run `npm run build` first, then `npm run lighthouse`.
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      settings: {
        // Chrome flags for CI environments
        chromeFlags: '--no-sandbox --disable-gpu --disable-dev-shm-usage',
        // Use Playwright's Chromium if available
        chromePath: process.env.CHROME_PATH || undefined,
      },
    },
    assert: {
      assertions: {
        // Category scores (0-1 scale, 0.9 = 90+)
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Core Web Vitals thresholds (Google "good" thresholds)
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'interactive': ['error', { maxNumericValue: 3800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
