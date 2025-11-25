const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.productPageHeadline = "xpath=//*[@id='sadrzaj']//*[@class='row hidden-sm hidden-xs podaci']//*[@class='naslov']";
    this.addToCartButton = '#dugme-korpa';
    this.cartButton = '#korpa_broj';
    this.cartBadgeNumber = '#korpa_broj';
  }

  async isProductPageDisplayed() {
    return await this.isVisible(this.productPageHeadline);
  }

  async addToCart() {
    await this.click(this.addToCartButton);
    await this.sleep(2000);
  }

  async clickOnCartButton() {
    await this.click(this.cartButton);
  }

  async getCartCount() {
    try {
      await this.sleep(500);
      
      const countText = await this.getText(this.cartBadgeNumber);
      const trimmedText = countText.trim();
      
      if (trimmedText.includes('(') && trimmedText.includes(')')) {
        const match = trimmedText.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
      }
      
      if (/^\d+$/.test(trimmedText)) {
        return parseInt(trimmedText);
      }
      
      return 0;
    } catch {
      return 0;
    }
  }

  async wasItemAddedToCart(expectedCount) {
    const actualCount = await this.getCartCount();
    return actualCount === expectedCount;
  }
}

module.exports = ProductPage;