const mongoose = require('mongoose');

const licenseSchema = mongoose.Schema({
  applicationType: {
    type: String,
    enum: ['Articulated Vehicle', 'Commercial', 'Private', 'Motorcycle'],
    required: [true, 'Select the application type from the dropdown']
  },
  testScores: {
    type: Number,
    minlength: [1, 'Test scores cannot be less than 1'],
    maxlength: [100, 'Test scores cannot be above 100'],
    required: [true, 'Your test score is required']
  },
  licenseType: {
    type: String,
    enum: ['Fresh', 'Renewal'],
    required: [true, 'Select the license type']
  },
  stateOfOriginOfApplication: {
    type: String,
    required: [true, 'State of Application is required']
  },
  residentialAddress: {
    type: String,
    required: [true, 'Your residential address is required']
  },
  stageOfApplication: {
    type: String,
    enum: ['Review', 'Processing'],
    default: 'Review'
  },
  stateOfApplication: {
    type: String,
    enum: ['pending', 'rejected', 'approved'],
    default: 'Pending'
  }
});

const License = mongoose.model('Driver', licenseSchema);

module.exports = License;
