const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({
    //   where: {id : prodId}
    // })
    // .then((product) => {
    //   res.render('shop/product-detail', {
    //     product: product[0],
    //     pageTitle: product[0].title,
    //     path: '/products'
    //   });
    // })
    // .catch(err => console.log(err));
    // Product.findByPk(prodId)
    //     .then((product) => {
    //         res.render('shop/product-detail', {
    //             product: product,
    //             pageTitle: product.title,
    //             path: '/products',
    //         });
    //     })
    //     .catch((err) => console.log(err));
    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    if (req.user.getCart() === null) {
        return res.redirect('/');
    }
    req.user
        .getCart()
        .then((products) => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log('Add to cart successfully');
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteProductFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });
};

// exports.postOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user
//         .getCart()
//         .then((cart) => {
//             fetchedCart = cart;
//             return cart.getProducts();
//         })
//         .then((products) => {
//             return req.user
//                 .createOrder()
//                 .then((order) => {
//                     return order.addProduct(
//                         products.map((product) => {
//                             product.OrderItem = {
//                                 qty: product.CartItem.qty,
//                             };
//                             return product;
//                         })
//                     );
//                 })
//                 .then((resutl) => {
//                     return fetchedCart.setProducts(null);
//                 })
//                 .then((result) => {
//                     res.redirect('/orders');
//                 })
//                 .catch((err) => console.log(err));
//         })
//         .then()
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.getOrders = (req, res, next) => {
//     req.user
//         .getOrders({ include: ['products'] })
//         .then((orders) => {
//             res.render('shop/orders', {
//                 path: '/orders',
//                 pageTitle: 'Your Orders',
//                 orders,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout',
//     });
// };
