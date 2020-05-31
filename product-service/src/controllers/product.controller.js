// const httpStatus = require('http-status');
const { pick } = require('lodash');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const { eventService } = require('../services');

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'desc', 'branch', 'color', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  // Send GET_PRODUCTS event to the event bus
  eventService.emitEvent({
    type: 'GET_PRODUCTS',
    params: `filter=${JSON.stringify(filter)}&options=${JSON.stringify(options)}`,
  });
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await productService.queryProduct(id);
  // Send GET_PRODUCT_DETAIL event to the event bus
  eventService.emitEvent({ type: 'GET_PRODUCT_DETAIL', params: `id=${id}` });

  res.send(result);
});

module.exports = {
  getProducts,
  getProduct,
};
