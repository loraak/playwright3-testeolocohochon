const { test, expect } = require('../fixtures');

const opcion = (page, t) => page.locator('.auto-complete__option', { hasText: t });

test.describe('Auto Complete', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/auto-complete'); });

  test('múltiple: agregar Red', async ({ page }) => {
    await page.fill('#autoCompleteMultipleInput', 'Re');
    await opcion(page, 'Red').click();
    await expect(page.locator('.auto-complete__multi-value__label')).toHaveText('Red');
  });

  test('múltiple: agregar dos colores', async ({ page }) => {
    for (const [txt, c] of [['Re', 'Red'], ['Bl', 'Blue']]) {
      await page.fill('#autoCompleteMultipleInput', txt);
      await opcion(page, c).click();
    }
    await expect(page.locator('.auto-complete__multi-value')).toHaveCount(2);
  });

  test('múltiple: agregar tres colores', async ({ page }) => {
    for (const [txt, c] of [['Re', 'Red'], ['Bl', 'Blue'], ['Gr', 'Green']]) {
      await page.fill('#autoCompleteMultipleInput', txt);
      await opcion(page, c).click();
    }
    await expect(page.locator('.auto-complete__multi-value')).toHaveCount(3);
  });

  test('múltiple: eliminar un color', async ({ page }) => {
    await page.fill('#autoCompleteMultipleInput', 'Re');
    await opcion(page, 'Red').click();
    await page.locator('.auto-complete__multi-value__remove').click();
    await expect(page.locator('.auto-complete__multi-value')).toHaveCount(0);
  });

  test('múltiple: sin coincidencias muestra aviso', async ({ page }) => {
    await page.fill('#autoCompleteMultipleInput', 'zzzz');
    await expect(page.locator('.auto-complete__menu-notice--no-options')).toBeVisible();
  });

  test('múltiple: un color elegido ya no se ofrece', async ({ page }) => {
    await page.fill('#autoCompleteMultipleInput', 'Red');
    await opcion(page, 'Red').click();
    await page.fill('#autoCompleteMultipleInput', 'Red');
    await expect(opcion(page, 'Red')).toHaveCount(0);
  });

  test('simple: elegir Blue', async ({ page }) => {
    await page.fill('#autoCompleteSingleInput', 'Bl');
    await opcion(page, 'Blue').click();
    await expect(page.locator('.auto-complete__single-value')).toHaveText('Blue');
  });

  test('simple: "Gr" sugiere Green', async ({ page }) => {
    await page.fill('#autoCompleteSingleInput', 'Gr');
    await expect(opcion(page, 'Green')).toBeVisible();
  });
});
