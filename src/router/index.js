const attendanceRouter = require('./attendance');
const homeRouter = require('./home');
const staffRouter = require('./infoStaff');

function router(app) {
    app.use('/attendance', attendanceRouter);
    app.use('/staff', staffRouter);
    app.use('/', homeRouter);
}

module.exports = router;
