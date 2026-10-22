const { test, expect } = require('../fixtures');

test('accordion', async ({ page }) => {
  await page.goto('/accordian');
  await page.click('#section2Heading');
  await expect(page.locator('#section2Content')).toBeVisible();
});

test('auto complete', async ({ page }) => {
  await page.goto('/auto-complete');
  await page.fill('#autoCompleteMultipleInput', 'Re');
  await page.click('.auto-complete__option >> text=Red');
  await expect(page.locator('.auto-complete__multi-value__label')).toHaveText('Red');
});

test('slider y progress bar', async ({ page }) => {
  await page.goto('/slider');
  await page.locator('input[type="range"]').fill('75');
  await expect(page.locator('#sliderValue')).toHaveValue('75');

  await page.goto('/progress-bar');
  await page.click('#startStopButton');
  await expect(page.locator('[role="progressbar"]')).toHaveText('100%', { timeout: 15000 });
});

test('tabs y tooltips', async ({ page }) => {
  await page.goto('/tabs');
  await page.click('#demo-tab-what');
  await expect(page.locator('#demo-tabpane-what')).toBeVisible();

  await page.goto('/tool-tips');
  await page.hover('#toolTipButton');
  await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the Button');
});

test('select menu', async ({ page }) => {
  await page.goto('/select-menu');
  await page.selectOption('#oldSelectMenu', 'Blue');
  await expect(page.locator('#oldSelectMenu')).toHaveValue('9');
});