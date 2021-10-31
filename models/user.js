const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db
            .collection('users')
            .insertOne(this)
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map((i) => {
            return i.productId;
        });
        return db
            .collection('products')
            .find({ _id: { $in: [...productIds] } })
            .toArray()
            .then((products) => {
                console.log(products);
                return products.map((p) => {
                    return {
                        ...p,
                        quantity: this.cart.items.find((i) => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity,
                    };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex((item) => {
            return item.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updateCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updateCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updateCartItems.push({
                productId: product._id,
                quantity: newQuantity,
            });
        }
        const updateCart = {
            items: updateCartItems,
        };
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updateCart } }
            );
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .find({ _id: new ObjectId(userId) })
            .next();
    }
}
module.exports = User;
