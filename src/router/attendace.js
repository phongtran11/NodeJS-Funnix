const express = require('express');
const router = express.Router();

const attendaceController = require('../controller/attendaceController');

router.get('/', attendaceController.getIndex);
router.get('/start', attendaceController.getStartWork);
router.post('/start', attendaceController.postStartWork);
router.post('/end', attendaceController.postEndWork);

module.exports = router;
