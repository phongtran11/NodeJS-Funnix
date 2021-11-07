const Methods = require('../utils/Methods');

class AttendanceController {
    // GET /
    getIndex(req, res){
        res.render('attendance/index', {
            path: '/',
            pageTitle: 'Attendance',
            isStarted: Methods.CheckIsStarted(req.staff),
        });
    }

    // GET /attendance/start
    getStartWork(req, res) {
        res.render('attendance/startForm', {
            path: '/attendance',
            pageTitle: 'Attendance',
            staff: req.staff,
        });
    }   

    // POST /attendance/start
    postStartWork(req, res) {
        const workPlace = req.body.workPlace;
        const newWorkTimes = {
            startTime: Date.now(),
            workPlace,
            working: true,
            endTime: null,
        };
        req.staff
            .addWorkTimes(newWorkTimes)
            .then((result) => {
                console.log(result);
                res.redirect('/attendance/infoStart');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET /attendance/infoStart
    getInfoStart(req, res) {
                res.render('attendance/startInfo', {
                    path: '/attendance',
                    pageTitle: 'Attendance',
                    lastStart: Methods.getLastStart(req.staff),
                    isStarted: Methods.CheckIsStarted(req.staff),
                    staff: req.staff,
                })
    }

    // POST /attendance/end
    postEndWork(req, res) {
        const newEndTime = {
            working: false,
            endTime: new Date(),
        };
        req.staff
            .addEndTime(newEndTime)
            .then((result) => {
                res.redirect('/attendance/endInfo');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET /attendance/endInfo
    getInfoEnd(req, res) {
        res.render('attendance/endInfo', {
            path: '/attendance',
            pageTitle: 'Attendance',
            timeWorked: Methods.calculateTimeWorked(req.staff),
            isStarted: Methods.CheckIsStarted(req.staff),
            staff: req.staff, 
        });
    }

    // GET /attendance/annulLeave
    getLeaveForm(req, res) {
        res.render('attendance/annualLeaveForm', {
            path: '/attendance',
            pageTitle: 'Attendance',
            isStarted : Methods.CheckIsStarted(req.staff),
        })
    }

    // POST /attendance/info
    postLeaveForm(req, res) {
        console.log(req.body.date);
        res.send(200);
    }

}

module.exports = new AttendanceController();
