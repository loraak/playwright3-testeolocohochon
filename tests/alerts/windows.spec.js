const { test, expect } = require('../fixtures');

test('nueva pestaña y ventana', async ({ page, context }) => {
  await page.goto('/browser-windows');
  const [tab] = await Promise.all([context.waitForEvent('page'), page.click('#tabButton')]);
  await expect(tab.locator('#sampleHeading')).toHaveText('This is a sample page');
  const [win] = await Promise.all([context.waitForEvent('page'), page.click('#windowButton')]);
  await expect(win.locator('#sampleHeading')).toBeVisible();
});

test('frames', async ({ page }) => {
  await page.goto('/frames');
  const frame = page.frameLocator('#frame1');
  await expect(frame.locator('#sampleHeading')).toHaveText('This is a sample page');
});

test('modal pequeño', async ({ page }) => {
  await page.goto('/modal-dialogs');
  await page.click('#showSmallModal');
  await expect(page.locator('.modal-body')).toBeVisible();
  await page.click('#closeSmallModal');
  await expect(page.locator('.modal-content')).toHaveCount(0);
});