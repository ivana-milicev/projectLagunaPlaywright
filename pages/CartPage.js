const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.nextButton = 'xpath=//*[text()="Dalje"]';
    this.removeProductButton = 'xpath=//a[contains(@class, "korpa-brisanje")]';
    this.okButton = 'xpath=//*[text()="OK"]';
    this.emptyCartMessage = '.cart-empty, .empty-msg';
  }

  productTitleLocator(product) {
    return `xpath=//*[@class='naslov' and contains(text(),'${product}')]`;
  }

  async isProductInCart(productName) {
    return await this.isVisible(this.productTitleLocator(productName));
  }

  async clickOnNextButton() {
    await this.closeGdprIfVisible();
    await this.scrollToElement(this.nextButton);
    await this.click(this.nextButton);
  }

  async removeFromCart() {
    await this.closeGdprIfVisible();
    
    try {
      await this.page.locator(this.removeProductButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.scrollToElement(this.removeProductButton);
      await this.click(this.removeProductButton);
    } catch (error) {
      await this.click(this.removeProductButton);
    }
  }

  async clickOkToRemove() {
    await this.waitForVisible(this.okButton);
    await this.click(this.okButton);
  }

  async isProductRemoved(productName) {
    try {
      await this.waitForHidden(this.productTitleLocator(productName), 5000);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = CartPage;