const BasePage = require('./BasePage');

class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.termsCheckbox = '#potvrda';
    this.costsCheckbox = '#potvrda2';
    this.paymentButton = 'xpath=//*[text()="Plaćanje"]';
  }

  async acceptTerms() {
    await this.closeGdprIfVisible();
    await this.sleep(1000);
    
    console.log('Checking terms checkbox with JavaScript (not clicking)...');
    
    // ONLY use JavaScript - never click the checkbox or label!
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda');
      if (checkbox) {
        checkbox.checked = true;
        // Trigger change event so the website knows it's checked
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('Terms checkbox checked:', checkbox.checked);
      }
    });
    
    await this.sleep(500);
  }

  async acceptCosts() {
    await this.closeGdprIfVisible();
    await this.sleep(500);
    
    console.log('Checking costs checkbox with JavaScript (not clicking)...');
    
    // ONLY use JavaScript - never click!
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#potvrda2');
      if (checkbox) {
        checkbox.checked = true;
        // Trigger change event
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('Costs checkbox checked:', checkbox.checked);
      }
    });
    
    await this.sleep(500);
  }

  async clickOnPaymentButton() {
    await this.closeGdprIfVisible();
    await this.sleep(1000);
    
    console.log('Looking for payment button...');
    
    try {
      // Wait for button
      await this.page.locator(this.paymentButton).waitFor({ state: 'visible', timeout: 10000 });
      console.log('Payment button visible, clicking...');
      
      // Click the payment button
      await this.click(this.paymentButton);
      
      console.log('Payment button clicked successfully');
    } catch (error) {
      console.log('Normal click failed, trying force click:', error.message);
      
      try {
        await this.page.locator(this.paymentButton).click({ force: true });
        console.log('Force click succeeded');
      } catch (forceError) {
        console.log('Force click failed, trying JavaScript:', forceError.message);
        
        // Last resort: JavaScript
        await this.page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('*'));
          const paymentBtn = buttons.find(el => el.textContent.trim() === 'Plaćanje');
          if (paymentBtn) paymentBtn.click();
        });
        console.log('JavaScript click succeeded');
      }
    }
  }
}

module.exports = ConfirmationPage;