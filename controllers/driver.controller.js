const Driver = require('../models/driver.model');
const catchAsyncError = require('../utils/catchAsyncError');
// const AppError = require('../utils/appError');

exports.submitLicenseForm = catchAsyncError(async (req, res, next) => {
  const {
    applicationType,
    testScores,
    type,
    stateOfApplication,
    residentialAddress
  } = req.body;

  const newLicense = await Driver.create({
    applicationType,
    testScores,
    type,
    stateOfApplication,
    residentialAddress
  });

  res.status(201).render('thank-you', {
    pageTitle: 'Thank You',
    newLicense
  });
});
