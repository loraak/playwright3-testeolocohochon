const { test, expect } = require('../fixtures');

test('droppable', async ({ page }) => {
  await page.goto('/droppable');
  await page.dragAndDrop('#draggable', '#simpleDropContainer #droppable');
  await expect(page.locator('#simpleDropContainer #droppable')).toHaveText('Dropped!');
});

test('selectable', async ({ page }) => {
  await page.goto('/selectable');
  await page.click('#demo-tab-list');
  await page.click('#verticalListContainer li >> nth=0');
  await expect(page.locator('#verticalListContainer li').first()).toHaveClass(/active/);
});

test('sortable', async ({ page }) => {
  await page.goto('/sortable');
  await page.dragAndDrop('#demo-tabpane-list .list-group-item >> nth=0',
                         '#demo-tabpane-list .list-group-item >> nth=3');
});