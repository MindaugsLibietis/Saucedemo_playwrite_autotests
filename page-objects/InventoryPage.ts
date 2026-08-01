import { Page, Locator } from '@playwright/test';

/**
 * Page Object representing the InventoryPage (Products page).
 * Contains product lists, sorting controls, and burger menu interactions.
 */
export class InventoryPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetLink = page.locator('#reset_sidebar_link');
  }

  /**
   * Adds an item to the cart by its name.
   * e.g., 'Sauce Labs Backpack' -> '[data-test="add-to-cart-sauce-labs-backpack"]'
   */
  async addItemToCart(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    const addButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addButton.click();
  }

  /**
   * Removes an item from the cart by its name.
   */
  async removeItemFromCart(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
    await removeButton.click();
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart() {
    await this.cartButton.click();
  }

  /**
   * Selects sorting option from the dropdown list.
   * @param optionValue - e.g., 'az', 'za', 'lohi', 'hilo'
   */
  async selectSortOption(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
  }

  /**
   * Clicks on a product title to open its detail page.
   */
  async clickProductTitle(itemName: string) {
    await this.page.locator('.inventory_item_name', { hasText: itemName }).click();
  }

  /**
   * Opens the burger menu side panel and waits for logout link to be visible.
   */
  async openBurgerMenu() {
    await this.burgerMenuButton.click();
    // Wait for sidebar content to be visible/transitioned (using logout link as anchor)
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  /**
   * Clicks logout link in side menu.
   */
  async clickLogout() {
    await this.logoutLink.dispatchEvent('click');
  }

  /**
   * Clicks reset app state in side menu.
   */
  async clickResetState() {
    await this.resetLink.dispatchEvent('click');
  }
}
