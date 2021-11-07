const attendanceRouter = require('./attendance');

function router(app) {
    app.use('/attendance', attendanceRouter);
    app.use('/',attendanceRouter)
}

module.exports = router;
