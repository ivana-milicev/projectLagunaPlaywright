const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.loginButton = 'xpath=//*[normalize-space(.)="Prijava"]';
    this.loginProof = 'xpath=//*[normalize-space(.)="Odjava"]';
    this.emailInputField = '#broj-f';
    this.passwordInputField = '#lozinka-f';
    this.submitButton = '#form-prijava-s';
  }

  async login(email, password) {
    await this.click(this.loginButton);
    await this.type(this.emailInputField, email);
    await this.type(this.passwordInputField, password);
    await this.click(this.submitButton);
    await this.sleep(1000);
  }

  async isLoginSuccessful() {
    return await this.isVisible(this.loginProof);
  }

  async isLoginFailed() {
    await this.sleep(500);
    return await this.isVisible(this.loginButton);
  }
}

module.exports = LoginPage;