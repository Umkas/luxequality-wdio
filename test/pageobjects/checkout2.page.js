import { $ } from '@wdio/globals'
import Page from './page.js';

class Checkout2Page extends Page {

    get title() {
        return $('[data-test="title"]');
    }

    get finishBtn() {
        return $('[data-test="finish"]');
    }

    async getProductContainerByItemTitleDataTest(dataTest) {
        return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class,"cart_item_label")]`);
    }

    async getProductDataByTitleDataTest(dataTest) {
        const container = await this.getProductContainerByItemTitleDataTest(dataTest);

        return {
            name: await container.$('.inventory_item_name').getText(),
            price: await container.$('.inventory_item_price').getText(),
        };
    }

    get itemTotalWOTax() {
        return $('[data-test="subtotal-label"]');
    }

    open() {
        return super.open('checkout-step-two');
    }
}

export default new Checkout2Page();