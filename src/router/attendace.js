const express = require('express');
const router = express.Router();
const attendaceController = require('../controller/attendaceController');

router.get('/', attendaceController.getView);

module.exports = router;
