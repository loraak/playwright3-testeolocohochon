const base = require('@playwright/test');

exports.test = base.test.extend({
  page: async ({ page }, use) => {
    // Bloquea anuncios que interceptan clics
    await page.route(/googlesyndication|doubleclick|adplus|adservice/i, r => r.abort());
    await page.addInitScript(() => {
      window.addEventListener('DOMContentLoaded', () => {
        const s = document.createElement('style');
        s.innerHTML = '#fixedban, footer, iframe[id^="google_ads"] { display:none !important; }';
        document.head.appendChild(s);
      });
    });
    await use(page);
  },
});
exports.expect = base.expect;
