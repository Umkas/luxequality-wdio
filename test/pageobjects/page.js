export default class Page {

    get burgerMenuBtn() { return $('#react-burger-menu-btn'); }
    get burgerCloseBtn() { return $('#react-burger-cross-btn'); }
    get menuList() { return $('.bm-item-list'); }
    get menuItems() { return $$('.bm-item-list a'); }

    get menuAllItems() { return $('#inventory_sidebar_link'); }
    get menuAbout() { return $('#about_sidebar_link'); }
    get menuLogout() { return $('#logout_sidebar_link'); }
    get menuReset() { return $('#reset_sidebar_link'); }

    async openMenu() {
        await this.waitForElementDisplayed(this.burgerMenuBtn);
        await this.burgerMenuBtn.click();
        await expect(this.menuList).toBeDisplayed();
    }

    async closeMenu(){
        await this.burgerCloseBtn.click();
    }

    async getMenuItemTexts() {
        const items = await this.menuItems;
        return await items.map(async (el) => (await el.getText()).trim());
    }

    async resetAppState() {
        await this.waitForElementDisplayed(this.menuReset);
        await this.menuReset.click();
    }

    async logout() {
        await this.waitForElementDisplayed(this.menuLogout);
        await this.menuLogout.click();
    }


    async waitForElementDisplayed(element, timeout = 5000) {
        await element.waitForDisplayed({
            timeout,
            timeoutMsg: `ALARM!! Element ${element.selector} doesn't dispayed in ${timeout} ms`
        });
    }

    open(path) {
        return browser.url(`/${path}`);
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }
}
