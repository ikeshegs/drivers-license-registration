const express = require('express');

const licenseController = require('../controllers/license.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/licenses')
  .post(licenseController.createLicense)
  .get(
    authController.restrictTo('admin', 'reviewer', 'processor'),
    licenseController.getAllLicenses
  );

module.exports = router;
