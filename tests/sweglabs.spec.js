// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');
const { InventoryPage } = require('../pages/inventorypage');
const { CartPage } = require('../pages/cartpage');
const { CheckoutPage } = require('../pages/checkoutpage');
const { parseMoney } = require('../utils/money');

const USER = { username: 'standard_user', password: 'secret_sauce' };
const PRODUCT = { name: 'Sauce Labs Backpack', price: '$29.99' };
const CUSTOMER = { firstName: 'Maria', lastName: 'Silva', postalCode: '30130-000' };


test('logo visível na página de login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/.');
  const logo = page.locator('.login_logo');
  await expect(logo).toBeVisible(); 
});

test.describe('Sweg Labs - Login', () => {
  test('login com sucesso leva à lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventory.title).toHaveText('Products');
  });
});

test.describe('Sweg Labs - Compra (usuário logado)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('adiciona um produto ao carrinho', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addProductToCart(PRODUCT.name);
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.openCart();
    await expect(cart.title).toHaveText('Your Cart');
    await expect(cart.itemNames).toHaveText([PRODUCT.name]);
    await expect(cart.itemPrices).toHaveText([PRODUCT.price]);
  });

  test('valida as informações do pedido no checkout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProductToCart(PRODUCT.name);
    await inventory.openCart();
    await cart.proceedToCheckout();

    await checkout.fillCustomerInfo(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkout.continue();

    // Resumo do pedido
    await expect(checkout.title).toHaveText('Checkout: Overview');
    await expect(checkout.itemNames).toHaveText([PRODUCT.name]);
    await expect(checkout.itemPrices).toHaveText([PRODUCT.price]);
    await expect(checkout.subtotal).toHaveText(`Item total: ${PRODUCT.price}`);

    // Total = subtotal + imposto
    const subtotal = parseMoney(await checkout.subtotal.innerText());
    const tax = parseMoney(await checkout.tax.innerText());
    const total = parseMoney(await checkout.total.innerText());
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // Finaliza a compra
    await checkout.finish();
    await expect(checkout.title).toHaveText('Checkout: Complete!');
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });
});