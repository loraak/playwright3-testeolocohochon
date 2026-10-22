const { test, expect } = require('../fixtures');

test('alert simple', async ({ page }) => {
  await page.goto('/alerts');
  page.once('dialog', d => { expect(d.message()).toContain('You clicked a button'); d.accept(); });
  await page.click('#alertButton');
});

test('alert con timer', async ({ page }) => {
  await page.goto('/alerts');
  page.once('dialog', d => d.accept());
  await page.click('#timerAlertButton');
  await page.waitForEvent('dialog');
});

test('confirm: aceptar y cancelar', async ({ page }) => {
  await page.goto('/alerts');
  page.once('dialog', d => d.accept());
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toContainText('Ok');
  page.once('dialog', d => d.dismiss());
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toContainText('Cancel');
});

test('prompt', async ({ page }) => {
  await page.goto('/alerts');
  page.once('dialog', d => d.accept('Playwright'));
  await page.click('#promtButton');
  await expect(page.locator('#promptResult')).toContainText('Playwright');
});