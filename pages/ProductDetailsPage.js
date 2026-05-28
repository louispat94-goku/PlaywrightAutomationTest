const { expect } = require('@playwright/test');

/**
 * ProductDetailsPage - Contains locators and methods for Amazon product details
 */
class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('//div[@class="a-section a-spacing-none a-padding-none"]//input//following-sibling::span[text()="Add to cart"]');
    
  }
  /**
   * Wait for product details page to load
   */
  async waitForProductDetailsToLoad() {
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  
  /**
   * Click Add to Cart button
   */
  async clickAddToCartButton() {
    //await expect(this.addToCartButton).toBeEnabled();
    await this.waitForProductDetailsToLoad();
    await this.addToCartButton.click();
  }

  /**
   * Verify Add to Cart button is visible and enabled
   */
  async verifyAddToCartButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  /**
   * Verify Added product count Value from the cart icon
   */
  async verifyAddedToCartCount(count) {
    const cartCount = await this.page.locator('[id="nav-cart-count"]').textContent();
    await expect(cartCount).toBe(count.toString());
  }


}

module.exports = { ProductDetailsPage };
