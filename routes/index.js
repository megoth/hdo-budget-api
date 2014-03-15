//var User = require('../models/User')();

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
    title: 'Budgets',
    user: req.user
  });
};