/*
 * GET budgets listing
 */

exports.list = function(req, res){
//  passport.authorize('google', { failureRedirect: '/' })
  res.render('admin', { 
    title: 'Admin',
    user: req.user
  });
};