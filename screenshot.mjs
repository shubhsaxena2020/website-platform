import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: 'screenshots/homepage-desktop.png', fullPage: true });
    console.log('Desktop screenshot saved');

    // Mobile view
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: 'screenshots/homepage-mobile.png', fullPage: true });
    console.log('Mobile screenshot saved');

    // Check console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('Console errors:', errors.length > 0 ? errors : 'None');

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
