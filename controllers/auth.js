const bcryptjs = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: req.flash('error'),
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcryptjs
                .compare(password, user.password)
                .then((doMath) => {
                    if (doMath) {
                        console.log('chya vao day');
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((error) => {
                            console.log(error);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch((error) => {
                    console.log(error);
                    res.redirect('/login');
                });
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/');
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcryptjs
                .hash(password, 12)
                .then((hashedPass) => {
                    const user = new User({
                        email: email,
                        password: hashedPass,
                        cart: { items: [] },
                    });
                    return user.save();
                })
                .then((result) => {
                    res.redirect('/login');
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
