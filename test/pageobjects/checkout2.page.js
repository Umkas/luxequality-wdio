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
            price: this.removeDollarSign(await container.$('.inventory_item_price').getText()),
        };
    }

    get itemTotalWOTax() {
        return $('[data-test="subtotal-label"]');
    }

    async finishBtnClick() {
        await this.finishBtn.waitForClickable();
        await this.finishBtn.click();
    }

    open() {
        return super.open('checkout-step-two');
    }
}

export default new Checkout2Page();