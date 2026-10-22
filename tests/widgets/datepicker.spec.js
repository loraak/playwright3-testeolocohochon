const { test, expect } = require('../fixtures');

test.describe('Date Picker', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/date-picker'); });

  test('la fecha tiene un valor por defecto', async ({ page }) => {
    await expect(page.locator('#datePickerMonthYearInput')).not.toHaveValue('');
  });

  test('escribir fecha manualmente', async ({ page }) => {
    const i = page.locator('#datePickerMonthYearInput');
    await i.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('12/25/2024');
    await page.keyboard.press('Enter');
    await expect(i).toHaveValue('12/25/2024');
  });

  test('elegir fecha con los selectores de mes y año', async ({ page }) => {
    await page.click('#datePickerMonthYearInput');
    await page.selectOption('.react-datepicker__month-select', '0');
    await page.selectOption('.react-datepicker__year-select', '2022');
    await page.click('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)');
    await expect(page.locator('#datePickerMonthYearInput')).toHaveValue('01/10/2022');
  });

  test('fecha y hora: se abre el calendario', async ({ page }) => {
    await page.click('#dateAndTimePickerInput');
    await expect(page.locator('.react-datepicker')).toBeVisible();
  });

  test('fecha y hora: elegir 12:00 AM', async ({ page }) => {
    await page.click('#dateAndTimePickerInput');
    await page.locator('.react-datepicker__time-list-item').first().click();
    await expect(page.locator('#dateAndTimePickerInput')).toHaveValue(/12:00 AM/);
  });

  test('navegar al mes siguiente', async ({ page }) => {
    await page.click('#dateAndTimePickerInput');
    const antes = await page.locator('.react-datepicker__current-month').textContent();
    await page.click('.react-datepicker__navigation--next');
    await expect(page.locator('.react-datepicker__current-month')).not.toHaveText(antes);
  });
});
