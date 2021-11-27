const express = require('express');
const router = express.Router();

const manageStaffController = require('../controller/manageStaffController');

router.get('/', manageStaffController.getIndex);
router.post('/staff', manageStaffController.postStaff);

module.exports = router;
