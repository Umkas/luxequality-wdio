import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {
    get inputUsername () {
        return $('[data-test="username"]');
    }

    get inputPassword () {
        return $('[data-test="password"]');
    }

    get btnSubmit () {
        return $('[data-test="login-button"]');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
