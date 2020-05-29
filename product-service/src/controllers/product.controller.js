// const httpStatus = require('http-status');
const { pick } = require('lodash');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await productService.queryProduct(id);
  res.send(result);
});

module.exports = {
  getProducts,
  getProduct,
};
