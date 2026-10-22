const { test, expect } = require('../fixtures');

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/slider'); });

  test('valor inicial 25', async ({ page }) => {
    await expect(page.locator('#sliderValue')).toHaveValue('25');
  });

  for (const v of ['0', '50', '100']) {
    test(`fijar el slider en ${v}`, async ({ page }) => {
      await page.locator('input[type="range"]').fill(v);
      await expect(page.locator('#sliderValue')).toHaveValue(v);
    });
  }

  test('flecha derecha incrementa a 26', async ({ page }) => {
    await page.locator('input[type="range"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#sliderValue')).toHaveValue('26');
  });
});

test.describe('Progress Bar', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/progress-bar'); });

  test('inicia en 0%', async ({ page }) => {
    await expect(page.locator('[role="progressbar"]')).toHaveText('0%');
  });

  test('al iniciar el botón cambia a Stop', async ({ page }) => {
    await page.click('#startStopButton');
    await expect(page.locator('#startStopButton')).toHaveText('Stop');
  });

  test('llega al 100%', async ({ page }) => {
    await page.click('#startStopButton');
    await expect(page.locator('[role="progressbar"]')).toHaveText('100%', { timeout: 20000 });
  });

  test('al 100% aparece el botón Reset', async ({ page }) => {
    await page.click('#startStopButton');
    await expect(page.locator('#resetButton')).toBeVisible({ timeout: 20000 });
  });

  test('Reset vuelve a 0%', async ({ page }) => {
    await page.click('#startStopButton');
    await page.click('#resetButton', { timeout: 20000 });
    await expect(page.locator('[role="progressbar"]')).toHaveText('0%');
  });
});
