const { test, expect } = require('../fixtures');

const datos = { userName: 'Ana Pérez', userEmail: 'ana@test.com', currentAddress: 'Calle 1', permanentAddress: 'Calle 2' };

test.describe('Text Box', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/text-box'); });

  test('envía el formulario con todos los datos válidos', async ({ page }) => {
    for (const [id, v] of Object.entries(datos)) await page.fill('#' + id, v);
    await page.click('#submit');
    await expect(page.locator('#output #name')).toContainText('Ana Pérez');
    await expect(page.locator('#output #email')).toContainText('ana@test.com');
    await expect(page.locator('#output #currentAddress')).toContainText('Calle 1');
    await expect(page.locator('#output #permanentAddress')).toContainText('Calle 2');
  });

  for (const malo of ['abc', 'a@', '@b.com', 'a@b', 'a b@c.com']) {
    test(`email inválido "${malo}" marca error`, async ({ page }) => {
      await page.fill('#userEmail', malo);
      await page.click('#submit');
      await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
    });
  }

  test('envío vacío no muestra salida', async ({ page }) => {
    await page.click('#submit');
    await expect(page.locator('#output #name')).toHaveCount(0);
  });

  test('solo nombre', async ({ page }) => {
    await page.fill('#userName', 'Solo Nombre');
    await page.click('#submit');
    await expect(page.locator('#output #name')).toContainText('Solo Nombre');
    await expect(page.locator('#output #email')).toHaveCount(0);
  });

  test('solo email válido', async ({ page }) => {
    await page.fill('#userEmail', 'solo@test.com');
    await page.click('#submit');
    await expect(page.locator('#output #email')).toContainText('solo@test.com');
  });

  test('solo dirección actual', async ({ page }) => {
    await page.fill('#currentAddress', 'Av. Siempre Viva 742');
    await page.click('#submit');
    await expect(page.locator('#output #currentAddress')).toContainText('Siempre Viva');
  });

  test('solo dirección permanente', async ({ page }) => {
    await page.fill('#permanentAddress', 'Calle Falsa 123');
    await page.click('#submit');
    await expect(page.locator('#output #permanentAddress')).toContainText('Calle Falsa');
  });

  test('acepta texto largo (200 caracteres)', async ({ page }) => {
    const largo = 'x'.repeat(200);
    await page.fill('#userName', largo);
    await page.click('#submit');
    await expect(page.locator('#output #name')).toContainText(largo);
  });
});
