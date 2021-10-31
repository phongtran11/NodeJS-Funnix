const mongodb = require('mongodb');
const MongodbClinet = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongodbClinet.connect(
        'mongodb+srv://phong:020899Pi@cluster0.eirsr.mongodb.net/shop?retryWrites=true&w=majority'
    )
        .then((client) => {
            console.log('Connected!!!');
            _db = client.db();
            callback();
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!!!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
