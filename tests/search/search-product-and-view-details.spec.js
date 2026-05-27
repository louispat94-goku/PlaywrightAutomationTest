const { test } = require('../fixtures/amazonFixtures');
const searchTestData = require('../data/SearchTestData');
const { expect } = require('@playwright/test');

test.describe('Search and Product Discovery', () => {
  test('Search for a product and view product details page', async ({
    page,
    homePage,
    searchResultsPage,
    productDetailsPage,
  }) => {
    // 1. Navigate to Amazon.in homepage
    await homePage.navigateToHome();
    await expect(homePage.getSearchBar()).toBeVisible();
    await expect(homePage.getCartIcon()).toBeVisible();

    // 2. Click on the search bar
    await homePage.clickSearchBar();
    await expect(homePage.getSearchBar()).toBeFocused();

    // 3. Type 'laptop' in the search bar
    const { searchTerm } = searchTestData.products.laptop;
    await homePage.enterSearchTerm(searchTerm);

    // 4. Press Enter to search
    await page.keyboard.press('Enter');
    await searchResultsPage.waitForSearchResultsToLoad();
    const productCount = await searchResultsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 5. Click on the first product in the search results
    await searchResultsPage.clickFirstProduct();
    await productDetailsPage.waitForProductDetailsToLoad();
    const productTitle = await productDetailsPage.getProductTitle();
    expect(productTitle).toBeTruthy();
    expect(productTitle.length).toBeGreaterThan(0);

    // 6. Verify product details are visible
    await expect(productDetailsPage.productPrice).toBeVisible();
    await expect(productDetailsPage.addToCartButton).toBeVisible();
  });
});
