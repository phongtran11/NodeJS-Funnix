const products = []

class ProductControllers {
    getAddProduct = (req, res, next) => {
        res.render('add-product', {
            pageTitle: 'Add product',
            path:'/admin/add-product', 
        });
    };

    postAddProduct = (req, res, next) => {
            products.push({title: req.body.title});
            res.redirect('/');
    };

    getProduct = (req, res, next) => {
        res.render('shop', {
            prods : products,
            pageTitle: 'Shop',
            path: '/',
        });
    };
};

module.exports = new ProductControllers;