const express = require('express');
const router = express.Router();

const attendaceController = require('../controller/attendaceController');

router.get('/', attendaceController.getIndex);

module.exports = router;
