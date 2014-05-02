var renderUtil = require('../util/render');

exports.index = function(req, res){
  res.render('index', renderUtil.options(req, 'frontpage', 'Budgets'));
};