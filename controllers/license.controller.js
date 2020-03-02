const License = require('../models/license.model');
const catchAsyncError = require('../utils/catchAsyncError');
const FilterAndPagination = require('../helpers/filterAndPagination');
// const AppError = require('../utils/appError');

exports.createLicense = catchAsyncError(async (req, res, next) => {
  const {
    applicationType,
    testScores,
    licenseType,
    stateOfOriginOfApplication,
    residentialAddress
  } = req.body;

  const newLicense = await License.create({
    applicationType,
    testScores,
    licenseType,
    stateOfOriginOfApplication,
    residentialAddress
  });

  res.status(201).json({
    status: 'success',
    newLicense
  });
});

exports.getAllLicenses = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId)
    filter = {
      tour: req.params.tourId
    };

  const features = new FilterAndPagination(License.find(filter), req.query)
    .filter()
    .paginate();

  const licenses = await features.query;

  res.status(200).json({
    status: 'success',
    results: licenses.length,
    data: {
      data: licenses
    }
  });
});
