const express = require('express');
const app = express();

const port = 3000;
const router = require('./router/index');
const db = require('./config/db');
const Staff = require('./models/staff');

// Connect to MongoDB
db();

// Set static: public
app.use(express.static('public'));

// Parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Add staff in request
app.use((req, res, next) => {
    Staff.findOne({ _id: '6183eb25cfafc3d73210a3ff' })
        .then((staff) => {
            req.staff = staff;
            next();
        })
        .catch((error) => {
            console.log(error);
        });
});

// Init router
router(app);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
