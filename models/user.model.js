const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastname: {
    type: String,
    required: [true, 'Last Name is required']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on create and save
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  photo: {
    type: String,
    required: [true, 'Please upload your profile picture']
  },
  document: {
    type: String,
    required: [true, 'Please upload the relevant documents']
  },
  role: {
    type: String,
    enum: ['user', 'reviewer', 'processor', 'admin'],
    default: 'user'
  },
  sex: {
    type: String,
    enum: ['male', 'female']
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number is required'],
    min: []
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date Of Birth is required'],
    validate: [
      validator.isISO8601,
      'Please type in your D.O.B. in the correct format'
    ]
  },
  stateOfOrigin: {
    type: String,
    required: [true, 'State of Origin is required']
  },
  occupation: {
    type: String,
    required: [true, 'Your Occupation is required']
  },
  residentialAddress: {
    type: String,
    required: [true, 'Your residential address is required']
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

// Middlewares
userSchema.pre('save', async function(next) {
  // only run this function if password was modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // delete the passwordConfirm value
  this.passwordConfirm = undefined;
  next();
});

// instance method
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
