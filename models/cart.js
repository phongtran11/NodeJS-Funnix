const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
  

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let updateProd;
            const existingProduct = cart.products[existingProductIndex];
            // Add new prodcut / increase quantity 
            if (existingProduct) {
                updateProd = {...existingProduct};
                updateProd.qty = updateProd.qty + 1;
                cart.products = [existingProduct];
                cart.products[existingProductIndex] = updateProd;
            } else {
                updateProd = { id : id, qty: 1};
                cart.products = [...cart.products, updateProd];
            }
            
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            // Save cart
            fs.writeFile(p, JSON.stringify(cart), error => {
                console.log(error);
            });
        });
    
    }

    static deleteProduct (id, productPrice) {
        fs.readFile(p, (err, fileContent) => {  
            if(err) {
                return;
            }
            const updateCart = {...JSON.parse(fileContent)};
            const product = updateCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updateCart.products = updateCart.products.filter(prod => prod.id !== id);
            updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
            // Save cart
            fs.writeFile(p, JSON.stringify(updateCart), error => {
                console.log(error);
            });
        });
    };

    static getCart (cb) {
        fs.readFile(p, (err, fileContent) => {  
            const cart = JSON.parse(fileContent);
            if (err) {
                return cb(null);
            } else {
                cb(cart); 
            }
        });
    }
}; 