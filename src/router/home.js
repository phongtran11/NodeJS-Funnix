const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
                    res.render('home', {
                        path: '/home',
                        pageTitle:'home',
                        isStarted: null,
                    });
                });

module.exports = router;