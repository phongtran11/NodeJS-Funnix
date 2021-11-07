class Methods {
    calculateTimeWorked =  (staff) =>  {
        let totalTimeWorked = 0;

        // find list work time in a day
        const workTimeInDay = staff.workTimes.filter(workTime =>{
            return workTime.startTime.getDate() === workTime.endTime.getDate();
        });

        // calculate Hours work
        totalTimeWorked =(workTimeInDay[workTimeInDay.length-1].endTime.getHours()) -
                            (workTimeInDay[0].startTime.getHours());

        // calculate minutes work
        workTimeInDay.forEach(workTime => {
            const minutesStart = workTime.startTime.getHours()*60 + workTime.startTime.getMinutes();
            const minutesEnd = workTime.endTime.getHours()*60 + workTime.endTime.getMinutes();
            const minustesCalculate = (minutesEnd - minutesStart)/60;
            
            return totalTimeWorked = totalTimeWorked + minustesCalculate;
        })

        return (totalTimeWorked).toFixed(2);
    };

    getLastStart =  (staff) => {
        let lastWorked;
        const lastWorkedList=staff.workTimes.filter(workedTime=> {
        return workedTime.working === true;
        } );
        return lastWorked = lastWorkedList[lastWorkedList.length-1];
    };

    CheckIsStarted = (staff) => {
        const workTimeLength = staff.workTimes.length -1;
        const lastStart = staff.workTimes[workTimeLength];
        if (lastStart.endTime) {
            return true;
        } else {
            return false;
        }
    };
}

module.exports = new Methods();