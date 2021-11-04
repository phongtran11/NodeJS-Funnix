const Staff = require('../models/staff');
const Attendace = require('../models/attendace');
class AttendaceController {
    // GET /attendace
    getIndex(req, res) {
        Attendace.findOne()
            .populate({ path: 'staffId', model: Staff })
            .then((infoStart) => {
                if (infoStart.working) {
                    res.render('attendace/startForm', {
                        pageTitle: 'Attendace',
                        path: '/attendace',
                        // mode: infoStart.working,
                        mode: null,
                        infoStart,
                        staff: null,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET /attendace/start
    getStart(req, res) {
        const mode = req.query.mode;
        const staff = req.staff;

        res.render('attendace/startForm', {
            pageTitle: 'Attendace',
            path: '/attendace',
            staff,
            mode,
        });
    }

    // POST /attendace/start
    postStart(req, res) {
        const workPlace = req.body.workPlace;
        req.staff
            .addWorkTime(
                (req.staff.workTime = {
                    workPlace,
                    working: true,
                    time: Date.now(),
                })
            )
            .then((result) => {
                console.log(result);
                res.redirect('/attendace');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // POST /attendace/end
    postEnd(req, res) {
        req.staff
            .addWorkTime(
                (req.staff.workTime = {
                    working: false,
                    endTime: Date.now(),
                })
            )
            .then((result) => {
                console.log(result);
                res.redirect('/attendace');
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new AttendaceController();
