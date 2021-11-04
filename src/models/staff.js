const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    name: {
        type: String,
    },
    dOB: {
        type: Date,
    },
    salaryScale: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    department: {
        type: String,
    },
    annualLeave: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Staff', Staff);
