var routes = require('../routes');
var user = require('../routes/user');
var admin = require('../routes/admin');
var budget = require('../routes/budget');

module.exports = function (app, passport, auth) {
  app.get('/', routes.index);
  app.get('/admin', admin.list);
  app.get('/budgets/create', budgets.create);
  app.get('/users', user.list);
  app.get('/logout', user.logout);
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', { 
    successRedirect: '/admin',
    failureRedirect: '/' 
  }));
};