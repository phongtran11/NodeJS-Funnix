const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
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

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .find({ _id: new ObjectId(prodId) })
            .next();
    }
}
module.exports = User;
