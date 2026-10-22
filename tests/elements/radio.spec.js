const { test, expect } = require('../fixtures');

test.describe('Radio Button', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/radio-button'); });

  test('seleccionar Yes', async ({ page }) => {
    await page.click('label[for="yesRadio"]');
    await expect(page.locator('.text-success')).toHaveText('Yes');
  });

  test('seleccionar Impressive', async ({ page }) => {
    await page.click('label[for="impressiveRadio"]');
    await expect(page.locator('.text-success')).toHaveText('Impressive');
  });

  test('No está deshabilitado', async ({ page }) => {
    await expect(page.locator('#noRadio')).toBeDisabled();
  });

  test('cambiar de Yes a Impressive', async ({ page }) => {
    await page.click('label[for="yesRadio"]');
    await page.click('label[for="impressiveRadio"]');
    await expect(page.locator('.text-success')).toHaveText('Impressive');
  });
});
