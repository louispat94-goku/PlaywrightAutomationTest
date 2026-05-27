const { test: base } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { SearchResultsPage } = require('../../pages/SearchResultsPage');
const { ProductDetailsPage } = require('../../pages/ProductDetailsPage');
const { CartPage } = require('../../pages/CartPage');
const { CategoryPage } = require('../../pages/CategoryPage');

/**
 * Custom fixtures for Amazon tests
 */
const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await homePage.waitForHomePageToLoad();
    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },

  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);
    await use(categoryPage);
  },

  amazonPages: async ({ page }, use) => {
    const pages = {
      homePage: new HomePage(page),
      searchResultsPage: new SearchResultsPage(page),
      productDetailsPage: new ProductDetailsPage(page),
      cartPage: new CartPage(page),
      categoryPage: new CategoryPage(page),
    };
    await use(pages);
  },
});

module.exports = { test };
