const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const homePageTestData = require('./data/HomePageTestData');

test.describe('Amazon India Homepage Tests', () => {
  test('Search for a product using the search bar', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await homePage.navigateToHome();
    await homePage.waitForHomePageToLoad();
    await homePage.searchForProduct(homePageTestData.phone);
    await searchResultsPage.waitForSearchResultsToLoad();

    //Verify search results heading contains the search Product name.
    const resultsHeading = await searchResultsPage.resultsHeading.textContent();
    expect(resultsHeading).toContain(homePageTestData.phone);    
  });
});