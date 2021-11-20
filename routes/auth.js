const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .custom((value, { req }) => {
                // if (value === 'test@gmail.com') {
                //     throw new Error('This email address if forbidden.');
                // }
                // return true;
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject('Email exists already');
                    }
                });
            }),
        body('password', 'Enter password only numbers and text at leat 5 characters')
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('comfirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password not math');
            }
            return true;
        }),
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

module.exports = router;
