import loginPage from '../pageobjects/login.page.js'
import { generateCustomer, itemDataTest, loginData, EXPECTED_MENU } from '../fixtures/test.data.js';

export function removeDollarSign(price) {
    return price.replace('$', '');
}

export async function login(){
  await loginPage.open();
  await loginPage.login(loginData.valid.username, loginData.valid.password);
}