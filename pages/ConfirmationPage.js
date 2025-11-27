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
    
    // Scroll to button
    await button.scrollIntoViewIfNeeded();
    await this.sleep(500);
    
    // Try multiple click strategies
    try {
      // Strategy 1: Normal click
      await button.click({ timeout: 5000 });
    } catch (error) {
      try {
        // Strategy 2: Force click
        await button.click({ force: true, timeout: 5000 });
      } catch (error2) {
        // Strategy 3: JavaScript click
        await this.page.evaluate(() => {
          const btn = document.evaluate("//*[text()='Plaćanje']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (btn) btn.click();
        });
      }
    }

        await this.sleep(2000);

  }
}

module.exports = ConfirmationPage;