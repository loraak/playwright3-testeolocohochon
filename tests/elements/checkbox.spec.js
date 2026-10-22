const { test, expect } = require('../fixtures');

// demoqa ahora usa rc-tree: nodos planos con role="treeitem"
const nodo = (page, t) =>
  page.locator('[role="treeitem"]', { has: page.locator('.rc-tree-title', { hasText: new RegExp(`^${t}$`) }) });
const caja = (page, t) => nodo(page, t).locator('.rc-tree-checkbox');
const switcher = (page, t) => nodo(page, t).locator('.rc-tree-switcher');

const MARCADO = /rc-tree-checkbox-checked/;
const PARCIAL = /rc-tree-checkbox-indeterminate/;

// Abre todos los nodos que sigan cerrados
async function expandirTodo(page) {
  for (let i = 0; i < 12; i++) {
    const cerrados = page.locator('.rc-tree-switcher_close');
    if ((await cerrados.count()) === 0) break;
    await cerrados.first().click();
    await page.waitForTimeout(100);
  }
}

test.describe('Check Box', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkbox');
    await expect(nodo(page, 'Home')).toBeVisible();
  });

  test('expandir todos los nodos muestra Desktop y Downloads', async ({ page }) => {
    await expandirTodo(page);
    await expect(nodo(page, 'Desktop')).toBeVisible();
    await expect(nodo(page, 'Downloads')).toBeVisible();
  });

  test('colapsar Home oculta Desktop', async ({ page }) => {
    await switcher(page, 'Home').click();
    await expect(nodo(page, 'Desktop')).toBeVisible();
    await switcher(page, 'Home').click();
    await expect(nodo(page, 'Desktop')).toHaveCount(0);
  });

  test('seleccionar Home marca también Desktop', async ({ page }) => {
    await caja(page, 'Home').click();
    await expandirTodo(page);
    await expect(caja(page, 'Home')).toHaveClass(MARCADO);
    await expect(caja(page, 'Desktop')).toHaveClass(MARCADO);
  });

  test('deseleccionar Home desmarca todo', async ({ page }) => {
    await caja(page, 'Home').click();
    await caja(page, 'Home').click();
    await expect(caja(page, 'Home')).not.toHaveClass(MARCADO);
  });

  test('seleccionar solo Desktop marca Notes y Commands', async ({ page }) => {
    await expandirTodo(page);
    await caja(page, 'Desktop').click();
    await expect(caja(page, 'Notes')).toHaveClass(MARCADO);
    await expect(caja(page, 'Commands')).toHaveClass(MARCADO);
  });

  test('seleccionar solo Documents marca WorkSpace y Office', async ({ page }) => {
    await expandirTodo(page);
    await caja(page, 'Documents').click();
    await expect(caja(page, 'WorkSpace')).toHaveClass(MARCADO);
    await expect(caja(page, 'Office')).toHaveClass(MARCADO);
  });

  test('seleccionar solo Downloads marca sus dos archivos', async ({ page }) => {
    await expandirTodo(page);
    await caja(page, 'Downloads').click();
    await expect(caja(page, 'Word File.doc')).toHaveClass(MARCADO);
    await expect(caja(page, 'Excel File.doc')).toHaveClass(MARCADO);
  });

  test('expandir Home muestra Desktop, Documents y Downloads', async ({ page }) => {
    await switcher(page, 'Home').click();
    for (const n of ['Desktop', 'Documents', 'Downloads']) await expect(nodo(page, n)).toBeVisible();
  });

  test('seleccionar solo Notes deja Desktop en estado parcial', async ({ page }) => {
    await expandirTodo(page);
    await caja(page, 'Notes').click();
    await expect(caja(page, 'Notes')).toHaveClass(MARCADO);
    await expect(caja(page, 'Desktop')).toHaveClass(PARCIAL);
  });

  test('seleccionar solo Word File.doc deja Downloads en estado parcial', async ({ page }) => {
    await expandirTodo(page);
    await caja(page, 'Word File.doc').click();
    await expect(caja(page, 'Word File.doc')).toHaveClass(MARCADO);
    await expect(caja(page, 'Downloads')).toHaveClass(PARCIAL);
  });
});