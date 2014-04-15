//var User = require('../models/User')();
var renderUtil = require('../util/render');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', renderUtil.options(req, 'frontpage', 'Budgets'));
};