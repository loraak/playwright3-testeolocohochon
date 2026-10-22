const base = require('@playwright/test');

exports.test = base.test.extend({
    page: async ({ page }, use) => {
        await page.route(/googlesyndication|doubleclick|adplus|ads/i, r => r.abort());
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