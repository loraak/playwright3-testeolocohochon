const { test, expect } = require('../fixtures');

test('propiedades dinámicas', async ({ page }) => {
  await page.goto('/dynamic-properties');
  await expect(page.locator('#enableAfter')).toBeDisabled();
  await expect(page.locator('#enableAfter')).toBeEnabled({ timeout: 6000 });
  await expect(page.locator('#visibleAfter')).toBeVisible({ timeout: 6000 });
  await expect(page.locator('#colorChange')).toHaveClass(/text-danger/, { timeout: 6000 });
});