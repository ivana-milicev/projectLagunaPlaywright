const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async isOnWSPayPage() {
    const url = this.page.url();
    return url.includes('wspay');
  }
}

module.exports = CheckoutPage;