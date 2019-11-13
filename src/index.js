const Browser = require('./launch.js');

const browser = new Browser('myuser', 'mypass');

void(async () => {
  await browser.renovate();
})();
