import Page from './page.js';

class CheckoutCompletePage extends Page {

    get title() {
        return $('[data-test="title"]');
    }

    get completeHeader() {
        return $('[data-test="complete-header"]');
    }

    get backHomeBtn() {
        return $('[data-test="back-to-products"]');
    }

    async backHomeBtnClick() {
        await this.backHomeBtn.waitForClickable();
        await this.backHomeBtn.click();
    }

    open() {
        return super.open('checkout-complete');
    }
}

export default new CheckoutCompletePage();