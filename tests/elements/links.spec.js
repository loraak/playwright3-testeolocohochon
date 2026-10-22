const { test, expect } = require('../fixtures');

test.describe('Links', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/links'); });

  for (const id of ['simpleLink', 'dynamicLink']) {
    test(`#${id} abre una pestaña nueva`, async ({ page, context }) => {
      const [nueva] = await Promise.all([context.waitForEvent('page'), page.click('#' + id)]);
      await nueva.waitForLoadState();
      expect(nueva.url()).toContain('demoqa.com');
    });
  }

  const apis = [
    ['created', '201'], ['no-content', '204'], ['moved', '301'], ['bad-request', '400'],
    ['unauthorized', '401'], ['forbidden', '403'], ['invalid-url', '404'],
  ];
  for (const [id, codigo] of apis) {
    test(`link API ${id} responde ${codigo}`, async ({ page }) => {
      await page.click('#' + id);
      await expect(page.locator('#linkResponse')).toContainText(codigo);
    });
  }

  test('simpleLink apunta a demoqa.com', async ({ page }) => {
    await expect(page.locator('#simpleLink')).toHaveAttribute('href', /demoqa\.com/);
  });
});
