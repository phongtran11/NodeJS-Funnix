const Staff = require('../models/staff');

class AttendaceController {
    // GET /attendace
    getIndex(req, res) {
        res.render('attendace/startInfo', {
            path: '/attendace',
            staff: req.staff,
        });
    }

    // GET /attendace/start
    getStartWork(req, res) {
        const mode = req.query.mode;

        res.render('attendace/startForm', {
            pageTitle: 'Attendace',
            path: '/attendace',
            staff: req.staff,
            mode,
        });
    }

    // POST /attendace/start
    postStartWork(req, res) {
        const workPlace = req.body.workPlace;
        const newWorkTime = {
            startTime: Date.now(),
            workPlace,
            working: true,
            endTime: null,
        };
        req.staff
            .addWorkTime(newWorkTime)
            .then((result) => {
                console.log(result);
                res.redirect('/attendace');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // POST /attendace/end
    postEndWork(req, res) {
        const newWorkTime = {
            startTime: null,
            workPlace: null,
            working: false,
            endTime: Date.now(),
        };
        req.staff
            .addWorkTime(newWorkTime)
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
