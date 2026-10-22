const { test, expect } = require('../fixtures');

test.describe('Dynamic Properties', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/dynamic-properties'); });

  test('botón se habilita tras 5 segundos', async ({ page }) => {
    await expect(page.locator('#enableAfter')).toBeDisabled();
    await expect(page.locator('#enableAfter')).toBeEnabled({ timeout: 8000 });
  });

  test('botón oculto al inicio', async ({ page }) => {
    await expect(page.locator('#visibleAfter')).toHaveCount(0);
  });

  test('botón aparece tras 5 segundos', async ({ page }) => {
    await expect(page.locator('#visibleAfter')).toBeVisible({ timeout: 8000 });
  });

  test('cambia el color del botón', async ({ page }) => {
    await expect(page.locator('#colorChange')).toHaveClass(/text-danger/, { timeout: 8000 });
  });

  test('el texto contiene un ID aleatorio', async ({ page }) => {
    await expect(page.getByText('This text has random Id')).toBeVisible();
  });
});
