const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const config = require('../config/config');

test.describe('Search Tests', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto(config.baseUrl);
  });

  test('Search test', async () => {
    await searchPage.search(config.searchInput);
    
    const isSearchSuccessful = await searchPage.isSearchSuccessful();
    expect(isSearchSuccessful, 'Search results headline should be visible!').toBeTruthy();
  });
});