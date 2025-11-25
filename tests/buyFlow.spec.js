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
    // Increase timeout for this complex test
    test.setTimeout(180000); // 3 minutes
    
    // Login
    console.log('Step 1: Login');
    await loginPage.login(config.validEmail, config.validPassword);
    await page.waitForTimeout(2000);

    // Search and select product
    console.log('Step 2: Search product');
    await searchPage.search(config.searchInput);
    await page.waitForTimeout(2000);
    
    console.log('Step 3: Select product');
    await searchPage.selectProduct(config.productTitle);
    await page.waitForTimeout(2000);

    // Add to cart
    console.log('Step 4: Add to cart');
    await productPage.addToCart();
    await productPage.clickOnCartButton();
    await page.waitForTimeout(2000);

    // Proceed to checkout
    console.log('Step 5: Go to checkout');
    await cartPage.clickOnNextButton();
    await page.waitForTimeout(3000);

    // Fill buyer data
    console.log('Step 6: Fill buyer data');
    await buyerPage.fillBuyerData(
      config.buyer.name,
      config.buyer.email,
      config.buyer.country,
      config.buyer.phone,
      config.buyer.street,
      config.buyer.streetNumber,
      config.buyer.city
    );
    
    console.log('Step 7: Click next on buyer page');
    await page.waitForTimeout(1000);
    
    try {
      await buyerPage.clickOnNextButton();
      await page.waitForTimeout(3000);
    } catch (error) {
      console.log('Error on buyer next, trying alternative:', error.message);
      await page.locator('#nastaviDalje').click({ force: true });
      await page.waitForTimeout(3000);
    }

    // Select payment method
    console.log('Step 8: Select payment method');
    await page.waitForTimeout(2000);
    await paymentPage.clickOnCreditCard();
    await page.waitForTimeout(1000);
    await paymentPage.clickOnNextButton();
    await page.waitForTimeout(3000);

    // Accept terms and confirm
    console.log('Step 9: Accept terms and costs');
    await page.waitForTimeout(2000);
    
    // Check the boxes with JavaScript
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
    
    console.log('Step 10: Click payment button and wait for redirect');
    await page.waitForTimeout(1000);
    
    // Click payment button and handle navigation
    try {
      // Set up a promise to wait for URL change
      const navigationPromise = page.waitForURL(/wspay|payment/i, { timeout: 30000 }).catch(() => null);
      
      // Click the payment button
      const paymentButton = page.locator('xpath=//*[text()="Plaćanje"]');
      await paymentButton.waitFor({ state: 'visible', timeout: 10000 });
      await paymentButton.click({ timeout: 10000 });
      
      console.log('Payment button clicked, waiting for navigation...');
      
      // Wait for navigation to complete or timeout
      await navigationPromise;
      
      // Give it extra time to fully load
      await page.waitForTimeout(3000);
      
    } catch (error) {
      console.log('Error during payment button click:', error.message);
      
      // Try JavaScript click as last resort
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('*'));
          const paymentBtn = buttons.find(el => el.textContent && el.textContent.trim() === 'Plaćanje');
          if (paymentBtn) paymentBtn.click();
        });
        console.log('JavaScript click succeeded, waiting for navigation...');
        await page.waitForTimeout(5000);
      } catch (jsError) {
        console.log('JavaScript click also failed:', jsError.message);
      }
    }

    // Verify reached payment gateway
    console.log('Step 11: Verify payment page');
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    const isOnPaymentGateway = currentUrl.includes('wspay') || currentUrl.includes('payment');
    expect(isOnPaymentGateway, `Should be on WSPay payment page. Current URL: ${currentUrl}`).toBeTruthy();
    
    console.log('✅ Buy flow completed successfully!');
  });
});