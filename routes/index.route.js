const express = require('express');

const index = express.Router();

index.get('/', (req, res) => {
  res.render('overview', {
    pageTitle: 'Drivers and Vehicle License',
    path: '/'
  });
});

module.exports = index;
