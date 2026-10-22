const { test, expect } = require('../fixtures');
const { dragTo, dragBy } = require('../helpers');

test.describe('Resizable', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/resizable'); });

  const box = '#resizableBoxWithRestriction';

  test('caja restringida crece al arrastrar', async ({ page }) => {
    const antes = (await page.locator(box).boundingBox()).width;
    await dragBy(page, page.locator(`${box} .react-resizable-handle`), 50, 30);
    expect((await page.locator(box).boundingBox()).width).toBeGreaterThan(antes);
  });

  test('caja restringida respeta el máximo 500x300', async ({ page }) => {
    await dragBy(page, page.locator(`${box} .react-resizable-handle`), 700, 500);
    const b = await page.locator(box).boundingBox();
    expect(b.width).toBeLessThanOrEqual(501);
    expect(b.height).toBeLessThanOrEqual(301);
  });

  test('caja libre crece más allá de 200px', async ({ page }) => {
    await dragBy(page, page.locator('#resizable .react-resizable-handle'), 200, 150);
    expect((await page.locator('#resizable').boundingBox()).width).toBeGreaterThan(200);
  });
});

test.describe('Droppable', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/droppable'); });

  test('simple: suelta el elemento', async ({ page }) => {
    await dragTo(page, page.locator('#draggable'), page.locator('#simpleDropContainer #droppable'));
    await expect(page.locator('#simpleDropContainer #droppable')).toHaveText('Dropped!');
  });

  test('accept: el elemento aceptable se suelta', async ({ page }) => {
    await page.click('#droppableExample-tab-accept');
    await dragTo(page, page.locator('#acceptable'), page.locator('#acceptDropContainer #droppable'));
    await expect(page.locator('#acceptDropContainer #droppable')).toHaveText('Dropped!');
  });

  test('accept: el elemento no aceptable no se suelta', async ({ page }) => {
    await page.click('#droppableExample-tab-accept');
    await dragTo(page, page.locator('#notAcceptable'), page.locator('#acceptDropContainer #droppable'));
    await expect(page.locator('#acceptDropContainer #droppable')).toHaveText('Drop here');
  });

  test('revert: se suelta el elemento revertible', async ({ page }) => {
    await page.click('#droppableExample-tab-revertable');
    await dragTo(page, page.locator('#revertable'), page.locator('#revertableDropContainer #droppable'));
    await expect(page.locator('#revertableDropContainer #droppable')).toHaveText('Dropped!');
  });
});

test.describe('Dragabble', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/dragabble'); });

  test('caja simple se mueve', async ({ page }) => {
    const caja = page.locator('#dragBox');
    const antes = await caja.boundingBox();
    await dragBy(page, caja, 100, 50);
    const despues = await caja.boundingBox();
    expect(Math.abs(despues.x - antes.x)).toBeGreaterThan(50);
  });

  test('restringido a eje X: no cambia Y', async ({ page }) => {
    await page.click('#draggableExample-tab-axisRestriction');
    const caja = page.locator('#restrictedX');
    const antes = await caja.boundingBox();
    await dragBy(page, caja, 80, 80);
    const despues = await caja.boundingBox();
    expect(Math.abs(despues.y - antes.y)).toBeLessThan(2);
  });

  test('restringido a eje Y: no cambia X', async ({ page }) => {
    await page.click('#draggableExample-tab-axisRestriction');
    const caja = page.locator('#restrictedY');
    const antes = await caja.boundingBox();
    await dragBy(page, caja, 80, 80);
    const despues = await caja.boundingBox();
    expect(Math.abs(despues.x - antes.x)).toBeLessThan(2);
  });
});
