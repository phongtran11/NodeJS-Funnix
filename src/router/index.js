const attendanceRouter = require('./attendace');

function router(app) {
    app.use('/attendace', attendanceRouter);
}

module.exports = router;
