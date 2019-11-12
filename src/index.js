const Browser = require('./launch.js');

const browser = new Browser();

void(async () => {
  const b = await browser.instance;

})();
