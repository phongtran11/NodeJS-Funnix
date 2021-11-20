const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

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
                if (value === 'test@gmail.com') {
                    throw new Error('This email address if forbidden.');
                }
                return true;
            }),
        body('password', 'Enter password only numbers and text at leat 5 characters')
            .isLength({ min: 5 })
            .isAlphanumeric(),
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

module.exports = router;
