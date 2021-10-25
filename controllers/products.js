const Product = require('../models/products');
class ProductControllers {
    // GET /admin/add-product
    getAddProduct = (req, res, next) => {
        res.render('add-product', {
            pageTitle: 'Add product',
            path:'/admin/add-product', 
        });
    };

    // POST /admin/products/
    postAddProduct = (req, res, next) => {
        const product =  new Product(req.body.title)
        product.save();
        res.redirect('/');
    };

    // GET /
    getProduct = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('shop', {
                prods : products,
                pageTitle: 'Shop',
                path: '/',
            });
        });
    };
};

module.exports = new ProductControllers;