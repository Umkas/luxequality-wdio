//  import page from '../pageobjects/page.js'
// import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkout1Page from '../pageobjects/checkout1.page.js'
import checkout2Page from '../pageobjects/checkout2.page.js'
import checkoutCompletePage from '../pageobjects/checkout-complete.page.js'
import footer from '../pageobjects/footer.page.js'
import { generateCustomer, itemDataTest, loginData, EXPECTED_MENU } from '../fixtures/test.data.js';
import { browser } from '@wdio/globals'

describe('Test Case Objective: Login', () => {

    it('001 - should login successfully with valid credentials', async () => {
        await loginPage.open();
        await loginPage.fillUserName(loginData.valid.username);
        await expect(loginPage.inputUsername).toHaveValue(loginData.valid.username);
        await loginPage.fillPassword(loginData.valid.password);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await expect(loginPage.inputPassword).not.toHaveValue('');

        await loginPage.clickLogin();
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
    });

    it('002 - should show error message with invalid password', async () => {
        await loginPage.open();
        await loginPage.fillUserName(loginData.valid.username);
        await expect(loginPage.inputUsername).toHaveValue(loginData.valid.username);
        await loginPage.fillPassword(loginData.invalid.password);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await expect(loginPage.inputPassword).not.toHaveValue('');
        await loginPage.clickLogin();

        await expect(loginPage.errorBanner).toBeDisplayed();
        await expect(loginPage.errorBanner)
            .toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(loginPage.usernameXIcon).toBeDisplayed();
        await expect(loginPage.passwordXIcon).toBeDisplayed();

        await expect(browser).toHaveUrl(browser.options.baseUrl + '/');
    });

    it('003 - should show error message with invalid username', async () => {
        await loginPage.open();
        await loginPage.fillUserName(loginData.invalid.username);
        await expect(loginPage.inputUsername).toHaveValue(loginData.invalid.username);
        await loginPage.fillPassword(loginData.valid.password);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await expect(loginPage.inputPassword).not.toHaveValue('');
        await loginPage.clickLogin();

        await expect(loginPage.errorBanner).toBeDisplayed();
        await expect(loginPage.errorBanner)
            .toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(loginPage.usernameXIcon).toBeDisplayed();
        await expect(loginPage.passwordXIcon).toBeDisplayed();
        await expect(loginPage.inputUsername).toHaveAttribute('class', expect.stringContaining('error'));
        await expect(loginPage.inputPassword).toHaveAttribute('class', expect.stringContaining('error'));

        await expect(browser).toHaveUrl(browser.options.baseUrl + '/');
    });

    it('004 - should redirect to login page after logout', async () => {
        // Precondition
        await loginPage.open();
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');

        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }
        // check sequence and texts
        const actual = await inventoryPage.getMenuItemTexts();
        expect(actual).toEqual(EXPECTED_MENU);

        await inventoryPage.logout()
        await expect(browser).toHaveUrl(browser.options.baseUrl + '/');
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });

});

describe('Test Case Objective: Checkout', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
    });

    describe('008 - Valid Checkout', () => {
        it('should complete checkout successfully with valid data', async () => {
            const product = await inventoryPage.addItemToCart(itemDataTest);

            await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
            await expect(await inventoryPage.getCartItemCount()).toBe('1');

            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText('Your Cart');
            await expect(await inventoryPage.getCurrentUrl()).toContain('/cart');

            const productInCart = await cartPage.getProductDataByTitleDataTest(itemDataTest);
            await expect(productInCart.name).toBe(product.name);

            await cartPage.goToCheckout1();
            await expect(checkout1Page.title).toHaveText('Checkout: Your Information');
            await expect(await checkout1Page.getCurrentUrl()).toContain('/checkout-step-one');

            const customer = generateCustomer();
            await checkout1Page.setFirstName(customer.firstName);
            await expect(checkout1Page.firstNameFld).toHaveValue(customer.firstName);

            await checkout1Page.setLastName(customer.lastName);
            await expect(checkout1Page.lastNameFld).toHaveValue(customer.lastName);

            await checkout1Page.setZip(customer.zip);
            await expect(checkout1Page.zipFld).toHaveValue(customer.zip);

            await checkout1Page.goToCheckOut2();
            await expect(checkout2Page.title).toHaveText('Checkout: Overview');
            await expect(await checkout2Page.getCurrentUrl()).toContain('/checkout-step-two');

            const productInOverview = await checkout2Page.getProductDataByTitleDataTest(itemDataTest);
            await expect(productInOverview.name).toBe(product.name);
            await expect(checkout2Page.itemTotalWOTax).toHaveText(`Item total: $${product.price}`);

            await checkout2Page.finishBtnClick();
            await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
            await expect(await checkoutCompletePage.getCurrentUrl()).toContain('/checkout-complete');
            await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');

            await checkoutCompletePage.backHomeBtnClick();
            await expect(loginPage.title).toHaveText('Products');
            await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');
        });

    });

    describe('009 - Checkout without products', () => {
        it('should not allow checkout with empty cart', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText('Your Cart');
            await expect(await inventoryPage.getCurrentUrl()).toContain('/cart');

            const items = await cartPage.cartItems;
            expect(items.length).toBe(0);

            await cartPage.goToCheckout1();
            await expect(cartPage.title).toHaveText('Your Cart');
            await expect(cartPage.errorMsg).toHaveTextContaining('Cart is empty');

        });
    });
})


describe('Test Case Objective: Cart', () => {

    before(async () => {
        await loginPage.open();
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
    });

    it('005 - should save the cart after logout', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
        await expect(await inventoryPage.getCartItemCount()).toBe('1');

        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }
        const actual = await inventoryPage.getMenuItemTexts();
        expect(actual).toEqual(EXPECTED_MENU);

        await inventoryPage.logout()
        await expect(browser).toHaveUrl(browser.options.baseUrl + '/');
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');

        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');

        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
        await expect(await inventoryPage.getCartItemCount()).toBe('1');
    });
})

describe('Test Case Objective: Products', () => {
    describe('006 - sorting should be worked', () => {
        before(async () => {
            await loginPage.open();
            await loginPage.login(loginData.valid.username, loginData.valid.password);
            await expect(loginPage.title).toHaveText('Products');
            await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
        });

        it('should sort by Price (low to high)', async () => {
            await inventoryPage.sortBy('lohi');
            const prices = await inventoryPage.getAllPrices();
            const sorted = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sorted);
        });

        it('should sort by Price (high to low)', async () => {
            await inventoryPage.sortBy('hilo');
            const prices = await inventoryPage.getAllPrices();
            const sorted = [...prices].sort((a, b) => b - a);
            expect(prices).toEqual(sorted);
        });

        it('should sort by Name (A to Z)', async () => {
            await inventoryPage.sortBy('az');
            const names = await inventoryPage.getAllNames();
            const sorted = [...names].sort();
            expect(names).toEqual(sorted);
        });

        it('should sort by Name (Z to A)', async () => {
            await inventoryPage.sortBy('za');
            const names = await inventoryPage.getAllNames();
            const sorted = [...names].sort().reverse();
            expect(names).toEqual(sorted);
        });
    });

})

describe('Test Case Objective: Footer', () => {

    describe('007 - footer social links sould be opened in new tab', () => {
        before(async () => {
            await loginPage.open();
            await loginPage.login(loginData.valid.username, loginData.valid.password);
            await expect(loginPage.title).toHaveText('Products');
            await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
        });

        it('should open Facebook in a new tab', async () => {
            await footer.clickFacebook();
            await browser.switchWindow('facebook.com');
            await expect(await browser.getUrl()).toContain('facebook.com');

            await browser.closeWindow();
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[0]);
        });

        it('should open LinkedIn in a new tab', async () => {
            await footer.clickLinkedin();
            await browser.switchWindow('linkedin.com');
            await expect(await browser.getUrl()).toContain('linkedin.com');

            await browser.closeWindow();
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[0]);
        });

        it.only('should open Twitter in a new tab', async () => {
            await footer.clickTwitter();
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[1]);
            await expect(await browser.getUrl()).toContain('x.com');

            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
        });
    });
})



