import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {

    // get addToCartBackpackBtn() {
    //     return $('[data-test="add-to-cart-sauce-labs-backpack"]');
    // }

    // get addToCartBikeLigthBtn() {
    //     return $('[data-test="add-to-cart-sauce-labs-bike-light"]');
    // }

    // get inventoryItemName() {
    //     return $('[data-test="add-to-cart-sauce-labs-bike-light"]');
    // }
    // get inventoryItemPrice() {
    //     return $('[data-test="add-to-cart-sauce-labs-bike-light"]');
    // }

    async getProductContainerByItemTitleDataTest(dataTest) {
        // return $(`[data-test="${dataTest}"]`).$('..').$('..').$('..');
        return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class, "inventory_item")]`);
    }

    async getProductDataByTitleDataTest(dataTest) {
        const container = await this.getProductContainerByItemTitleDataTest(dataTest);

        return {
            name: await container.$('.inventory_item_name').getText(),
            price: await container.$('.inventory_item_price').getText(),
            addToCartBtn: await container.$('[data-test^="add-to-cart"]')
            // addToCartBtn: await container.$('button')
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



    open() {
        return super.open('inventory');
    }
}

export default new InventoryPage();
