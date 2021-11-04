const Staff = require('../models/staff');
const Attendace = require('../models/attendace');
class AttendaceController {
    // GET /attendace
    getIndex(req, res) {
        Attendace.findOne()
            .populate({ path: 'staffId', model: Staff })
            .then((infoStart) => {
                if (infoStart.working) {
                    res.render('attendace/index', {
                        pageTitle: 'Attendace',
                        path: '/attendace',
                        mode: infoStart.working,
                        infoStart,
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
        const startInfo = new Attendace({
            workPlace,
            working: true,
            staffId: req.staff,
        });

        startInfo
            .save()
            .then(() => {
                res.redirect('/attendace');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // POST /attendace/end
    postEnd(req, res) {
        const staffId = req.staff.id;
        const timeEnd = Date.now();
        const endWork = new Attendace({
            time: timeEnd,
            workPlace: null,
            working: false,
            staffId,
        });

        endWork
            .save()
            .then(() => {
                res.redirect('/attendace');
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new AttendaceController();
