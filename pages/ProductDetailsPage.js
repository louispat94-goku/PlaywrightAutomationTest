const { expect } = require('@playwright/test');

/**
 * ProductDetailsPage - Contains locators and methods for Amazon product details
 */
class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('[id="title"]').first();
    this.productPrice = page.locator('span.a-price-whole, span[data-a-color="price"]').first();
    this.productRating = page.locator('span[data-icon-name="star-filled"], i.a-icon-star');
    this.productImage = page.locator('img[alt*="product"], img[alt*="images"]').first();
    this.addToCartButton = page.locator('[id="add-to-cart-button"]').first();
    this.productDescription = page.locator('div#feature-bullets, div[id*="feature"]');
    this.relatedProducts = page.locator('text=Frequently bought together');
    this.quantitySelector = page.locator('select#quantity, select[id*="quantity"]');
  }

  /**
   * Wait for product details page to load
   */
  async waitForProductDetailsToLoad() {
    await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Get product title
   */
  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  /**
   * Get product price
   */
  async getProductPrice() {
    const priceText = await this.productPrice.textContent();
    return priceText?.replace(/[^0-9.]/g, '');
  }

  /**
   * Get product rating count
   */
  async getProductRating() {
    return await this.productRating.count();
  }

  /**
   * Verify product details are visible
   */
  async verifyProductDetailsVisible() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  /**
   * Click Add to Cart button
   */
  async clickAddToCartButton() {
    //await expect(this.addToCartButton).toBeEnabled();
    await this.addToCartButton.click();
  }

  /**
   * Set quantity
   */
  async setQuantity(quantity) {
    if (await this.quantitySelector.isVisible().catch(() => false)) {
      await this.quantitySelector.selectOption(quantity.toString());
    }
  }

  /**
   * Add product to cart
   */
  async addProductToCart(quantity = 1) {
    await this.setQuantity(quantity);
    await this.clickAddToCartButton();
  }

  /**
   * Verify product description visible
   */
  async verifyProductDescription() {
    await expect(this.productDescription).toBeVisible();
  }

  /**
   * Verify Add to Cart button is visible and enabled
   */
  async verifyAddToCartButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }
}

module.exports = { ProductDetailsPage };
