
export default class Page {

    async waitForElementDisplayed(element, timeout = 5000) {
        await element.waitForDisplayed({
            timeout,
            timeoutMsg: `ALARM!! Element ${element.selector} doesn't dispayed in ${timeout} ms`
        });
    }

    open(path) {
        return browser.url(`https://www.saucedemo.com/${path}`);
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }

    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get logoutLink() { return $('#logout_sidebar_link'); }
    get resetAppStateLink() { return $('#reset_sidebar_link'); }

    async openMenu() {
        await this.waitForElementDisplayed(this.burgerMenu);
        await this.burgerMenu.click();
    }
    async resetAppState() {
        await this.waitForElementDisplayed(this.resetAppStateLink);
        await this.resetAppStateLink.click();
    }
    async logout() {
        await this.openMenu();
        await this.resetAppState();
        await this.waitForElementDisplayed(this.logoutLink);
        await this.logoutLink.click();
    }

    removeDollarSign(price) {
        return price.replace('$', '');
    }
}
