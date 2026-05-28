const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');    
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');


const homePageTestData = require('../data/HomePageTestData');

test.describe('Amazon India Homepage Tests', () => {
  test('Verify the product is displayed on the product details page add to cart.', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await homePage.navigateToHome();
    await homePage.waitForHomePageToLoad();
    await homePage.searchForProduct(homePageTestData.phone);
    await searchResultsPage.waitForSearchResultsToLoad();

    //Verify search results heading contains the search Product name.
    const resultsHeading = await searchResultsPage.resultsHeading.textContent();
    expect(resultsHeading).toContain(homePageTestData.phone); 
    
    // Click on the first product - navigate in same window
    // Remove target="_blank" if present to force same-window navigation
    await page.evaluate(() => {
      const link = document.querySelector('a[href*="/dp/"]');
      if (link) link.removeAttribute('target');
    });
    
    await Promise.all([
      //page.waitForURL(/\/dp\/[A-Z0-9]+/),
      page.waitForLoadState('domcontentloaded'),
      searchResultsPage.firstProduct.click()
    ]);
    
    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Verify we're on a product details page and it contains the searched product
    const pageTitle = await page.title();
    expect(pageTitle.toLowerCase()).toContain(homePageTestData.phone.toLowerCase());

    // Verify Add to Cart button is visible and enabled and click on it.
    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.waitForProductDetailsToLoad();
    await productDetailsPage.clickAddToCartButton();
  });
});