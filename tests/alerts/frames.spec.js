const { test, expect } = require('../fixtures');

test.describe('Frames', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/frames'); });

  test('frame1 muestra su encabezado', async ({ page }) => {
    await expect(page.frameLocator('#frame1').locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('frame2 muestra su encabezado', async ({ page }) => {
    await expect(page.frameLocator('#frame2').locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('la página contiene al menos 2 iframes', async ({ page }) => {
    await expect(page.locator('iframe#frame1, iframe#frame2')).toHaveCount(2);
  });

  test('texto principal de la página', async ({ page }) => {
    await expect(page.getByText('Sample Iframe page').first()).toBeVisible();
  });
});

test.describe('Nested Frames', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/nestedframes'); });

  test('frame padre contiene "Parent frame"', async ({ page }) => {
    await expect(page.frameLocator('#frame1').locator('body')).toContainText('Parent frame');
  });

  test('frame hijo contiene "Child Iframe"', async ({ page }) => {
    await expect(page.frameLocator('#frame1').frameLocator('iframe').locator('p')).toHaveText('Child Iframe');
  });

  test('título de la página principal', async ({ page }) => {
    await expect(page.getByText('Sample Nested Iframe page')).toBeVisible();
  });
});
