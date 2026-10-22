const { test, expect } = require('../fixtures');
const path = require('path');

test('llenar formulario completo', async ({ page }) => {
  await page.goto('/automation-practice-form');
  await page.fill('#firstName', 'Ana');
  await page.fill('#lastName', 'Pérez');
  await page.fill('#userEmail', 'ana@test.com');
  await page.click('label[for="gender-radio-2"]');
  await page.fill('#userNumber', '5512345678');

  await page.click('#dateOfBirthInput');
  await page.selectOption('.react-datepicker__month-select', '4');
  await page.selectOption('.react-datepicker__year-select', '1995');
  await page.click('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)');

  await page.fill('#subjectsInput', 'Maths');
  await page.keyboard.press('Enter');
  await page.click('label[for="hobbies-checkbox-1"]');
  await page.setInputFiles('#uploadPicture', path.join(__dirname, '../data/prueba.txt'));
  await page.fill('#currentAddress', 'Calle 1');

  await page.click('#state');
  await page.click('text=NCR');
  await page.click('#city');
  await page.click('text=Delhi');
  await page.click('#submit');

  await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
  await page.click('#closeLargeModal');
});

test('campos obligatorios vacíos', async ({ page }) => {
  await page.goto('/automation-practice-form');
  await page.click('#submit');
  await expect(page.locator('#firstName')).toHaveCSS('border-color', /220, 53, 69/);
});