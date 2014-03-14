var routes = require('./routes');
var user = require('./routes/user');

module.exports = function (app, passport) {
  app.get('/', routes.index);
  app.get('/users', user.list);
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', { 
    successRedirect: '/',
    failureRedirect: '/users' 
  }));
};