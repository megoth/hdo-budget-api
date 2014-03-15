var routes = require('../routes');
var user = require('../routes/user');
var admin = require('../routes/admin');

module.exports = function (app, passport) {
  app.get('/', routes.index);
  app.get('/admin', admin.list);
  app.get('/users', user.list);
  app.get('/logout', user.logout);
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', { 
    successRedirect: '/admin',
    failureRedirect: '/' 
  }));
};