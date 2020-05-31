const httpStatus = require('http-status');
const { pick } = require('lodash');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const { eventService } = require('../services');

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'desc', 'branch', 'color', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  // Send GET_PRODUCTS event to the event bus
  const params = `filter=${JSON.stringify(filter)}&options=${JSON.stringify(options)}`;
  eventService.emitEvent({
    type: 'GET_PRODUCTS',
    params,
  });
  logger.info('Event: GET_PRODUCTS', params);

  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await productService.queryProduct(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  // Send GET_PRODUCT_DETAIL event to the event bus
  const params = `id=${id}`;
  eventService.emitEvent({ type: 'GET_PRODUCT_DETAIL', params });
  logger.info('Event: GET_PRODUCT_DETAIL', params);

  res.send(result);
});

module.exports = {
  getProducts,
  getProduct,
};
