const { test, expect } = require('../fixtures');

test('click, doble click y click derecho', async ({ page }) => {
  await page.goto('/buttons');
  await page.dblclick('#doubleClickBtn');
  await expect(page.locator('#doubleClickMessage')).toBeVisible();
  await page.click('#rightClickBtn', { button: 'right' });
  await expect(page.locator('#rightClickMessage')).toBeVisible();
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.locator('#dynamicClickMessage')).toBeVisible();
});