
class StaffController {

    //  GET /staff/infoStaff
    getInfoStaff (req, res) {
        res.render('staff/infoStaff', {
            path: '/staff/infoStaff',
            pageTitle:'Staff Info',
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

    // GET /staff/reference
    getReference (req, res) {
        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle:'Staff Reference',
            isStarted: null,
            staff: req.staff,
        })
    }
}

module.exports = new StaffController();