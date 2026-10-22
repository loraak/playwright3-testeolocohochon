// Uso:  node volcado.js   (desde la raíz del proyecto)
const { chromium } = require('@playwright/test');

const objetivos = [
  { ruta: '/checkbox',  texto: 'Home',                  sube: 4 },
  { ruta: '/accordian', texto: 'What is Lorem Ipsum?',  sube: 3 },
  { ruta: '/books',     texto: 'Git Pocket Guide',      sube: 5 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const { ruta, texto, sube } of objetivos) {
    console.log(`\n===== ${ruta} (ancestro ${sube} niveles sobre "${texto}") =====`);
    try {
      await page.goto('https://demoqa.com' + ruta, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2500);
      const html = await page.getByText(texto, { exact: true }).first().evaluate((el, n) => {
        let e = el; for (let i = 0; i < n && e.parentElement; i++) e = e.parentElement;
        return e.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g, '<svg/>');
      }, sube);
      console.log(html.slice(0, 2500));
    } catch (e) {
      console.log('No se pudo volcar:', e.message.split('\n')[0]);
    }
  }
  await browser.close();
})();