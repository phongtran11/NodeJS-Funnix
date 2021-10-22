const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const products = []

// GET /admin/add-product
router.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
})

// POST /admin/add-product
router.post('/add-product', (req, res, next) =>{
    products.push({title: req.body.title})
    res.redirect('/');
})

module.exports = {router, products};