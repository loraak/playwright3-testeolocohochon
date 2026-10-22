const { test, expect } = require('../fixtures');

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tabs'); });

  test('pestaña What visible por defecto', async ({ page }) => {
    await expect(page.locator('#demo-tabpane-what')).toBeVisible();
  });

  test('cambiar a Origin', async ({ page }) => {
    await page.click('#demo-tab-origin');
    await expect(page.locator('#demo-tabpane-origin')).toBeVisible();
  });

  test('cambiar a Use', async ({ page }) => {
    await page.click('#demo-tab-use');
    await expect(page.locator('#demo-tabpane-use')).toBeVisible();
  });

  test('la pestaña More está deshabilitada', async ({ page }) => {
    await expect(page.locator('#demo-tab-more')).toHaveAttribute('aria-disabled', 'true');
  });

  test('cambiar de pestaña oculta la anterior', async ({ page }) => {
    await page.click('#demo-tab-origin');
    await expect(page.locator('#demo-tabpane-what')).toBeHidden();
  });
});

test.describe('Tool Tips', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tool-tips'); });

  test('tooltip del botón', async ({ page }) => {
    await page.hover('#toolTipButton');
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the Button');
  });

  test('tooltip del campo de texto', async ({ page }) => {
    await page.hover('#toolTipTextField');
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the text field');
  });

  test('tooltip del link Contrary', async ({ page }) => {
    await page.locator('#texToolTopContainer a', { hasText: 'Contrary' }).hover();
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the Contrary');
  });

  test('tooltip del link 1.10.32', async ({ page }) => {
    await page.locator('#texToolTopContainer a', { hasText: '1.10.32' }).hover();
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the 1.10.32');
  });

  test('el tooltip desaparece al quitar el mouse', async ({ page }) => {
    await page.hover('#toolTipButton');
    await expect(page.locator('.tooltip-inner')).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(page.locator('.tooltip-inner')).toHaveCount(0);
  });
});

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/menu'); });

  test('se ven los 3 items principales', async ({ page }) => {
    for (const t of ['Main Item 1', 'Main Item 2', 'Main Item 3']) await expect(page.getByText(t)).toBeVisible();
  });

  test('el submenú está oculto al inicio', async ({ page }) => {
    await expect(page.getByText('SUB SUB LIST »')).toBeHidden();
  });

  test('hover en Main Item 2 muestra sub items', async ({ page }) => {
    await page.getByText('Main Item 2').hover();
    await expect(page.getByText('Sub Item').first()).toBeVisible();
    await expect(page.getByText('SUB SUB LIST »')).toBeVisible();
  });

  test('hover en SUB SUB LIST muestra Sub Sub Item 1', async ({ page }) => {
    await page.getByText('Main Item 2').hover();
    await page.getByText('SUB SUB LIST »').hover();
    await expect(page.getByText('Sub Sub Item 1')).toBeVisible();
  });

  test('hover en SUB SUB LIST muestra Sub Sub Item 2', async ({ page }) => {
    await page.getByText('Main Item 2').hover();
    await page.getByText('SUB SUB LIST »').hover();
    await expect(page.getByText('Sub Sub Item 2')).toBeVisible();
  });
});
