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
    await this.sleep(500);
    
    await this.type(this.nameInputField, name);
    await this.type(this.emailInputField, email);
    
    await this.click(this.countryDropdown);
    await this.sleep(300);
    await this.click(this.countryOptionLocator(country));
    await this.sleep(300);
    
    await this.type(this.telephoneInputField, phone);
    await this.type(this.streetInputField, street);
    await this.type(this.streetNumberInputField, streetNumber);
    
    await this.click(this.cityDropdown);
    await this.sleep(300);
    await this.click(this.cityOptionLocator(city));
    await this.sleep(300);
  }

  async clickOnNextButton() {
    await this.closeGdprIfVisible();
    await this.sleep(500);
    
    await this.page.locator(this.nextButton).waitFor({ state: 'visible', timeout: 10000 });
    
    try {
      await this.page.locator(this.nextButton).scrollIntoViewIfNeeded();
    } catch (error) {
      // Scroll error, continuing anyway
    }
    
    await this.sleep(500);
    
    try {
      await this.jsClick(this.nextButton);
    } catch (error) {
      await this.click(this.nextButton);
    }
  }
}

module.exports = BuyerPage;