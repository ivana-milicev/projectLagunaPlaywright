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
    // Small wait for the cart update animation/request
    await this.page.waitForTimeout(1000);
  }

  async clickOnCartButton() {
    await this.click(this.cartButton);
  }

  async getCartCount() {
    try {
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
    // Use Playwright's expect with polling - BEST PRACTICE
    // This will automatically retry until the condition is met or timeout
    try {
      await this.page.waitForFunction(
        async (args) => {
          const badge = document.querySelector(args.selector);
          if (!badge) return false;
          
          const text = badge.textContent.trim();
          let count = 0;
          
          if (text.includes('(') && text.includes(')')) {
            const match = text.match(/\((\d+)\)/);
            count = match ? parseInt(match[1]) : 0;
          } else if (/^\d+$/.test(text)) {
            count = parseInt(text);
          }
          
          return count === args.expectedCount;
        },
        { selector: this.cartBadgeNumber, expectedCount },
        { timeout: 10000 } // Wait up to 10 seconds
      );
      return true;
    } catch {
      // If timeout, do final check
      const finalCount = await this.getCartCount();
      return finalCount === expectedCount;
    }
  }
}

module.exports = ProductPage;