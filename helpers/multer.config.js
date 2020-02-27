const multer = require('multer');

const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // if (
  //   file.mimetype.startsWith('image') &&
  //   file.mimetype === 'application/pdf'
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(new AppError('Please upload an image.', 400), false);
  // }

  // if (
  //   file.mimetype === 'application/msword' ||
  //   file.mimetype === 'application/pdf'
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(new AppError('Accepts only .docx or .pdf file extensions', 400), false);
  // }

  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Only .pdf is accepted.', 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});