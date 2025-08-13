import { faker } from '@faker-js/faker';

export const generateCustomer = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zip: faker.location.zipCode('#####')
});

export const itemDataTest = "item-4-title-link";