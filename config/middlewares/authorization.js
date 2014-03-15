/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "Need to be logged");
    res.redirect('/');
  }
};

exports.requiresUnauthorized = function (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("error", "Cannot be logged in");
    res.redirect('/');
  } else {
    next();
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.isAdmin = function (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    req.flash("error", "Need to be admin");
    res.redirect('/');
  }
};