const express = require('express');

const viewController = require('../controllers/view.controller');

const router = express.Router();

router.get('/auth/signup', viewController.getSignupPage);
router.get('/auth/login', viewController.getLoginPage);
router.get('/users/reviewer', viewController.getReviewerPage);
router.get('/users/processor', viewController.getProcessorPage);
router.get('/drivers', viewController.getVehicleLicensePage);
router.get('users/reviewer/drivers/abdul', viewController.getDriversReviewPage);
router.get(
  '/users/processor/drivers/abdul',
  viewController.getDriversProcessorPage
);

module.exports = router;
