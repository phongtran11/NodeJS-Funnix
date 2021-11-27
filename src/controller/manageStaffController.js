const Staff = require('../models/staff');

class ManageStaffController {
    // GET /manageStaff/
    getIndex(req, res, next) {
        Staff.find({ role: 'staff' })
            .then((staffs) => {
                res.render('manage/index', {
                    path: '/manageStaff',
                    pageTitle: 'Manage Staff',
                    isStarted: null,
                    staffs,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //GET /manageStaff/staff
    postStaff(req, res, next) {
        Staff.findById(req.body.staff)
            .then((staff) => {
                console.log(staff);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new ManageStaffController();
