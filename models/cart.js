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

}; 