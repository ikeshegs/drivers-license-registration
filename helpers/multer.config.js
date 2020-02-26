const multer = require('multer');

const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload an image.', 400), false);
  }

  if (file.mimetype === 'application/msword') {
    cb(null, true);
  } else {
    cb(new AppError('Please upload a Microsoft Word document.', 400), false);
  }

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
