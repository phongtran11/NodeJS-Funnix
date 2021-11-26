const express = require('express');
const app = express();
const csrf = require('csurf');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

const port = 3000;
const router = require('./router/index');
const db = require('./config/db');
const Staff = require('./models/staff');

const MONGODB_URI = 'mongodb+srv://phong:020899Pi@cluster0.eirsr.mongodb.net/employee';

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

// save session
const store = new mongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store,
    })
);

// Token
const csrfProtection = csrf();
app.use(csrfProtection);

// set token, authenticated
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Add staff in request
app.use((req, res, next) => {
    if (!req.session.staff) {
        return next();
    }
    Staff.findById(req.session.staff._id)
        .then((staff) => {
            if (!staff) {
                return next();
            }
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
