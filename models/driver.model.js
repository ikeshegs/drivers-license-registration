const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
  applicationType: {
    type: String,
    required: [true, 'Application Type is required']
  },
  testScores: {
    type: Number,
    required: [true, 'Test score is required']
  },
  type: {
    type: String,
    required: [true, 'Type your email address']
  },
  stateOfApplication: {
    type: String,
    required: [true, 'State of Application is required']
  },
  residentialAddress: {
    type: String,
    required: [true, 'Your residential address is required']
  }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
