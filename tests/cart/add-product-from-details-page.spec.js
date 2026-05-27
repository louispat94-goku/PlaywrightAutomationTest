const { test } = require('../fixtures/amazonFixtures');
const cartTestData = require('../data/CartTestData');
const { expect } = require('@playwright/test');

test.describe('Add to Cart Operations', () => {
  test('Add product to cart from product details page', async ({
    page,
    homePage,
    searchResultsPage,
    productDetailsPage,
    cartPage,
  }) => {
    const { searchTerm, quantity } = cartTestData.cartOperations.singleProductAddition;

    // 1. Navigate to Amazon.in and search for 'headphones'
    await homePage.navigateToHome();
    await homePage.searchForProduct(searchTerm);
    await searchResultsPage.waitForSearchResultsToLoad();
    const productCountBeforeClick = await searchResultsPage.getProductsCount();
    expect(productCountBeforeClick).toBeGreaterThan(0);

    // 2. Click on any headphones product to view its details
    await searchResultsPage.clickFirstProduct();
    await productDetailsPage.waitForProductDetailsToLoad();
    const productTitle = await productDetailsPage.getProductTitle();
    expect(productTitle).toBeTruthy();
    expect(productTitle.length).toBeGreaterThan(0);

    // 3. Verify the 'Add to cart' button is present and clickable
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.addToCartButton).toBeEnabled();

    // 4. Click the 'Add to cart' button
    await productDetailsPage.addProductToCart(quantity);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for cart to update

    // 5. Click on the Cart icon in the header to view cart
    await homePage.clickCartIcon();
    await cartPage.waitForCartPageToLoad();

    // Verify cart is not empty
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(false);

    // Verify items are in cart
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toContain('1');

    // 6. Verify that user is not required to login to continue
    await cartPage.verifyCartPageAccessibleWithoutLogin();
  });
});
