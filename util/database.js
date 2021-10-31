const mongodb = require('mongodb');
const MongodbClinet = mongodb.MongoClient;

const mongoConnect = (cb) => {
    MongodbClinet.connect(
        'mongodb+srv://phong:020899Pi@cluster0.eirsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
        .then((client) => {
            console.log('Connected!!!');
            cb(client);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = mongoConnect;
