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
    workTime: [
        {
            startTime: { type: Date, default: Date.now() },
            workPlace: { type: String },
            working: { type: Boolean },
            endTime: { type: Date },
        },
    ],
});

Staff.methods.addWorkTime = function (newWorkTime) {
    if (this.workTime.length < 0) {
        return this.save();
    } else {
        const updateWorkTime = [...this.workTime];
        updateWorkTime.push(newWorkTime);
        this.workTime = updateWorkTime;
        return this.save();
    }
};

module.exports = mongoose.model('Staff', Staff);
