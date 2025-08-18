import { faker } from '@faker-js/faker';

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