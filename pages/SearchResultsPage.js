const { expect } = require('@playwright/test');

/**
 * SearchResultsPage - Contains locators and methods for Amazon search results
 */
class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.resultsHeading = page.locator('h1, h2, span').filter({ hasText: /results/i }).first();
    this.firstProduct = page.locator('a[href*="/dp/"]').first();
  }

  /**
   * Wait for search results to load
   */
  async waitForSearchResultsToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for at least one product to be visible
    try {
      await this.firstProduct.first().waitFor({ state: 'visible', timeout: 15000 });
    } catch (e) {
      // If products don't load, just continue
      console.log('Products did not load within timeout');
    }
  }

  async clickOnFirstProduct() {
    const firstProductText = await this.firstProduct.textContent();
    await this.firstProduct.click();
    return firstProductText.trim();
  }


  

  

}

module.exports = { SearchResultsPage };
