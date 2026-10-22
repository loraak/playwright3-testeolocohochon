const { test, expect } = require('../fixtures');

test('buscar libro', async ({ page }) => {
  await page.goto('/books');
  await page.fill('#searchBox', 'Git');
  await expect(page.locator('.rt-tr-group a').first()).toContainText('Git');
});

test('API: listar libros', async ({ request }) => {
  const res = await request.get('/BookStore/v1/Books');
  expect(res.status()).toBe(200);
  expect((await res.json()).books.length).toBeGreaterThan(0);
});