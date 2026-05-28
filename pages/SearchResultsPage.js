const { expect } = require('@playwright/test');

/**
 * SearchResultsPage - Contains locators and methods for Amazon search results
 */
class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.resultsHeading = page.locator('h1, h2, span').filter({ hasText: /results/i }).first();
    // Find first product link in search results - target product result containers
    this.firstProduct = page.locator('div[data-component-type="s-search-result"] a[href*="/dp/"]').first();
  }

  /**
   * Wait for search results to load
   */
  async waitForSearchResultsToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for page content to render
    await this.page.waitForTimeout(2000);
  }

  async clickOnFirstProduct() {
    const firstProductText = await this.firstProduct.textContent();
    await this.firstProduct.click();
    return firstProductText.trim();
  }


  

  

}

module.exports = { SearchResultsPage };
