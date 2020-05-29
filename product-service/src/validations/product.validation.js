const Joi = require('@hapi/joi');

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.string(),
    branch: Joi.string(),
    desc: Joi.string(),
    color: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
};

module.exports = {
  getProducts,
  getProduct,
};
