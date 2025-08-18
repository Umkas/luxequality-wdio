import { removeDollarSign } from '../helpers/diff.help.js';
import Page from './page.js';


class InventoryPage extends Page {
    get shoppingCartContainer() { return $('.shopping_cart_container'); }
    get shoppingCartBadge() { return $('[data-test="shopping-cart-badge"]'); }
    get sortDropdown() { return $('[data-test="product-sort-container"]'); }


    async getProductContainerByItemTitleDataTest(dataTest) {
        return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class, "inventory_item")]`);
    }

    async getProductDataByTitleDataTest(dataTest) {
        const container = await this.getProductContainerByItemTitleDataTest(dataTest);
        await this.waitForElementDisplayed(container);
        return {
            name: await container.$('.inventory_item_name').getText(),
            price: removeDollarSign(await container.$('.inventory_item_price').getText()),
            addToCartBtn: await container.$('[data-test^="add-to-cart"]')
        };
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

    async sortBy(value) {
        await this.sortDropdown.selectByAttribute('value', value);
    }

    async getAllPrices() {
        const priceEls = await $$('.inventory_item_price');
        const prices = [];
        for (const el of priceEls) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        return prices;
    }

    async getAllNames() {
        const nameEls = await $$('.inventory_item_name');
        const names = [];
        for (const el of nameEls) {
            names.push(await el.getText());
        }
        return names;
    }

    open() {
        return super.open('inventory');
    }
}

export default new InventoryPage();
