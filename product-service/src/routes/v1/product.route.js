const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(validate(productValidation.getProducts), productController.getProducts);

router.route('/:productId').get(validate(productValidation.getProduct), productController.getProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * path:
 *  /products:
 *    get:
 *      summary: Search products
 *      description: Search for products based on different criteria such as name, price, branch, colour etc.
 *      tags: [Products]
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Product name
 *        - in: query
 *          name: desc
 *          schema:
 *            type: string
 *          description: Product description
 *        - in: query
 *          name: price
 *          schema:
 *            type: string
 *          description: Product price
 *        - in: query
 *          name: branch
 *          schema:
 *            type: string
 *          description: Product branch
 *        - in: query
 *          name: color
 *          schema:
 *            type: string
 *          description: Product color
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of products
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Product'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 */

/**
 * @swagger
 * path:
 *  /products/{id}:
 *    get:
 *      summary: Get a product
 *      description: Get a product by id
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Product id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 */
