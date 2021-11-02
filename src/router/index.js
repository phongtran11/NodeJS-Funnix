const attendanceRouter = require('./attendace');

function router(app) {
    app.use('/', attendanceRouter);
}

module.exports = router;
