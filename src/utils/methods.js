class Methods {
    timeConvert = (time) => {
        const hours = (time / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return  rhours +  rminutes/100 ;
        }
        

    calculateTimeWorked =  (staff) =>  {
        let totalTimeWorked = 0;

        // find list work time in a day
        const workTimeInDay = staff.workTimes.filter(workTime =>{
            return workTime.startTime.getDate() === workTime.endTime.getDate();
        });
     
        workTimeInDay.forEach(workTime => {
            // calculate minutes work
            const minutesStart = workTime.startTime.getHours()*60 + workTime.startTime.getMinutes();
            const minutesEnd = workTime.endTime.getHours()*60 + workTime.endTime.getMinutes();
            const minustesCalculate = (minutesEnd - minutesStart)/60;
            
            // calculate Hours work
            const hoursWorked =  workTime.endTime.getHours() - workTime.startTime.getHours()
            return totalTimeWorked = (totalTimeWorked + hoursWorked*60 + minustesCalculate) ;
        })

        return totalTimeWorked;
    };

    getLastStart =  (staff) => {
        let lastWorked;
        const lastWorkedList=staff.workTimes.filter(workedTime=> {
        return workedTime.working === true;
        } );
        return lastWorked = lastWorkedList[lastWorkedList.length-1];
    };

    CheckIsStarted = (staff) => {
        console.log(staff.workTimes.length)
        if (staff.workTimes && staff.workTimes.length > 0) {
            const workTimeLength = staff.workTimes.length -1;
            const lastStart = staff.workTimes[workTimeLength];
            if (lastStart.endTime) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
      
    };
}

module.exports = new Methods();