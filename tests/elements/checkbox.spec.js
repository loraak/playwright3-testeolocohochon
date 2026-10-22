const { test, expect } = require('../fixtures');

test('expandir todo y seleccionar Home', async ({ page }) => {
  await page.goto('/checkbox');
  await page.click('button[title="Expand all"]');
  await page.locator('.rct-checkbox').first().click();
  await expect(page.locator('#result')).toContainText('home');
  await expect(page.locator('#result')).toContainText('desktop');
  await page.click('button[title="Collapse all"]');
});