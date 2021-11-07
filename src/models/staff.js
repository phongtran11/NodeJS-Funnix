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
    workTimes: [
        {
            startTime: { type: Date, default: new Date() },
            workPlace: { type: String },
            working: { type: Boolean },
            endTime: { type: Date },
        },
    ],
});

Staff.methods.addWorkTimes = function (newworkTimes) {
    if (this.workTimes.length < 0) {
        return this.save();
    } else {
        const updateworkTimes = [...this.workTimes];
        updateworkTimes.push(newworkTimes);
        this.workTimes = updateworkTimes;
        return this.save();
    }
};

Staff.methods.addEndTime = function (newEndTime) {
    const lastWorkTime = this.workTimes[this.workTimes.length - 1]
    const updateWorkTime = lastWorkTime.endTime = newEndTime.endTime;
    // const updateWorkTime = this.workTimes.map(workTime => {
    //     if(workTime.startTime.getDate() === newEndTime.endTime.getDate()) {
    //         workTime.endTime = newEndTime.endTime
    //     }
    //     else {
    //         return workTime
    //     }
    // })

    this.workTime = updateWorkTime; 
    return this.save();
}

module.exports = mongoose.model('Staff', Staff);
