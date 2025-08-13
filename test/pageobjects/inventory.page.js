import Page from './page.js';

class InventoryPage extends Page {
    async getProductContainerByItemTitleDataTest(dataTest) {
        return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class, "inventory_item")]`);
    }

    async getProductDataByTitleDataTest(dataTest) {
        const container = await this.getProductContainerByItemTitleDataTest(dataTest);
        await this.waitForElementDisplayed(container);
        return {
            name: await container.$('.inventory_item_name').getText(),
            price: this.removeDollarSign(await container.$('.inventory_item_price').getText()),
            addToCartBtn: await container.$('[data-test^="add-to-cart"]')
        };
    }

    get shoppingCartContainer() {
        return $('.shopping_cart_container');
    }

    get shoppingCartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    async getCartItemCount() {
        return await this.shoppingCartBadge.getText();
    }

    async openCart() {
        await this.shoppingCartContainer.click();
    }

    async addItemToCart(dataTest) {
        const product = await this.getProductDataByTitleDataTest(dataTest);
        await product.addToCartBtn.click();
        return product;
    }

    open() {
        return super.open('inventory');
    }
}

export default new InventoryPage();
