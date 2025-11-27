const BasePage = require('./BasePage');

class BuyerPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.nameInputField = '#ime-k';
    this.emailInputField = '#email-k';
    this.countryDropdown = '#id_drzave-selectized';
    this.telephoneInputField = '#telefon-k';
    this.streetInputField = '#ulica-pomoc';
    this.streetNumberInputField = '#broj-k';
    this.cityDropdown = '#mesto-k-select-selectized';
    this.nextButton = '#nastaviDalje';
  }

  countryOptionLocator(country) {
    return `xpath=//div[contains(@class, 'selectize-dropdown')]//div[text()='${country}']`;
  }

  cityOptionLocator(city) {
    return `xpath=//div[@class='option' and contains(text(),'${city}')]`;
  }

  async fillBuyerData(name, email, country, phone, street, streetNumber, city) {
    await this.type(this.nameInputField, name);
    await this.type(this.emailInputField, email);
    
    await this.click(this.countryDropdown);
    const countryOption = this.countryOptionLocator(country);
    await this.page.locator(countryOption).waitFor({ state: 'visible' });
    await this.click(countryOption);
  
    await this.type(this.telephoneInputField, phone);
    await this.type(this.streetInputField, street);
    await this.type(this.streetNumberInputField, streetNumber);
  
    await this.click(this.cityDropdown);
    const cityOption = this.cityOptionLocator(city);
    await this.page.locator(cityOption).waitFor({ state: 'visible' });
    await this.click(cityOption);
  }

  async clickOnNextButton() {
    await this.closeGdprIfVisible();
    await this.waitForVisible(this.nextButton, 10000);
    await this.scrollToElement(this.nextButton);
    await this.click(this.nextButton);
  }
}

module.exports = BuyerPage;