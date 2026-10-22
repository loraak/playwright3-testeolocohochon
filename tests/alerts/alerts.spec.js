const { test, expect } = require('../fixtures');

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/alerts'); });

  test('alert simple', async ({ page }) => {
    let msg = '';
    page.once('dialog', async d => { msg = d.message(); await d.accept(); });
    await page.click('#alertButton');
    await expect.poll(() => msg).toContain('You clicked a button');
  });

  test('alert con temporizador (5 s)', async ({ page }) => {
    let msg = '';
    page.once('dialog', async d => { msg = d.message(); await d.accept(); });
    await page.click('#timerAlertButton');
    await expect.poll(() => msg, { timeout: 10000 }).toContain('appeared after 5 seconds');
  });

  test('confirm: aceptar', async ({ page }) => {
    page.once('dialog', d => d.accept());
    await page.click('#confirmButton');
    await expect(page.locator('#confirmResult')).toContainText('Ok');
  });

  test('confirm: cancelar', async ({ page }) => {
    page.once('dialog', d => d.dismiss());
    await page.click('#confirmButton');
    await expect(page.locator('#confirmResult')).toContainText('Cancel');
  });

  test('prompt: aceptar con texto', async ({ page }) => {
    page.once('dialog', d => d.accept('Playwright'));
    await page.click('#promtButton');
    await expect(page.locator('#promptResult')).toContainText('Playwright');
  });

  test('prompt: cancelar no muestra resultado', async ({ page }) => {
    page.once('dialog', d => d.dismiss());
    await page.click('#promtButton');
    await expect(page.locator('#promptResult')).toHaveCount(0);
  });
});
