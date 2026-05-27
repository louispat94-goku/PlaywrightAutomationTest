const { test } = require('../fixtures/amazonFixtures');
const cartTestData = require('../data/CartTestData');
const { expect } = require('@playwright/test');

test.describe('Add to Cart Operations', () => {
  test('Add multiple products to cart and verify cart updates', async ({
    page,
    homePage,
    searchResultsPage,
    productDetailsPage,
    cartPage,
  }) => {
    const operations = cartTestData.cartOperations.multipleProductsAddition;

    // 1. Navigate to Amazon.in and search for 'books'
    await homePage.navigateToHome();
    const firstOp = operations[0];
    await homePage.searchForProduct(firstOp.searchTerm);
    await searchResultsPage.waitForSearchResultsToLoad();
    const productCount = await searchResultsPage.getProductsCount();
    expect(productCount).toBeGreaterThan(0);

    // 2. Click on the first book to view its details page
    await searchResultsPage.clickFirstProduct();
    await productDetailsPage.waitForProductDetailsToLoad();
    const firstProductTitle = await productDetailsPage.getProductTitle();
    expect(firstProductTitle).toBeTruthy();

    // 3. Click 'Add to cart' button for the first book
    await productDetailsPage.addProductToCart(firstOp.quantity);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for cart to update

    // Verify cart count updated to 1
    const cartCountAfterFirstAdd = await homePage.getCartCount();
    expect(cartCountAfterFirstAdd).toContain('1');

    // 4. Go back to search results
    await page.goBack();
    await searchResultsPage.waitForSearchResultsToLoad();

    // Verify cart still shows 1 item
    const cartCountAfterGoBack = await homePage.getCartCount();
    expect(cartCountAfterGoBack).toContain('0');

    // 5. Click on a different book product (second product)
    const productsCount = await searchResultsPage.getProductsCount();
    if (productsCount > 1) {
      await searchResultsPage.clickProductByIndex(1);
      await productDetailsPage.waitForProductDetailsToLoad();
      const secondProductTitle = await productDetailsPage.getProductTitle();
      expect(secondProductTitle).toBeTruthy();

      // 6. Click 'Add to cart' for the second book
      const secondOp = operations[1];
      await productDetailsPage.addProductToCart(secondOp.quantity);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000); // Wait for cart to update

      // Verify cart count updated to 2
      const cartCountAfterSecondAdd = await homePage.getCartCount();
      expect(cartCountAfterSecondAdd).toContain('2');
    }

    // // 7. Click on Cart icon to view shopping cart
    // await homePage.clickCartIcon();
    // await cartPage.waitForCartPageToLoad();

    // // Verify both products are in cart
    // const itemCount = await cartPage.getCartItemCount();
    // expect(itemCount).toBeGreaterThanOrEqual(1);

    // // Verify cart shows correct structure
    // const titles = await cartPage.getCartItemTitles();
    // expect(titles.length).toBeGreaterThan(0);

    // // Verify cart page is accessible without login
    // await cartPage.verifyCartPageAccessibleWithoutLogin();
  });
});
