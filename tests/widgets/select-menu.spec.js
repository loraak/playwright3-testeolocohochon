const { test, expect } = require('../fixtures');

test.describe('Select Menu', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/select-menu'); });

  test('Select Value: Group 1, option 1', async ({ page }) => {
    await page.click('#withOptGroup');
    await page.getByText('Group 1, option 1', { exact: true }).click();
    await expect(page.locator('#withOptGroup')).toContainText('Group 1, option 1');
  });

  for (const t of ['Dr.', 'Prof.']) {
    test(`Select One: ${t}`, async ({ page }) => {
      await page.click('#selectOne');
      await page.getByText(t, { exact: true }).click();
      await expect(page.locator('#selectOne')).toContainText(t);
    });
  }

  for (const [texto, valor] of [['Blue', '1'], ['Green', '2'], ['Purple', '4']]) {
    test(`Old Style Select: ${texto}`, async ({ page }) => {
      await page.selectOption('#oldSelectMenu', texto);
      await expect(page.locator('#oldSelectMenu')).toHaveValue(valor);
    });
  }

  test('Multiselect drop down: Green y Blue', async ({ page }) => {
    await page.locator('div[class*="-control"]').nth(2).click();
    await page.getByText('Green', { exact: true }).click();
    await page.locator('div[class*="-control"]').nth(2).click();
    await page.getByText('Blue', { exact: true }).click();
    await expect(page.locator('div[class*="multiValue"]')).toHaveCount(2);
  });

  test('Standard multi select: Volvo y Audi', async ({ page }) => {
    await page.selectOption('#cars', ['volvo', 'audi']);
    await expect(page.locator('#cars option:checked')).toHaveCount(2);
  });
});
