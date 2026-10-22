const { test, expect } = require('../fixtures');

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/buttons'); });

  test('doble clic', async ({ page }) => {
    await page.dblclick('#doubleClickBtn');
    await expect(page.locator('#doubleClickMessage')).toContainText('double click');
  });

  test('clic derecho', async ({ page }) => {
    await page.click('#rightClickBtn', { button: 'right' });
    await expect(page.locator('#rightClickMessage')).toContainText('right click');
  });

  test('clic dinámico', async ({ page }) => {
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();
    await expect(page.locator('#dynamicClickMessage')).toContainText('dynamic click');
  });

  test('sin mensajes al cargar', async ({ page }) => {
    await expect(page.locator('#doubleClickMessage')).toHaveCount(0);
    await expect(page.locator('#rightClickMessage')).toHaveCount(0);
    await expect(page.locator('#dynamicClickMessage')).toHaveCount(0);
  });

  test('un solo clic no dispara el doble clic', async ({ page }) => {
    await page.click('#doubleClickBtn');
    await expect(page.locator('#doubleClickMessage')).toHaveCount(0);
  });

  test('clic derecho no dispara el clic dinámico', async ({ page }) => {
    await page.click('#rightClickBtn', { button: 'right' });
    await expect(page.locator('#dynamicClickMessage')).toHaveCount(0);
  });
});
