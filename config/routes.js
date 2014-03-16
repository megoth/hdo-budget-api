var routes = require('../routes');
var user = require('../routes/user');
var admin = require('../routes/admin');
var budget = require('../routes/budget');

module.exports = function (app, passport, auth) {
  // public pages
  app.get('/', routes.index);
  app.get('/logout', user.logout);
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', { 
    successRedirect: '/admin',
    failureRedirect: '/' 
  }));
  
  // admin pages
  app.get('/admin', auth.requiresLogin, admin.list);
  app.get('/budgets/new', auth.requiresLogin, budget.create);
  app.post('/budgets/new', auth.requiresLogin, budget.post);
  app.get('/users', auth.requiresLogin, user.list);
};