const sharp = require('sharp');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const { upload } = require('../helpers/multer.config');

const signToken = id => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

exports.uploadUserPhoto = upload.single('photo');

exports.uploadUserDocument = upload.single('document');

// exports.uploads = upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'document', maxCount: 1 }
// ]);

exports.resizeUserPhoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({
      quality: 90
    })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.signup = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    sex,
    occupation,
    phone,
    role,
    dateOfBirth,
    stateOfOrigin,
    residentialAddress
  } = req.body;
  // const photo = req.files.photo[0];
  // const document = req.files.document;

  console.log(req.file);

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    phone,
    sex,
    occupation,
    residentialAddress,
    dateOfBirth,
    stateOfOrigin,
    // photo,
    // document,
    role
  });

  // const url = `${req.protocol}://${req.get('host')}/me`;
  // await new Email(newUser, url).sendWelcome();

  // createAndSendToken(newUser, 201, req, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user input is provided
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({
    email
  }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email address or password', 401));
  }

  // createAndSendToken(user, 200, req, res);
  createAndSendToken(user, 200, req, res);
});
