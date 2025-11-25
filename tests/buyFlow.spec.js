const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const SearchPage = require('../pages/SearchPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const BuyerPage = require('../pages/BuyerPage');
const PaymentPage = require('../pages/PaymentPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const CheckoutPage = require('../pages/CheckoutPage');
const config = require('../config/config');

test.describe('Buy Flow Test', () => {
  let loginPage;
  let searchPage;
  let productPage;
  let cartPage;
  let buyerPage;
  let paymentPage;
  let confirmationPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    buyerPage = new BuyerPage(page);
    paymentPage = new PaymentPage(page);
    confirmationPage = new ConfirmationPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await page.goto(config.baseUrl);
  });

  test('Complete buy flow test', async ({ page }) => {
    test.setTimeout(180000);
    
    await loginPage.login(config.validEmail, config.validPassword);
    await page.waitForTimeout(2000);

    await searchPage.search(config.searchInput);
    await page.waitForTimeout(2000);
    
    await searchPage.selectProduct(config.productTitle);
    await page.waitForTimeout(2000);

    await productPage.addToCart();
    await productPage.clickOnCartButton();
    await page.waitForTimeout(2000);

    await cartPage.clickOnNextButton();
    await page.waitForTimeout(3000);

    await buyerPage.fillBuyerData(
      config.buyer.name,
      config.buyer.email,
      config.buyer.country,
      config.buyer.phone,
      config.buyer.street,
      config.buyer.streetNumber,
      config.buyer.city
    );
    
    await page.waitForTimeout(1000);
    
    try {
      await buyerPage.clickOnNextButton();
      await page.waitForTimeout(3000);
    } catch (error) {
      await page.locator('#nastaviDalje').click({ force: true });
      await page.waitForTimeout(3000);
    }

    await page.waitForTimeout(2000);
    await paymentPage.clickOnCreditCard();
    await page.waitForTimeout(1000);
    await paymentPage.clickOnNextButton();
    await page.waitForTimeout(3000);

    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      const terms = document.querySelector('#potvrda');
      const costs = document.querySelector('#potvrda2');
      if (terms) {
        terms.checked = true;
        terms.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (costs) {
        costs.checked = true;
        costs.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    
    await page.waitForTimeout(1000);
    
    try {
      const navigationPromise = page.waitForURL(/wspay|payment/i, { timeout: 30000 }).catch(() => null);
      
      const paymentButton = page.locator('xpath=//*[text()="Plaćanje"]');
      await paymentButton.waitFor({ state: 'visible', timeout: 10000 });
      await paymentButton.click({ timeout: 10000 });
      
      await navigationPromise;
      await page.waitForTimeout(3000);
      
    } catch (error) {
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('*'));
          const paymentBtn = buttons.find(el => el.textContent && el.textContent.trim() === 'Plaćanje');
          if (paymentBtn) paymentBtn.click();
        });
        await page.waitForTimeout(5000);
      } catch (jsError) {
      }
    }

    const currentUrl = page.url();
    const isOnPaymentGateway = currentUrl.includes('wspay') || currentUrl.includes('payment');
    expect(isOnPaymentGateway, `Should be on WSPay payment page. Current URL: ${currentUrl}`).toBeTruthy();
  });
});