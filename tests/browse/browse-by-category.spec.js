const { test } = require('../fixtures/amazonFixtures');
const categoryTestData = require('../data/CategoryTestData');
const { expect } = require('@playwright/test');

test.describe('Category Browsing', () => {
  test('Browse products by clicking on category from homepage', async ({
    page,
    categoryPage,
    productDetailsPage,
  }) => {
    const electronicsData = categoryTestData.categories.electronics;

    // 1. Navigate to Electronics category page
    await page.goto(electronicsData.url);
    await categoryPage.waitForCategoryPageToLoad();
    const categoryTitle = await categoryPage.getCategoryTitle();
    expect(categoryTitle).toBeTruthy();

    // 2. Navigate to Mobile Accessories subcategory
    const mobileData = categoryTestData.categories.mobileCategory;
    await page.goto(mobileData.url);
    await categoryPage.waitForCategoryPageToLoad();

    // 3. Verify category page loaded correctly
    const newCategoryTitle = await categoryPage.getCategoryTitle();
    expect(newCategoryTitle).toBeTruthy();

    // 4. Verify filters and product grid are visible
    await categoryPage.verifyFilterSidebarVisible();
    await categoryPage.verifyProductsDisplayed();
    const productCount = await categoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 5. Click on any product to view its details
    if (productCount > 0) {
      await categoryPage.clickProductInCategory(0);
      await productDetailsPage.waitForProductDetailsToLoad();
      await expect(productDetailsPage.addToCartButton).toBeVisible();
    }
  });
});
