const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../../src/models/product.model');

const product1 = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  price: 50,
  desc: faker.lorem.words(),
  branch: 'A',
  color: 'white',
};

const product2 = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  price: 60,
  desc: faker.lorem.words(),
  branch: 'B',
  color: 'white',
};

const product3 = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  price: 70,
  desc: faker.lorem.words(),
  branch: 'C',
  color: 'yellow',
};

const insertProducts = async (products) => {
  await Product.insertMany(products.map((product) => ({ ...product })));
};

module.exports = {
  product1,
  product2,
  product3,
  insertProducts,
};
