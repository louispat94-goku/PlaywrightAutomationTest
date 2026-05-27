const { expect } = require('@playwright/test');

/**
 * CategoryPage - Contains locators and methods for Amazon category pages
 */
class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryTitle = page.locator('.a-size-base.a-color-base.a-text-bold').first();
    this.subCategories = page.locator('a[data-template*="category"]');
    this.filterSidebar = page.locator('aside, div[role="complementary"]').first();
    // Use flexible selector that works for both search and category pages
    this.productGrid = page.locator('a[href*="/dp/"], [data-component-type="s-search-result"]');
    this.brandFilter = page.locator('text=Brand').first();
    this.priceFilter = page.locator('text=Price').first();
    this.ratingFilter = page.locator('text=Avg. Customer Review').first();
  }

  /**
   * Wait for category page to load
   */
  async waitForCategoryPageToLoad() {
    await expect(this.categoryTitle).toBeVisible({ timeout: 10000 });
  }

  /**
   * Get category title
   */
  async getCategoryTitle() {
    return await this.categoryTitle.textContent();
  }

  /**
   * Click on sub category
   */
  async clickSubCategory(subCategoryName) {
    const subCat = this.page.locator(`a:has-text("${subCategoryName}")`).first();
    await expect(subCat).toBeVisible();
    await subCat.click();
  }

  /**
   * Get product count in category
   */
  async getProductCount() {
    return await this.productGrid.count();
  }

  /**
   * Click product in category by index
   */
  async clickProductInCategory(index) {
    const product = this.productGrid.nth(index);
    await expect(product).toBeVisible();
    // Get the href and navigate to it instead of clicking (avoids new tab issue)
    const href = await product.getAttribute('href');
    if (href) {
      // Make absolute URL if relative
      const absoluteUrl = href.startsWith('http') ? href : 'https://www.amazon.in' + href;
      await this.page.goto(absoluteUrl, { waitUntil: 'domcontentloaded' });
    } else {
      // Fallback: just click if no href
      await product.click();
    }
  }

  /**
   * Verify filter sidebar visible
   */
  async verifyFilterSidebarVisible() {
    // Check for filters on the page - either in sidebar or elsewhere
    const sidebarVisible = await this.filterSidebar.isVisible().catch(() => false);
    const priceFilterVisible = await this.priceFilter.isVisible().catch(() => false);
    const hasFilters = sidebarVisible || priceFilterVisible;
    expect(hasFilters).toBeTruthy();
  }

  /**
   * Verify products are displayed
   */
  async verifyProductsDisplayed() {
    const count = await this.getProductCount();
    expect(count).toBeGreaterThan(0);
  }
}

module.exports = { CategoryPage };
