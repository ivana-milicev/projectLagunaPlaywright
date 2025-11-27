const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const BuyerPage = require('../pages/BuyerPage');
const PaymentPage = require('../pages/PaymentPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const CheckoutPage = require('../pages/CheckoutPage');
const config = process.env.CI 
  ? require('../config/config.ci')
  : require('../config/config');

test.describe('Buy Flow Test @smoke', () => {
  let searchPage;
  let productPage;
  let cartPage;
  let buyerPage;
  let paymentPage;
  let confirmationPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
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
    test.setTimeout(120000);
    
    await searchPage.search(config.searchInput);
    await searchPage.selectProduct(config.productTitle);

    await productPage.addToCart();
    await productPage.clickOnCartButton();

    await cartPage.clickOnNextButton();

    await buyerPage.fillBuyerData(
      config.buyer.name,
      config.buyer.email,
      config.buyer.country,
      config.buyer.phone,
      config.buyer.street,
      config.buyer.streetNumber,
      config.buyer.city
    );
    await buyerPage.clickOnNextButton();

    await paymentPage.clickOnCreditCard();
    await paymentPage.clickOnNextButton();

    await confirmationPage.acceptTerms();
    await confirmationPage.acceptCosts();
    await confirmationPage.clickOnPaymentButton();

    try {
      // Strategy 1: Wait for URL change
      await page.waitForURL(/wspay|payment/i, { timeout: 30000 });
    } catch (error) {
      // Strategy 2: Wait for network to be idle (navigation might have happened)
      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch (error2) {
        // Strategy 3: Just check the URL after waiting
        await page.waitForTimeout(5000);
      }
    }
    
    const isOnPaymentGateway = await checkoutPage.isOnWSPayPage();
    
    expect(isOnPaymentGateway, 'Should be on WSPay payment page').toBeTruthy();
  });
});