import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE_URL = 'http://localhost:3002';
const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/contact', name: 'contact' },
  { path: '/blog', name: 'blog' },
];

async function main() {
  mkdirSync('screenshots', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  for (const { path, name } of PAGES) {
    console.log(`\n--- Navigating to ${path} (${name}) ---`);
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000); // Let animations settle

      // Full page screenshot
      await page.screenshot({
        path: `screenshots/${name}-full.png`,
        fullPage: true,
      });
      console.log(`  ✅ Full page screenshot saved: screenshots/${name}-full.png`);

      // Viewport screenshot
      await page.screenshot({
        path: `screenshots/${name}-viewport.png`,
        fullPage: false,
      });
      console.log(`  ✅ Viewport screenshot saved: screenshots/${name}-viewport.png`);

      // Check page title
      const title = await page.title();
      console.log(`  📄 Title: "${title}"`);

      // Check for visible text content
      const bodyText = await page.textContent('body');
      const wordCount = bodyText?.split(/\s+/).filter(Boolean).length || 0;
      console.log(`  📝 Body word count: ${wordCount}`);

      // Check for main landmarks
      const hasNav = await page.locator('nav').count();
      const hasMain = await page.locator('main').count();
      const hasFooter = await page.locator('footer').count();
      console.log(`  🏗️  Landmarks: nav=${hasNav > 0}, main=${hasMain > 0}, footer=${hasFooter > 0}`);

      // Check for images
      const imgCount = await page.locator('img').count();
      console.log(`  🖼️  Images: ${imgCount}`);

      // Check for buttons/links
      const buttonCount = await page.locator('button').count();
      const linkCount = await page.locator('a').count();
      console.log(`  🔘 Buttons: ${buttonCount}, Links: ${linkCount}`);

    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
    }
  }

  // Mobile viewport test
  console.log('\n--- Mobile viewport (390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/homepage-mobile.png', fullPage: true });
    console.log('  ✅ Mobile homepage screenshot saved');

    // Check hamburger menu
    const hamburger = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [data-testid="mobile-menu"]').count();
    console.log(`  🍔 Hamburger menu button found: ${hamburger > 0}`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Report console errors
  console.log('\n--- Console Errors ---');
  if (consoleErrors.length === 0) {
    console.log('  ✅ No console errors detected');
  } else {
    consoleErrors.forEach((err, i) => {
      console.log(`  ❌ Error ${i + 1}: ${err}`);
    });
  }

  await browser.close();
  console.log('\n--- Done ---');
}

main().catch(console.error);
