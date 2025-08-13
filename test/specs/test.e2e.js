import Page from '../pageobjects/page.js'
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkout1Page from '../pageobjects/checkout1.page.js'
import checkout2Page from '../pageobjects/checkout2.page.js'
import checkoutCompletePage from '../pageobjects/checkout-complete.page.js'
import { generateCustomer, itemDataTest } from '../fixtures/test.data.js';


describe('Valid Checkout', () => {
    const page = new Page();

    beforeEach(async () => {
        await loginPage.open();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(loginPage.title).toHaveText('Products');
        await expect(await loginPage.getCurrentUrl()).toContain('/inventory');
    });

    afterEach(async function () {
        const title = this.currentTest.title;
        const status = this.currentTest.state;
        console.log(` ${title} -> ${status === 'passed' ? 'passed' : 'failed'}`);
        await page.logout();
    });

    it('should add a product to the cart when clicking the "Add to cart" button', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);

        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
        await expect(await inventoryPage.getCartItemCount()).toBe('1');
    });

    it('should open the Cart page when clicking the "Cart" button and display the same product added at step 1', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/cart');

        const productInCart = await cartPage.getProductDataByTitleDataTest(itemDataTest);
        await expect(productInCart.name).toBe(product.name);

    });


    it('should open the Checkout form when clicking the "Checkout" button', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();
        await expect(checkout1Page.title).toHaveText('Checkout: Your Information');
        await expect(await checkout1Page.getCurrentUrl()).toContain('/checkout-step-one');
    });

    it('should allow entering a valid First Name into the "First Name" field', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.setFirstName(customer.firstName);
        await expect(checkout1Page.firstNameFld).toHaveValue(customer.firstName);
    });

    it('should allow entering a valid Second Name into the "Last Name" field', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.setFirstName(customer.firstName);

        await checkout1Page.setLastName(customer.lastName);
        await expect(checkout1Page.lastNameFld).toHaveValue(customer.lastName);

    });

    it('should allow entering a valid Postal Code into the "Postal Code" field', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.setFirstName(customer.firstName);
        await checkout1Page.setLastName(customer.lastName);

        await checkout1Page.setZip(customer.zip);
        await expect(checkout1Page.zipFld).toHaveValue(customer.zip);
    });

    it('should redirect to the "Overview" page when clicking the "Continue" button, with products from step 1 displayed and correct total price', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.fillCustomerInfo(customer);
        await checkout1Page.goToCheckOut2();
        await expect(checkout2Page.title).toHaveText('Checkout: Overview');
        await expect(await checkout2Page.getCurrentUrl()).toContain('/checkout-step-two');

        const productInOverview = await checkout2Page.getProductDataByTitleDataTest(itemDataTest);
        await expect(productInOverview.name).toBe(product.name);
        await expect(checkout2Page.itemTotalWOTax).toHaveText(`Item total: $${product.price}`);
    });

    it('should display the "Thank you for your order!" message on the "Checkout Complete" page after clicking the "Finish" button', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.fillCustomerInfo(customer);
        await checkout1Page.goToCheckOut2();

        await checkout2Page.finishBtnClick();
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
        await expect(await checkoutCompletePage.getCurrentUrl()).toContain('/checkout-complete');
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });

    it('should return to the Inventory page when clicking the "Back Home" button, with products displayed and cart empty', async () => {
        const product = await inventoryPage.addItemToCart(itemDataTest);
        await inventoryPage.openCart();

        await cartPage.goToCheckout1();

        const customer = generateCustomer();
        await checkout1Page.fillCustomerInfo(customer);
        await checkout1Page.goToCheckOut2();
        await checkout2Page.finishBtnClick();

        await checkoutCompletePage.backHomeBtnClick();
        await expect(loginPage.title).toHaveText('Products');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');
    });
})



