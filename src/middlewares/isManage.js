const isManage = (req, res, next) => {
    console.log(req.staff.role);
    if (req.staff.role === 'admin') {
        return next();
    }
    res.status(401).redirect('/');
};

module.exports = isManage;
