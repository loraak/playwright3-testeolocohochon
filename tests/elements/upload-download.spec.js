const { test, expect } = require('../fixtures');
const path = require('path');
const fs = require('fs');

const datos = f => path.join(__dirname, '../data', f);

test.describe('Upload and Download', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/upload-download'); });

  test('subir archivo de texto', async ({ page }) => {
    await page.setInputFiles('#uploadFile', datos('prueba.txt'));
    await expect(page.locator('#uploadedFilePath')).toContainText('prueba.txt');
  });

  test('subir imagen PNG', async ({ page }) => {
    await page.setInputFiles('#uploadFile', datos('imagen.png'));
    await expect(page.locator('#uploadedFilePath')).toContainText('imagen.png');
  });

  test('la ruta mostrada usa fakepath', async ({ page }) => {
    await page.setInputFiles('#uploadFile', datos('prueba.txt'));
    await expect(page.locator('#uploadedFilePath')).toContainText('fakepath');
  });

  test('reemplazar archivo actualiza la ruta', async ({ page }) => {
    await page.setInputFiles('#uploadFile', datos('prueba.txt'));
    await page.setInputFiles('#uploadFile', datos('imagen.png'));
    await expect(page.locator('#uploadedFilePath')).toContainText('imagen.png');
  });

  test('descargar archivo con nombre correcto', async ({ page }) => {
    const [d] = await Promise.all([page.waitForEvent('download'), page.click('#downloadButton')]);
    expect(d.suggestedFilename()).toBe('sampleFile.jpeg');
  });

  test('el archivo descargado no está vacío', async ({ page }) => {
    const [d] = await Promise.all([page.waitForEvent('download'), page.click('#downloadButton')]);
    const ruta = await d.path();
    expect(fs.statSync(ruta).size).toBeGreaterThan(0);
  });
});
