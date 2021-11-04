const express = require('express');
const router = express.Router();

const attendaceController = require('../controller/attendaceController');

router.get('/', attendaceController.getIndex);
router.get('/start', attendaceController.getStart);
router.post('/start', attendaceController.postStart);
router.post('/end', attendaceController.postEnd);
module.exports = router;
