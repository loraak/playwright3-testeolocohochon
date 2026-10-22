const { test, expect } = require('../fixtures');

test('link que abre nueva pestaña', async ({ page, context }) => {
  await page.goto('/links');
  const [nueva] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#simpleLink'),
  ]);
  await nueva.waitForLoadState();
  expect(nueva.url()).toContain('demoqa.com');
});

test('links de API muestran el código HTTP', async ({ page }) => {
  await page.goto('/links');
  await page.click('#created');
  await expect(page.locator('#linkResponse')).toContainText('201');
  await page.click('#no-content');
  await expect(page.locator('#linkResponse')).toContainText('204');
  await page.click('#not-found');
  await expect(page.locator('#linkResponse')).toContainText('404');
});