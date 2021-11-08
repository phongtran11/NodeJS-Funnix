
class StaffController {

    //  GET /staff
    getInfoStaff (req, res) {
        res.render('infoStaff', {
            path: '/staff',
            pageTitle:'Staff',
            isStarted: null,
            staff: req.staff
        })
    }

    // POST /staff/edit 
    postEditStaff (req, res) {
        req.staff.image = req.body.image;
        req.staff.save()
            .then(() => 
                res.redirect('/')
            )
            .catch(error => 
                    console.log(error)
                )
    }
}

module.exports = new StaffController();