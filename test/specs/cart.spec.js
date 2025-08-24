import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import { itemDataTest, loginData, EXPECTED_MENU } from '../fixtures/test.data.js';
import { login } from '../helpers/diff.help.js';

describe('Test Case Objective: Cart', () => {

    beforeEach(async () => login());

    it('005 - should save the cart after logout', async () => {
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');

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
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');

        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
        await expect(await inventoryPage.getCartItemCount()).toBe('1');
    });
})