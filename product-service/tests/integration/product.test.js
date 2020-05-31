const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { product1, product2, product3, insertProducts } = require('../fixtures/product.fixture');
const eventService = require('../../src/services/event.service');

setupTestDB();

describe('Product routes', () => {
  beforeEach(() => {
    jest.spyOn(eventService, 'emitEvent').mockImplementation(jest.fn());
  });

  describe('GET /v1/products', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: product1._id.toHexString(),
        name: product1.name,
        desc: product1.desc,
        price: product1.price,
        branch: product1.branch,
        color: product1.color,
      });
    });

    test('should correctly apply filter on name field', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').query({ name: product1.name }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(product1._id.toHexString());
    });

    test('should correctly apply filter on branch field', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').query({ branch: product1.branch }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(product1._id.toHexString());
    });

    test('should correctly sort returned array if descending sort param is specified', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').query({ sortBy: 'price:desc' }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(product3._id.toHexString());
      expect(res.body.results[1].id).toBe(product2._id.toHexString());
      expect(res.body.results[2].id).toBe(product1._id.toHexString());
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').query({ limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(product1._id.toHexString());
      expect(res.body.results[1].id).toBe(product2._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertProducts([product1, product2, product3]);

      const res = await request(app).get('/v1/products').query({ page: 2, limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(product3._id.toHexString());
    });
  });

  describe('GET /v1/products/:productId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await insertProducts([product1]);

      const res = await request(app).get(`/v1/products/${product1._id}`).send().expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toEqual({
        id: product1._id.toHexString(),
        name: product1.name,
        desc: product1.desc,
        price: product1.price,
        branch: product1.branch,
        color: product1.color,
      });
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertProducts([product1]);

      await request(app).get('/v1/products/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if product is not found', async () => {
      await insertProducts([product1]);

      await request(app).get(`/v1/products/${product2._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });
});
