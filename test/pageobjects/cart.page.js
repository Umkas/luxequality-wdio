import Page from './page.js';

class CartPage extends Page {

    get title() {
        return $('[data-test="title"]');
    }

    get checkOutBtn() {
        return $('[data-test="checkout"]');
    }

    get inventoryItemName() {
        return $('.inventory_item_name');
    }

    async getProductContainerByItemTitleDataTest(dataTest) {
        return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class,"cart_item")]`);
    }

    async getProductDataByTitleDataTest(dataTest) {
        const container = await this.getProductContainerByItemTitleDataTest(dataTest);

        return {
            name: await container.$('.inventory_item_name').getText(),
            price: await container.$('.inventory_item_price').getText(),
        };
    }

    async goToCheckout1() {
        await this.checkOutBtn.waitForClickable();
        await this.checkOutBtn.click();
    }

    open() {
        return super.open('cart');
    }
}

export default new CartPage();
