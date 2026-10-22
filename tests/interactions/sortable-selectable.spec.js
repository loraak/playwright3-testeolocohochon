const { test, expect } = require('../fixtures');
const { dragTo } = require('../helpers');

test.describe('Sortable', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/sortable'); });

  test('la lista tiene 6 elementos', async ({ page }) => {
    await expect(page.locator('#demo-tabpane-list .list-group-item')).toHaveCount(6);
  });

  test('arrastrar "One" cambia el orden de la lista', async ({ page }) => {
    const items = page.locator('#demo-tabpane-list .list-group-item');
    await dragTo(page, items.nth(0), items.nth(3), 10);
    await expect(items.first()).not.toHaveText('One');
  });

  test('la cuadrícula tiene 9 elementos', async ({ page }) => {
    await page.click('#demo-tab-grid');
    await expect(page.locator('#demo-tabpane-grid .list-group-item')).toHaveCount(9);
  });
});

test.describe('Selectable', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/selectable'); });

  test('lista: clic activa un elemento', async ({ page }) => {
    const item = page.locator('#verticalListContainer li').first();
    await item.click();
    await expect(item).toHaveClass(/active/);
  });

  test('lista: segundo clic lo desactiva', async ({ page }) => {
    const item = page.locator('#verticalListContainer li').first();
    await item.click();
    await item.click();
    await expect(item).not.toHaveClass(/active/);
  });

  test('lista: varios elementos activos a la vez', async ({ page }) => {
    const items = page.locator('#verticalListContainer li');
    await items.nth(0).click();
    await items.nth(2).click();
    await expect(page.locator('#verticalListContainer li.active')).toHaveCount(2);
  });

  test('cuadrícula: clic activa un elemento', async ({ page }) => {
    await page.click('#demo-tab-grid');
    const item = page.locator('#gridContainer li').first();
    await item.click();
    await expect(item).toHaveClass(/active/);
  });
});
