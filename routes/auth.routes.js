const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/signup',
  // authController.uploadUserPhoto,
  // authController.uploads,
  authController.uploadUserDocument,
  authController.signup
);

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
