import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import { loginData, EXPECTED_MENU } from '../fixtures/test.data.js';

describe('Test Case Objective: Login', () => {

    it('001 - should login successfully with valid credentials', async () => {
        await loginPage.open();
        await loginPage.fillUserName(loginData.valid.username);
        await expect(loginPage.inputUsername).toHaveValue(loginData.valid.username);
        await loginPage.fillPassword(loginData.valid.password);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await expect(loginPage.inputPassword).not.toHaveValue('');

        await loginPage.clickLogin();
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');
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
        await loginPage.open();
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(await inventoryPage.getCurrentUrl()).toContain('/inventory');

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
    });

});