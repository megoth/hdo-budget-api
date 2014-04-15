var renderUtil = require('../util/render');

exports.index = function(req, res){
  res.render('admin', renderUtil.options(req, 'budgets', 'Admin', {
    user: req.user
  }));
};

exports.create = function (req, res) {
  res.render('budget/create', renderUtil.options(req, 'budgets', 'Create new budget'));
};