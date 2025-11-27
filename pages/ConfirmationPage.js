const BasePage = require('./BasePage');

class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.termsCheckbox = '#potvrda';
    this.costsCheckbox = '#potvrda2';
    this.paymentButton = 'xpath=//*[text()="Plaćanje"]';
  }

  async acceptTerms() {
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda');
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  async acceptCosts() {
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda2');
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  async clickOnPaymentButton() {
    await this.closeGdprIfVisible();
    
    const button = this.page.locator(this.paymentButton);
    await button.waitFor({ state: 'visible', timeout: 10000 });
    
    try {
      await button.click();
    } catch (error) {
      // Fallback to force click
      await button.click({ force: true });
    }
  }
}

module.exports = ConfirmationPage;