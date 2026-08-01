import { Page, Locator } from '@playwright/test';

/**
 * Page Object representing the CartPage.
 * Contains selectors and actions for cart item verification and checkout.
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  /**
   * Clicks the checkout button to proceed to checkout step one.
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Finds and returns a Locator for a cart item by its name.
   */
  getCartItem(itemName: string): Locator {
    return this.page.locator('.cart_item', { hasText: itemName });
  }

  /**
   * Retrieves the quantity of a specific item in the cart.
   */
  async getCartItemQuantity(itemName: string): Promise<string | null> {
    const item = this.getCartItem(itemName);
    return await item.locator('.cart_quantity').textContent();
  }

  /**
   * Retrieves the price text of a specific item in the cart.
   */
  async getCartItemPrice(itemName: string): Promise<string | null> {
    const item = this.getCartItem(itemName);
    return await item.locator('.inventory_item_price').textContent();
  }
}
