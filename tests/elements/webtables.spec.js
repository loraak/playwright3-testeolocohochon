const { test, expect } = require('../fixtures');

test.describe('Web Tables', () => {
  test('agregar, buscar, editar y eliminar registro', async ({ page }) => {
    await page.goto('/webtables');

    // Agregar
    await page.click('#addNewRecordButton');
    await page.fill('#firstName', 'Juan');
    await page.fill('#lastName', 'López');
    await page.fill('#userEmail', 'juan@test.com');
    await page.fill('#age', '30');
    await page.fill('#salary', '5000');
    await page.fill('#department', 'QA');
    await page.click('#submit');

    // Buscar
    await page.fill('#searchBox', 'Juan');
    const fila = page.locator('.rt-tr-group', { hasText: 'Juan' });
    await expect(fila).toBeVisible();

    // Editar
    await fila.locator('[title="Edit"]').click();
    await page.fill('#age', '31');
    await page.click('#submit');
    await expect(fila).toContainText('31');

    // Eliminar
    await fila.locator('[title="Delete"]').click();
    await expect(page.locator('.rt-tr-group', { hasText: 'Juan' })).toHaveCount(0);
  });

  test('ordenar por columna', async ({ page }) => {
    await page.goto('/webtables');
    await page.click('.rt-th >> text=First Name');
    await expect(page.locator('.rt-th.-sort-asc')).toBeVisible();
  });
});