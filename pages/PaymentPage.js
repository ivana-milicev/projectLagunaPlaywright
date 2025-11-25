const BasePage = require('./BasePage');

class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.paymentMethod = "xpath=//*[contains(text(),'Izaberite način plaćanja')]";
    this.creditCard = 'xpath=//*[text()="Platnom karticom - dostava kurirskom službom"]';
    this.nextButton = 'xpath=//*[text()="Dalje"]';
  }

  async isPaymentPageDisplayed() {
    return await this.isVisible(this.paymentMethod);
  }

  async clickOnCreditCard() {
    await this.click(this.creditCard);
  }

  async clickOnNextButton() {
    await this.closeGdprIfVisible();
    await this.scrollToElement(this.nextButton);
    await this.click(this.nextButton);
  }
}

module.exports = PaymentPage;