const { test, expect } = require('../fixtures');
const path = require('path');

test('subir archivo', async ({ page }) => {
  await page.goto('/upload-download');
  await page.setInputFiles('#uploadFile', path.join(__dirname, '../data/prueba.txt'));
  await expect(page.locator('#uploadedFilePath')).toContainText('prueba.txt');
});

test('descargar archivo', async ({ page }) => {
  await page.goto('/upload-download');
  const [descarga] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadButton'),
  ]);
  expect(descarga.suggestedFilename()).toBe('sampleFile.jpeg');
});