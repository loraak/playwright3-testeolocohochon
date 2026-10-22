const { test, expect } = require('../fixtures');

const fila = (page, t) => page.locator('.rt-tr-group', { hasText: t });
const columnas = ['First Name', 'Last Name', 'Age', 'Email', 'Salary', 'Department'];

async function agregar(page, d = {}) {
  const v = { firstName: 'Juan', lastName: 'López', userEmail: 'juan@test.com', age: '30', salary: '5000', department: 'QA', ...d };
  await page.click('#addNewRecordButton');
  for (const [id, val] of Object.entries(v)) await page.fill('#' + id, val);
  await page.click('#submit');
}

test.describe('Web Tables', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/webtables'); });

  test('muestra los 3 registros iniciales', async ({ page }) => {
    for (const n of ['Cierra', 'Alden', 'Kierra']) await expect(fila(page, n)).toBeVisible();
  });

  test('agregar un registro', async ({ page }) => {
    await agregar(page);
    await expect(fila(page, 'Juan')).toContainText('juan@test.com');
  });

  for (const n of ['Cierra', 'Alden', 'Kierra']) {
    test(`buscar "${n}"`, async ({ page }) => {
      await page.fill('#searchBox', n);
      await expect(fila(page, n)).toBeVisible();
    });
  }

  test('buscar sin resultados', async ({ page }) => {
    await page.fill('#searchBox', 'zzzzzz');
    await expect(page.locator('.rt-noData')).toBeVisible();
  });

  for (const n of ['Cierra', 'Alden', 'Kierra']) {
    test(`eliminar registro de ${n}`, async ({ page }) => {
      await fila(page, n).locator('[title="Delete"]').click();
      await expect(fila(page, n)).toHaveCount(0);
    });
  }

  test('editar la edad de un registro', async ({ page }) => {
    await fila(page, 'Cierra').locator('[title="Edit"]').click();
    await page.fill('#age', '99');
    await page.click('#submit');
    await expect(fila(page, 'Cierra')).toContainText('99');
  });

  test('campos obligatorios vacíos mantienen el modal abierto', async ({ page }) => {
    await page.click('#addNewRecordButton');
    await page.click('#submit');
    await expect(page.locator('.modal-content')).toBeVisible();
  });

  test('email inválido mantiene el modal abierto', async ({ page }) => {
    await page.click('#addNewRecordButton');
    for (const [id, v] of Object.entries({ firstName: 'A', lastName: 'B', userEmail: 'malo', age: '20', salary: '1', department: 'X' }))
      await page.fill('#' + id, v);
    await page.click('#submit');
    await expect(page.locator('.modal-content')).toBeVisible();
  });

  for (const c of columnas) {
    test(`ordenar por columna ${c}`, async ({ page }) => {
      await page.locator('.rt-th', { hasText: c }).click();
      await expect(page.locator('.rt-th.-sort-asc')).toHaveCount(1);
    });
  }

  test('filas por página = 5', async ({ page }) => {
    await page.locator('select[aria-label="rows per page"]').selectOption('5');
    await expect(page.locator('.rt-tr-group')).toHaveCount(5);
  });

  test('botón Next deshabilitado con una sola página', async ({ page }) => {
    await expect(page.locator('.-next button')).toBeDisabled();
  });
});
