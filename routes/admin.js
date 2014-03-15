var passport = require('passport');

/*
 * GET budgets listing
 */

exports.list = function(req, res){
  if (!req.user) res.redirect('/');
//  passport.authorize('google', { failureRedirect: '/' })
  res.render('admin', { title: 'Admin' });
};