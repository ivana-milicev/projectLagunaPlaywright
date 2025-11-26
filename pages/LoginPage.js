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
    
    // Wait for login response (either success or failure)
    // Give it time to process the login attempt
    await this.page.waitForTimeout(2000);
  }

  async isLoginSuccessful() {
    // Wait up to 5 seconds for the logout button to appear
    return await this.isVisible(this.loginProof);
  }

  async isLoginFailed() {
    // Wait for the page to process the login attempt
    // The login button should still be visible if login failed
    await this.page.waitForTimeout(1000);
    
    // Check if login button is still visible (indicating failed login)
    return await this.isVisible(this.loginButton);
  }
}

module.exports = LoginPage;