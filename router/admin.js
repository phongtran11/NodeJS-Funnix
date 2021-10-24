const express = require('express');
const router = express.Router();
const ProductControllers = require('../controllers/products')

// GET /admin/add-product
router.get('/add-product',ProductControllers.getAddProduct);

// POST /admin/add-product
router.post('/add-product',ProductControllers.postAddProduct);

module.exports = router;