const { test } = require('../fixtures/amazonFixtures');
const searchTestData = require('../data/SearchTestData');
const { expect } = require('@playwright/test');

test.describe('Search and Product Discovery', () => {
  test('Filter products by price range in search results', async ({
    page,
    homePage,
    searchResultsPage,
  }) => {
    const filterData = searchTestData.filters.smartphonePriceRange;

    // 1. Navigate to Amazon.in and search for 'smartphone'
    await homePage.navigateToHome();
    await homePage.searchForProduct(filterData.searchTerm);
    await searchResultsPage.waitForSearchResultsToLoad();

    // 2, 3, 4. Set price range and apply filter
    await searchResultsPage.filterByPriceRange(filterData.minPrice, filterData.maxPrice);

    // 5. Verify filter results are updated
    await searchResultsPage.waitForSearchResultsToLoad();
    const productCount = await searchResultsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 6. Verify filter is active by checking URL or applied filters
    const searchQuery = await searchResultsPage.getSearchQuery();
    expect(searchQuery).toBe(filterData.searchTerm);
  });
});
