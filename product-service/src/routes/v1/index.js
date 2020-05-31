const express = require('express');
const docsRoute = require('./docs.route');
const productRoute = require('./product.route');

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/products', productRoute);

module.exports = router;
