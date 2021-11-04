const mongoose = require('mongoose');

async function connect() {
    try {
        mongoose.connect(
            'mongodb+srv://phong:020899Pi@cluster0.eirsr.mongodb.net/employee?authSource=admin&replicaSet=atlas-12dlbs-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
        );
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;
