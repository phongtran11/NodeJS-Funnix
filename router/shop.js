const express = require('express');
const router = express.Router();
const ProductControllers = require('../controllers/products');

// GET /
router.get('/', ProductControllers.getProduct);

module.exports = router