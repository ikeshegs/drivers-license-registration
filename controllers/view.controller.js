exports.getSignupPage = (req, res) => {
  res.render('signup', {
    pageTitle: 'Drivers and Vehicle License | Sign Up',
    path: '/auth/signup',
    isSignUp: true
  });
};

exports.getLoginPage = (req, res) => {
  res.render('login', {
    pageTitle: 'Drivers and Vehicle License | Login',
    path: '/auth/login',
    isSignUp: true
  });
};

exports.getReviewerPage = (req, res) => {
  res.render('reviewer', {
    pageTitle: 'Drivers and Vehicle License | Application Reviewer',
    path: '/users/reviewer',
    isSignUp: true
  });
};

exports.getProcessorPage = (req, res) => {
  res.render('processor', {
    pageTitle: 'Drivers and Vehicle License | Application Processor',
    path: '/users/processor',
    isSignUp: true
  });
};

exports.getVehicleLicensePage = (req, res) => {
  res.render('vehicleLicense', {
    pageTitle: 'Drivers and Vehicle License | Drivers License Form'
  });
};

exports.getDriversReviewPage = (req, res) => {
  res.render('driverspage', {
    pageTitle: `Drivers and Vehicle License | Drivers Abdul`
  });
};

exports.getDriversProcessorPage = (req, res) => {
  res.render('process-driver', {
    pageTitle: `Drivers and Vehicle License | Drivers Abdul`
  });
};
