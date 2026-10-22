const { test, expect } = require('../fixtures');

test.describe('Book Store UI', () => {
  test('la lista muestra libros', async ({ page }) => {
    await page.goto('/books');
    await expect(page.locator('.rt-tbody .rt-tr-group a').first()).toBeVisible();
  });

  for (const [q, esperado] of [['Git', 'Git'], ['JavaScript', 'JavaScript'], ['Learning', 'Learning']]) {
    test(`buscar "${q}"`, async ({ page }) => {
      await page.goto('/books');
      await page.fill('#searchBox', q);
      await expect(page.locator('.rt-tbody .rt-tr-group a').first()).toContainText(esperado);
    });
  }

  test('búsqueda sin resultados', async ({ page }) => {
    await page.goto('/books');
    await page.fill('#searchBox', 'zzzzzzzz');
    await expect(page.locator('.rt-noData')).toBeVisible();
  });

  test('login con credenciales inválidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#userName', 'usuario_inexistente');
    await page.fill('#password', 'Clave123!');
    await page.click('#login');
    await expect(page.locator('#name')).toHaveText('Invalid username or password!');
  });

  test('login con campos vacíos marca error', async ({ page }) => {
    await page.goto('/login');
    await page.click('#login');
    await expect(page.locator('#userName')).toHaveClass(/is-invalid/);
  });

  test('profile sin sesión pide iniciar sesión', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByText(/not logged into/i)).toBeVisible();
  });
});

test.describe('Book Store API', () => {
  test('GET /BookStore/v1/Books devuelve la lista', async ({ request }) => {
    const res = await request.get('/BookStore/v1/Books');
    expect(res.status()).toBe(200);
    expect((await res.json()).books.length).toBeGreaterThan(0);
  });

  test('GET libro por ISBN', async ({ request }) => {
    const res = await request.get('/BookStore/v1/Book?ISBN=9781449325862');
    expect(res.status()).toBe(200);
    expect((await res.json()).title).toContain('Git');
  });
});
