const { test, expect } = require('../fixtures');

// demoqa ahora usa el acordeón de Bootstrap (.accordion-button con aria-expanded)
const titulos = ['What is Lorem Ipsum?', 'Where does it come from?', 'Why do we use it?'];
const seccion = (page, t) => page.locator('.accordion-button', { hasText: t });

test.describe('Accordian', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/accordian');
    await expect(seccion(page, titulos[0])).toBeVisible();
  });

  test('la sección 1 está abierta por defecto', async ({ page }) => {
    await expect(seccion(page, titulos[0])).toHaveAttribute('aria-expanded', 'true');
  });

  test('abrir sección 2', async ({ page }) => {
    await seccion(page, titulos[1]).click();
    await expect(seccion(page, titulos[1])).toHaveAttribute('aria-expanded', 'true');
  });

  test('abrir sección 3', async ({ page }) => {
    await seccion(page, titulos[2]).click();
    await expect(seccion(page, titulos[2])).toHaveAttribute('aria-expanded', 'true');
  });

  test('abrir sección 2 cierra la sección 1', async ({ page }) => {
    await seccion(page, titulos[1]).click();
    await expect(seccion(page, titulos[0])).toHaveAttribute('aria-expanded', 'false');
  });

  test('clic en sección 1 la colapsa', async ({ page }) => {
    await seccion(page, titulos[0]).click();
    await expect(seccion(page, titulos[0])).toHaveAttribute('aria-expanded', 'false');
  });

  test('existen los títulos de las 3 secciones', async ({ page }) => {
    await expect(page.locator('.accordion-button')).toHaveCount(3);
    for (const t of titulos) await expect(seccion(page, t)).toBeVisible();
  });
});