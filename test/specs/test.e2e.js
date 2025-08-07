import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'
import Checkout1Page from '../pageobjects/checkout1.page.js'
import Checkout2Page from '../pageobjects/checkout2.page.js'
import CheckoutCompletePage from '../pageobjects/checkout-complete.page.js'


describe('Checkout flow', () => {
    it('should add product to cart and complete purchase', async () => {

        // Precondition - login with valid credentials
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect($('.title')).toHaveText('Products');
        let currentUrl = await browser.getUrl();
        //console.log(`current URL is - ${currentUrl}`);
        await expect(currentUrl).toContain('/inventory');

        // const
        const itemDataTest = "item-4-title-link";
        const customer = {
            firstname: "John",
            lastname: "Snow",
            zip: "07400",
        }


        // step1 - Click on the "Add to cart" button near any product
        // result - Number near the cart at the top right increase by 1, product is added to cart

        const product = await InventoryPage.getProductDataByTitleDataTest(itemDataTest);
        await product.addToCartBtn.click();

        await expect(InventoryPage.shoppingCartBadge).toBeDisplayed(); // counter is visible
        // console.log("check count");
        await expect(await InventoryPage.getCartItemCount()).toBe('1'); // counter displayed '1'


        // step2 - Click on the "Cart" button at the top right corner
        // result - Cart page is displayed, product are the same as was added at step 1

        await InventoryPage.shoppingCartContainer.click();
        await expect(CartPage.title).toHaveText('Your Cart');
        currentUrl = await browser.getUrl();
        //console.log(`current URL is - ${currentUrl}`);
        await expect(currentUrl).toContain('/cart');

        const productInCart = await CartPage.getProductDataByTitleDataTest(itemDataTest);
        await expect(productInCart.name).toBe(product.name);

        // step3 - Click on the "Checkout" button
        // result - Checkout form are displayed
        await CartPage.checkOutBtn.click();
        await expect(Checkout1Page.title).toHaveText('Checkout: Your Information');
        currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/checkout-step-one');


        // step4 - Fill the "First Name" field with valid data
        // result - Data is entered to the field
        await Checkout1Page.firstNameFld.setValue(customer.firstname);
        await expect(Checkout1Page.firstNameFld).toHaveValue(customer.firstname);

        // step5 - Fill the "Second Name" field with valid data
        // result - Data is entered to the field       
        await Checkout1Page.lastNameFld.setValue(customer.lastname);
        await expect(Checkout1Page.lastNameFld).toHaveValue(customer.lastname);

        // step6 - Fill the "Postal Code" field with valid data
        // result - Data is entered to the field
        await Checkout1Page.zipFld.setValue(customer.zip);
        await expect(Checkout1Page.zipFld).toHaveValue(customer.zip);

        // step7 - Click on the "Continue" button
        // result - User is redirected to the "Overview" page, Products from step 1 is displayed. Total price = price of products from step 1
        await Checkout1Page.continueBtn.click();
        await expect(Checkout2Page.title).toHaveText('Checkout: Overview');
        currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/checkout-step-two');

        const productInOverview = await Checkout2Page.getProductDataByTitleDataTest(itemDataTest);
        await expect(productInOverview.name).toBe(product.name);
        await expect(Checkout2Page.itemTotalWOTax).toHaveText(`Item total: ${product.price}`);

        // step8 - Click on the "Finish" button
        // User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed
        await Checkout2Page.finishBtn.click();
        await expect(CheckoutCompletePage.title).toHaveText('Checkout: Complete!');
        currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/checkout-complete');
        await expect(CheckoutCompletePage.completeHeader).toHaveText('Thank you for your order!');


        // step9 - Click on the "Back Home" button
        // User is redirected to the inventory page. Products are displayed. Cart is empty
        await CheckoutCompletePage.backHomeBtn.click();
        await expect($('.title')).toHaveText('Products');
        currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/inventory');


    })
})



