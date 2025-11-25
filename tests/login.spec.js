const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const config = require('../config/config');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
  });

  test('Valid login test', async () => {
    await loginPage.login(config.validEmail, config.validPassword);
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn, 'Valid login proof should contain text "Odjava"').toBeTruthy();
  });

  test('Invalid login test', async () => {
    await loginPage.login(config.invalidEmail, config.invalidPassword);
    
    const isLoginFailed = await loginPage.isLoginFailed();
    expect(isLoginFailed, 'Invalid login proof should contain text "Prijava"').toBeTruthy();
  });

  test('Empty fields login test', async () => {
    await loginPage.login('', '');
    
    const isLoginFailed = await loginPage.isLoginFailed();
    expect(isLoginFailed, 'Failed login proof should contain text "Prijava" when fields are empty').toBeTruthy();
  });
});