const express = require('express');

const driverController = require('../controllers/driver.controller');

const router = express.Router();

router.post('/driver', driverController.submitLicenseForm);

module.exports = router;
