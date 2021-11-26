const attendanceRouter = require('./attendance');
const homeRouter = require('./home');
const staffRouter = require('./infoStaff');
const covidDetailRouter = require('./covidDetail');
const authRouter = require('./authRouter');
const isAuth = require('../middlewares/isAuth');

function router(app) {
    app.use('/attendance', isAuth, attendanceRouter);
    app.use('/staff', isAuth, staffRouter);
    app.use('/covidDetail', isAuth, covidDetailRouter);
    app.use('/auth', authRouter);
    app.use('/', isAuth, homeRouter);
}

module.exports = router;
