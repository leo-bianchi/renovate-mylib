const puppeteer = require('puppeteer');

const url = 'https://www2.fiap.com.br';

let Browser = class Browser {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.url = url;
  }
  async doLogin() {
    const _page = await this.getInstance();
    await _page.waitForSelector('input[type="submit"]');
    await _page.type('input#usuario', this.username);
    await _page.type('input#senha', this.password);
    await _page.click('input[type="submit"]');
    return _page;
  }
  async getPage() {
    return await this.doLogin();
  }
  async getInstance() {
    const _browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--aggressive-cache-discard'
      ],
      headless: false
    });
    const _page = await _browser.newPage();
    await _page.goto(this.url);
    const _pages = await _browser.pages();
    await _pages[0].close();
    return _page;
  }
  async renovate() {
    const _p = await this.getPage()
    await _p.waitForSelector('a[href="#servicos"]');
    await _p.$eval('a[href="#servicos"]', elem => elem.click());
    await _p.waitForSelector('div#servicos');
    await _p.$eval('div#servicos > a:nth-child(3)', elem => elem.click());
    await _p.waitForSelector('a[href="/programas/login/alunos_2004/biblioteca/meus_emprestimos.asp"]');
    await _p.$eval('a[href="/programas/login/alunos_2004/biblioteca/meus_emprestimos.asp"]', elem => elem.click());
    await _p.waitForSelector('input[type=button]');
    await _p.$eval('input[type=button]:first-child', elem => elem.click());
    await _p.$eval('input[type=button]:last-child', elem => elem.click());
    await _p.close();
  }
}

module.exports = Browser;
