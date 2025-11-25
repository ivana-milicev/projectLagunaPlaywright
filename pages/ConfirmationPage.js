const BasePage = require('./BasePage');

class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.termsCheckbox = '#potvrda';
    this.costsCheckbox = '#potvrda2';
    this.paymentButton = 'xpath=//*[text()="Plaćanje"]';
  }

  async acceptTerms() {
    await this.closeGdprIfVisible();
    await this.sleep(1000);
    
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda');
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    
    await this.sleep(500);
  }

  async acceptCosts() {
    await this.closeGdprIfVisible();
    await this.sleep(500);
    
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda2');
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    
    await this.sleep(500);
  }

  async clickOnPaymentButton() {
    await this.closeGdprIfVisible();
    await this.sleep(1000);
    
    try {
      await this.page.locator(this.paymentButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.click(this.paymentButton);
    } catch (error) {
      try {
        await this.page.locator(this.paymentButton).click({ force: true });
      } catch (forceError) {
        await this.page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('*'));
          const paymentBtn = buttons.find(el => el.textContent.trim() === 'Plaćanje');
          if (paymentBtn) paymentBtn.click();
        });
      }
    }
  }
}

module.exports = ConfirmationPage;