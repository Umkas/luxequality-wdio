import Page from './page.js';

class Checkout1Page extends Page {

    get title() {
        return $('[data-test="title"]');
    }

    get firstNameFld() {
        return $('[data-test="firstName"]');
    }

    get lastNameFld() {
        return $('[data-test="lastName"]');
    }

    get zipFld() {
        return $('[data-test="postalCode"]');
    }

    get continueBtn() {
        return $('[data-test="continue"]');
    }

    async setFirstName(value) {
        await this.firstNameFld.setValue(value);
    }


    async setLastName(value) {
        await this.lastNameFld.setValue(value);
    }


    async setZip(value) {
        await this.zipFld.setValue(value);
    }


    async fillCustomerInfo({ firstName, lastName, zip }) {
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setZip(zip);
    }

    async goToCheckOut2() {
        await this.continueBtn.waitForClickable();
        await this.continueBtn.click();
    }

    open() {
        return super.open('checkout-step-one');
    }
}

export default new Checkout1Page();