const { test, expect } = require('../fixtures');
const path = require('path');

const modal = page => page.locator('.modal-content');

// Llena el formulario; pasar null en un campo lo omite
async function llenar(page, o = {}) {
  const d = { first: 'Ana', last: 'Pérez', email: 'ana@test.com', gender: 2, mobile: '5512345678', address: 'Calle 1', ...o };
  if (d.first !== null) await page.fill('#firstName', d.first);
  if (d.last !== null) await page.fill('#lastName', d.last);
  if (d.email !== null) await page.fill('#userEmail', d.email);
  if (d.gender !== null) await page.click(`label[for="gender-radio-${d.gender}"]`);
  if (d.mobile !== null) await page.fill('#userNumber', d.mobile);
  if (d.address !== null) await page.fill('#currentAddress', d.address);
}
const enviar = page => page.click('#submit');

test.describe('Practice Form', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/automation-practice-form'); });

  test('formulario completo se envía correctamente', async ({ page }) => {
    await llenar(page);
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', '4');
    await page.selectOption('.react-datepicker__year-select', '1995');
    await page.click('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)');
    await page.fill('#subjectsInput', 'Maths');
    await page.keyboard.press('Enter');
    await page.click('label[for="hobbies-checkbox-1"]');
    await page.setInputFiles('#uploadPicture', path.join(__dirname, '../data/imagen.png'));
    await page.click('#state');
    await page.getByText('NCR', { exact: true }).click();
    await page.click('#city');
    await page.getByText('Delhi', { exact: true }).click();
    await enviar(page);
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
  });

  for (const [i, g] of [[1, 'Male'], [2, 'Female'], [3, 'Other']]) {
    test(`género ${g}`, async ({ page }) => {
      await llenar(page, { gender: i });
      await enviar(page);
      await expect(modal(page)).toContainText(g);
    });
  }

  test('campos obligatorios vacíos no envían', async ({ page }) => {
    await enviar(page);
    await expect(modal(page)).toHaveCount(0);
  });

  test('sin celular no envía', async ({ page }) => {
    await llenar(page, { mobile: null });
    await enviar(page);
    await expect(modal(page)).toHaveCount(0);
  });

  test('email inválido no envía', async ({ page }) => {
    await llenar(page, { email: 'malo' });
    await enviar(page);
    await expect(modal(page)).toHaveCount(0);
  });

  test('celular de 5 dígitos no envía', async ({ page }) => {
    await llenar(page, { mobile: '12345' });
    await enviar(page);
    await expect(modal(page)).toHaveCount(0);
  });

  for (const [i, h] of [[1, 'Sports'], [2, 'Reading'], [3, 'Music']]) {
    test(`hobby ${h}`, async ({ page }) => {
      await llenar(page);
      await page.click(`label[for="hobbies-checkbox-${i}"]`);
      await enviar(page);
      await expect(modal(page)).toContainText(h);
    });
  }

  test('varias materias (Maths y English)', async ({ page }) => {
    await llenar(page);
    await page.fill('#subjectsInput', 'Maths');
    await page.keyboard.press('Enter');
    await page.fill('#subjectsInput', 'Eng');
    await page.keyboard.press('Enter');
    await enviar(page);
    await expect(modal(page)).toContainText('Maths, English');
  });

  test('subir imagen', async ({ page }) => {
    await llenar(page);
    await page.setInputFiles('#uploadPicture', path.join(__dirname, '../data/imagen.png'));
    await enviar(page);
    await expect(modal(page)).toContainText('imagen.png');
  });

  test('seleccionar fecha de nacimiento', async ({ page }) => {
    await llenar(page);
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', '4');
    await page.selectOption('.react-datepicker__year-select', '1995');
    await page.click('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)');
    await enviar(page);
    await expect(modal(page)).toContainText('15 May,1995');
  });

  test('estado NCR y ciudad Delhi', async ({ page }) => {
    await llenar(page);
    await page.click('#state');
    await page.getByText('NCR', { exact: true }).click();
    await page.click('#city');
    await page.getByText('Delhi', { exact: true }).click();
    await enviar(page);
    await expect(modal(page)).toContainText('NCR Delhi');
  });

  test('estado Uttar Pradesh y ciudad Lucknow', async ({ page }) => {
    await llenar(page);
    await page.click('#state');
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.click('#city');
    await page.getByText('Lucknow', { exact: true }).click();
    await enviar(page);
    await expect(modal(page)).toContainText('Uttar Pradesh Lucknow');
  });

  test('cerrar el modal de confirmación', async ({ page }) => {
    await llenar(page);
    await enviar(page);
    await page.click('#closeLargeModal', { force: true });
    await expect(modal(page)).toHaveCount(0);
  });

  test('el modal muestra el nombre completo', async ({ page }) => {
    await llenar(page);
    await enviar(page);
    await expect(modal(page)).toContainText('Ana Pérez');
  });

  test('el modal muestra el email', async ({ page }) => {
    await llenar(page);
    await enviar(page);
    await expect(modal(page)).toContainText('ana@test.com');
  });

  test('la dirección es opcional', async ({ page }) => {
    await llenar(page, { address: null });
    await enviar(page);
    await expect(modal(page)).toBeVisible();
  });
});
