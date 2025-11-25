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
    await this.sleep(2000);  // Increased wait for cart to update (was 1000)
  }

  async clickOnCartButton() {
    await this.click(this.cartButton);
  }

  async getCartCount() {
    try {
      // Wait a bit for cart to update
      await this.sleep(500);
      
      const countText = await this.getText(this.cartBadgeNumber);
      const trimmedText = countText.trim();
      
      console.log('Cart badge text:', trimmedText);  // Debug output
      
      // If it contains parentheses like "Korpa (1)"
      if (trimmedText.includes('(') && trimmedText.includes(')')) {
        const match = trimmedText.match(/\((\d+)\)/);
        const count = match ? parseInt(match[1]) : 0;
        console.log('Extracted from parentheses:', count);
        return count;
      }
      
      // If it's just a number like "1"
      if (/^\d+$/.test(trimmedText)) {
        const count = parseInt(trimmedText);
        console.log('Direct number:', count);
        return count;
      }
      
      console.log('No valid number found, returning 0');
      return 0;
    } catch (error) {
      console.log('Error getting cart count:', error.message);
      return 0;
    }
  }

  async wasItemAddedToCart(expectedCount) {
    const actualCount = await this.getCartCount();
    console.log(`Expected: ${expectedCount}, Actual: ${actualCount}`);
    return actualCount === expectedCount;
  }
}

module.exports = ProductPage;