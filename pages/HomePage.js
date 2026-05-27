const { expect } = require('@playwright/test');

/**
 * HomePage - Contains locators and methods for Amazon India homepage
 */
class HomePage {
  constructor(page) {
    this.page = page;
    
    // Locators - updated for flexibility
    this.searchBar = page.locator('input#twotabsearchtextbox, input[placeholder*="Search"]');
    this.searchButton = page.locator('input[value="Go"]');
    this.cartIcon = page.locator('[id="nav-cart-count"]').first();
    this.cartIconCount = page.locator('[id="nav-cart-count"]');
    this.accountMenu = page.locator('a:has-text("Account")');
    this.primaryNavigation = page.locator('nav').first();
  }

  /**
   * Navigate to Amazon.in homepage
   */
  async navigateToHome() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for homepage to load
   */
  async waitForHomePageToLoad() {
    await this.searchBar.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Click on search bar
   */
  async clickSearchBar() {
    await this.searchBar.click();
    await this.page.waitForTimeout(500); // Small delay for focus
  }

  /**
   * Enter search term
   */
  async enterSearchTerm(searchTerm) {
    await this.searchBar.fill(searchTerm);
    await this.page.waitForTimeout(300);
  }

  /**
   * Search for a product
   */
  async searchForProduct(searchTerm) {
    await this.clickSearchBar();
    await this.enterSearchTerm(searchTerm);
    // Use keyboard Enter instead of clicking button
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

}

module.exports = { HomePage };
