const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendace = new Schema({
    time: {
        type: Date,
        default: Date.now(),
    },
    workPlace: {
        type: String,
        default: 'company',
    },
    working: {
        type: Boolean,
    },

    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'staff',
    },
});

module.exports = mongoose.model('Attendace', Attendace);
