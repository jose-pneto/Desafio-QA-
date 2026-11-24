class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  productCard(productName) {
    return this.page.getByTestId('inventory-item').filter({ hasText: productName });
  }

  async addProductToCart(productName) {
    await this.productCard(productName)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };