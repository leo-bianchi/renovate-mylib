const puppeteer = require('puppeteer');
const portal = 'https://www2.fiap.com.br';

module.exports = class Browser {
  constructor() {};
  get instance() {
    return this.getInstance();
  }
  doLogin(a) {
    return (user) => {
      return async (password) => {
        await a.type('input#usuario', user);
        await a.type('input#senha', password);
        await a.click('input[type="submit"]');
      }
    }
  }
  async getInstance() {
    const b = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--aggressive-cache-discard'
      ],
      headless: false
    });
    const p = await b.newPage();

    await p.goto(portal);

    await p.waitForSelector('input[type="submit"]');

    this.doLogin(p)('myuser')('mypass');
  }
}
