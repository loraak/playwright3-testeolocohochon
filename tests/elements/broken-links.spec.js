const { test, expect } = require('../fixtures');

const cargada = loc => loc.evaluate(img => img.complete && img.naturalWidth > 0);

test.describe('Broken Links - Images', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/broken'); });

  test('imagen válida se carga', async ({ page }) => {
    const img = page.locator('img[src="/images/Toolsqa.jpg"]');
    await expect(img).toBeVisible();
    expect(await cargada(img)).toBe(true);
  });

  test('imagen rota no se carga', async ({ page }) => {
    const img = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    await expect(img).toBeAttached();
    expect(await cargada(img)).toBe(false);
  });

  test('link válido apunta a demoqa', async ({ page }) => {
    await expect(page.getByText('Click Here for Valid Link')).toHaveAttribute('href', /demoqa\.com/);
  });

  test('link roto apunta a status_code/500', async ({ page }) => {
    await expect(page.getByText('Click Here for Broken Link')).toHaveAttribute('href', /status_code\/500/);
  });
});
