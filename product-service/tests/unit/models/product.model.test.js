const faker = require('faker');
const { Product } = require('../../../src/models');

describe('Product model', () => {
  describe('Product validation', () => {
    let newProduct;
    beforeEach(() => {
      newProduct = {
        name: faker.name.findName(),
        price: 50,
        desc: faker.lorem.words(),
        branch: 'A',
        color: 'white',
      };
    });

    test('should correctly validate a valid Product', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if price is invalid', async () => {
      newProduct.price = 'ABC';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if name is null', async () => {
      newProduct.name = null;
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });
});
