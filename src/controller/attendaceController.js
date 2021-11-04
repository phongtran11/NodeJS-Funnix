const Staff = require('../models/staff');

class AttendaceController {
    // GET /attendace
    getIndex(req, res) {
        res.render('attendace/index', {
            pageTitle: 'Attendace',
            path: '/attendace',
        });
    }
}

module.exports = new AttendaceController();
