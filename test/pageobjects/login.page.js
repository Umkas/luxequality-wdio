import Page from './page.js';


class LoginPage extends Page {
    get inputUsername() { return $('[data-test="username"]'); }
    get inputPassword() { return $('[data-test="password"]'); }
    get loginBtn() { return $('[data-test="login-button"]'); }
    get title() { return $('[data-test="title"]'); }
    get errorBanner() { return $('[data-test="error"]'); }
    get errorCloseBtn() { return $('[data-test="error-button"]'); }
    get usernameXIcon() { return $('//*[@data-test="username"]/following-sibling::*[contains(@class,"error_icon") or name()="svg" and contains(@class,"error_icon")]'); }
    get passwordXIcon() { return $('//*[@data-test="password"]/following-sibling::*[contains(@class,"error_icon") or name()="svg" and contains(@class,"error_icon")]'); }



    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBtn.click();
    }

    async fillUserName(username) {
        await this.inputUsername.setValue(username);
    }

    async fillPassword(password) {
        await this.inputPassword.setValue(password);
    }

    async clickLogin() {
        await this.loginBtn.click();
    }

    open() {
        return super.open('');
    }
}

export default new LoginPage();
