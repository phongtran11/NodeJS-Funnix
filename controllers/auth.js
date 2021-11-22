const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: message,
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationError: [],
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
                    req.flash('error', 'Invalid email or password.');
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email,
                password,
                confirmPassword: req.body.confirmPassword,
            },
            validationError: errors.array(),
        });
    }
    bcryptjs
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
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
