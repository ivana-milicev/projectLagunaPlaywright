const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.searchInputField = '#pretraga_rec';
    this.resultsPageHeadline = "xpath=//*[@id='spisak-knjiga-knjige']//*[@class='naslov-sredina']";
  }

  productTitleLocator(product) {
    return `xpath=//*[@class='naslov' and contains(text(),'${product}')]`;
  }

  async search(searchText) {
    await this.type(this.searchInputField, searchText);
    await this.page.locator(this.searchInputField).press('Enter');
  }

  async isSearchSuccessful() {
    return await this.isVisible(this.resultsPageHeadline);
  }

  async selectProduct(productName) {
    await this.waitForVisible(this.productTitleLocator(productName));
    await this.click(this.productTitleLocator(productName));
  }
}

module.exports = SearchPage;