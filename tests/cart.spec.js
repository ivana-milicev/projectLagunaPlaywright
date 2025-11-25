const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const config = require('../config/config');

test.describe('Cart Tests', () => {
  let searchPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await page.goto(config.baseUrl);
  });

  test('Is product in cart test', async () => {
    await searchPage.search(config.searchInput);
    await searchPage.selectProduct(config.productTitle);

    const cartCountBefore = await productPage.getCartCount();
    
    await productPage.addToCart();
    
    const wasAdded = await productPage.wasItemAddedToCart(cartCountBefore + 1);
    expect(wasAdded, 'Product was not added to cart - count didn\'t increase!').toBeTruthy();
    
    await productPage.clickOnCartButton();

    const isProductInCart = await cartPage.isProductInCart(config.productTitle);
    expect(isProductInCart, 'The selected product should be in cart').toBeTruthy();
  });

  test('Remove from cart test', async () => {
    await searchPage.search(config.searchInput);
    await searchPage.selectProduct(config.productTitle);

    await productPage.addToCart();
    await productPage.clickOnCartButton();

    await cartPage.removeFromCart();
    await cartPage.clickOkToRemove();

    const isRemoved = await cartPage.isProductRemoved(config.productTitle);
    expect(isRemoved, 'Product was NOT removed from the cart!').toBeTruthy();
  });
});