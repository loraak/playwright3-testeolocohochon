const { test, expect } = require('../fixtures');

test.describe('Browser Windows', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/browser-windows'); });

  test('nueva pestaña muestra el encabezado', async ({ page, context }) => {
    const [tab] = await Promise.all([context.waitForEvent('page'), page.click('#tabButton')]);
    await expect(tab.locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('nueva ventana muestra el encabezado', async ({ page, context }) => {
    const [win] = await Promise.all([context.waitForEvent('page'), page.click('#windowButton')]);
    await expect(win.locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('la nueva pestaña apunta a /sample', async ({ page, context }) => {
    const [tab] = await Promise.all([context.waitForEvent('page'), page.click('#tabButton')]);
    await tab.waitForLoadState();
    expect(tab.url()).toContain('/sample');
  });

  test('ventana con mensaje se abre', async ({ page, context }) => {
    const [win] = await Promise.all([context.waitForEvent('page'), page.click('#messageWindowButton')]);
    expect(win).toBeTruthy();
  });
});
