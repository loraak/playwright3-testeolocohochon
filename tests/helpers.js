// Arrastre con mouse real (más estable que dragAndDrop en componentes React)
async function dragTo(page, from, to, offsetY = 0) {
  const a = await from.boundingBox();
  const b = await to.boundingBox();
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2 + offsetY, { steps: 15 });
  await page.mouse.up();
}
async function dragBy(page, loc, dx, dy) {
  const a = await loc.boundingBox();
  const x = a.x + a.width / 2, y = a.y + a.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 15 });
  await page.mouse.up();
}
module.exports = { dragTo, dragBy };
