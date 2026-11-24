class CartPage {
    constructor(page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.itemPrices = page.getByTestId('inventory-item-price');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
module.exports = { CartPage };