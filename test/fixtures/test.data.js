import { faker } from '@faker-js/faker';
import inventoryPage from '../pageobjects/inventory.page';
import footerPage from '../pageobjects/footer.page';

export const generateCustomer = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zip: faker.location.zipCode('#####')
});

export const loginData = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'standarD_user',
    password: faker.internet.password()
  }
}

export const itemDataTest = "item-4-title-link";

export const EXPECTED_MENU = ['All Items', 'About', 'Logout', 'Reset App State'];

export const sortScenarios = [
  {
    option: 'az',
    getData: () => inventoryPage.getAllNames(),
    sortFn: (arr) => [...arr].sort()
  },
  {
    option: 'za',
    getData: () => inventoryPage.getAllNames(),
    sortFn: (arr) => [...arr].sort().reverse()
  },
  {
    option: 'lohi',
    getData: () => inventoryPage.getAllPrices(),
    sortFn: (arr) => [...arr].sort((a, b) => a - b)
  },
  {
    option: 'hilo',
    getData: () => inventoryPage.getAllPrices(),
    sortFn: (arr) => [...arr].sort((a, b) => b - a)
  }
];

export const footerIconScenarios = [
  {
    name: 'Facebook',
    action: () => footerPage.clickFacebook(),
    expected: ['facebook.com']
  },
  {
    name: 'LinkedIn',
    action: () => footerPage.clickLinkedin(),
    expected: ['linkedin.com']
  },
  {
    name: 'Twitter/X',
    action: () => footerPage.clickTwitter(),
    expected: ['x.com', 'twitter.com']   // оба домена допустимы
  }
];