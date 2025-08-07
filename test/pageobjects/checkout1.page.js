import { $ } from '@wdio/globals'
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

    open() {
        return super.open('checkout-step-one');
    }
}

export default new Checkout1Page();