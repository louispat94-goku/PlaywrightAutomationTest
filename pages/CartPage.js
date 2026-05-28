const { expect } = require('@playwright/test');

/**
 * CartPage - Contains locators and methods for Amazon shopping cart
 */
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartHeading = page.locator('h1, span:has-text(/Shopping Cart|Your items/)');
    this.cartItems = page.locator('div[data-name], div[id*="item"]').filter({ hasText: /Amazon/ });
    this.cartSubtotal = page.locator('text=Subtotal').first();
    this.emptyCartMessage = page.locator('text=Your Amazon Cart is empty');
    this.proceedToCheckoutButton = page.locator('button:has-text("Proceed to checkout"), button:has-text("Proceed to Buy")');
    this.cartTotal = page.locator('span:has-text(/₹|Rs|\$/)').first();
    this.itemCount = page.locator('[id="nav-cart-count"]');
    this.addedToCartText= page.locator('.a-size-medium-plus.a-color-base.sw-atc-text.a-text-bold');
    this.proceedToBuyButton = page.locator('input[name="proceedToRetailCheckout"]');
  }

  /**
   * Wait for cart page to load
   */
  async waitForCartPageToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get cart item count
   */
  async getCartItemCount() {
    return await this.itemCount.textContent();
  }

  /**
   * Verify product in cart
   */
  async verifyProductInCart(productName) {
    const productElement = this.page.locator(`text=${productName}`).first();
    await expect(productElement).toBeVisible();
  }

  /**
   * Get cart item titles
   */
  async getCartItemTitles() {
    const titles = [];
    const items = await this.cartItems.all();
    for (const item of items) {
      try {
        const title = await item.locator('a, span[id*="productTitle"]').first().textContent();
        if (title) titles.push(title.trim());
      } catch (e) {
        // Skip if element not found
      }
    }
    return titles;
  }

  /**
   * Remove item from cart by index
   */
  async removeItemFromCart(index) {
    const deleteButton = this.cartItems.nth(index).locator('button:has-text("Delete"), input[value="Delete"]');
    await deleteButton.click();
  }

  /**
   * Update item quantity by index
   */
  async updateItemQuantity(index, newQuantity) {
    const quantitySelect = this.cartItems.nth(index).locator('select, button[aria-label*="quantity"]');
    if (await quantitySelect.locator('select').count() > 0) {
      await quantitySelect.locator('select').selectOption(newQuantity.toString());
    } else {
      await quantitySelect.click();
    }
  }

  /**
   * Get cart subtotal
   */
  async getCartSubtotal() {
    const subtotalText = await this.cartSubtotal.textContent();
    return subtotalText?.match(/₹([\d,]+)/)?.[1];
  }

  /**
   * Click Proceed to Checkout button
   */
  async clickProceedToCheckout() {
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.click();
  }

  /**
   * Verify cart page accessible without login
   */
  async verifyCartPageAccessibleWithoutLogin() {
    const loginPrompt = this.page.locator('text=Sign in').filter({ hasText: 'required' });
    const isLoginRequired = await loginPrompt.isVisible().catch(() => false);
    expect(isLoginRequired).toBe(false);
  }

    /**
     Verify the Add to Cart message is displayed after clicking the Add to Cart button.
     */
    async verifyAddedToCartMessage() {
      await expect(this.addedToCartText).toBeVisible();
      const messageText = (await this.addedToCartText.textContent()).trim();
      expect(messageText).toContain('Added to Cart');
    }
  }

module.exports = { CartPage };
