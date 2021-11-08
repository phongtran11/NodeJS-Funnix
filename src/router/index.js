const attendanceRouter = require('./attendance');
const homeRouter = require('./home');

function router(app) {
    app.use('/attendance', attendanceRouter);
    app.use('/', homeRouter);
}

module.exports = router;
