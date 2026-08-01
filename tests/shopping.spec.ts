import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

test.describe('SauceDemo - Shopping & Checkout Flow Tests', () => {

  test('should login as standard_user and add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // 1. Log in using reusable helper
    await loginPage.loginAs('standard');

    // 2. Add an item
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    // 3. Verify cart badge shows 1
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should complete standard user checkout flow from inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // 1. Log in
    await loginPage.loginAs('standard');
    
    // 2. Inventory Page Actions
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    
    // 3. Cart Page Actions
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.clickCheckout();
    
    // 4. Checkout Page Actions
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    
    // 5. Assert completion
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

});
