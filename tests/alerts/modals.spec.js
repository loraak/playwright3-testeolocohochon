const { test, expect } = require('../fixtures');

test.describe('Modal Dialogs', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/modal-dialogs'); });

  test('abrir modal pequeño', async ({ page }) => {
    await page.click('#showSmallModal');
    await expect(page.locator('.modal-content')).toBeVisible();
  });

  test('título del modal pequeño', async ({ page }) => {
    await page.click('#showSmallModal');
    await expect(page.locator('#example-modal-sizes-title-sm')).toHaveText('Small Modal');
  });

  test('cerrar modal pequeño', async ({ page }) => {
    await page.click('#showSmallModal');
    await page.click('#closeSmallModal');
    await expect(page.locator('.modal-content')).toHaveCount(0);
  });

  test('abrir modal grande', async ({ page }) => {
    await page.click('#showLargeModal');
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Large Modal');
  });

  test('cuerpo del modal grande contiene Lorem Ipsum', async ({ page }) => {
    await page.click('#showLargeModal');
    await expect(page.locator('.modal-body')).toContainText('Lorem Ipsum');
  });

  test('cerrar modal grande', async ({ page }) => {
    await page.click('#showLargeModal');
    await page.click('#closeLargeModal');
    await expect(page.locator('.modal-content')).toHaveCount(0);
  });
});
