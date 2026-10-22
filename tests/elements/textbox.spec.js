const { test, expect } = require('../fixtures');

test.describe('Text Box', () => {
  test('envía el formulario con datos válidos', async ({ page }) => {
    await page.goto('/text-box');
    await page.fill('#userName', 'Ana Pérez');
    await page.fill('#userEmail', 'ana@test.com');
    await page.fill('#currentAddress', 'Calle 1');
    await page.fill('#permanentAddress', 'Calle 2');
    await page.click('#submit');
    await expect(page.locator('#output #name')).toContainText('Ana Pérez');
    await expect(page.locator('#output #email')).toContainText('ana@test.com');
  });

  test('email inválido marca error', async ({ page }) => {
    await page.goto('/text-box');
    await page.fill('#userEmail', 'correo-malo');
    await page.click('#submit');
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
  });
});