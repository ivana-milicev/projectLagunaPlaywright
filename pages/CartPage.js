const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.nextButton = 'xpath=//*[text()="Dalje"]';
    this.removeProductButton = 'xpath=//*[contains(text(),"Brisanje")]';
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
    await this.sleep(500);
    await this.scrollToElement(this.nextButton);
    await this.click(this.nextButton);
  }

  async removeFromCart() {
    await this.closeGdprIfVisible();
    await this.sleep(500);
    
    try {
      await this.page.locator(this.removeProductButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.scrollToElement(this.removeProductButton);
      await this.click(this.removeProductButton);
    } catch (error) {
      await this.click('xpath=//a[contains(text(),"Brisanje")]');
    }
  }

  async clickOkToRemove() {
    await this.sleep(300);
    await this.click(this.okButton);
  }

  async isProductRemoved(productName) {
    try {
      await this.sleep(1000);
      await this.waitForHidden(this.productTitleLocator(productName));
      const productStillExists = await this.isPresent(this.productTitleLocator(productName));
      return !productStillExists;
    } catch {
      const productStillExists = await this.isPresent(this.productTitleLocator(productName));
      return !productStillExists;
    }
  }
}

module.exports = CartPage;