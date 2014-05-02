var renderUtil = require('../util/render');
var Budget = require('../models/Budget').model(),
    util = require('util');

exports.index = function(req, res){
  Budget.all({}, function (err, budgets) {
    res.status(200);
    res.render('budget/index', renderUtil.options(req, 'budgets', 'Admin', {
      budgets: budgets,
      user: req.user
    }));
  });
};

exports.view = function (req, res) {
  req.checkParams('id', 'Id required').notEmpty().isInt();

  Budget.findOne({ where: { id: req.params.id }}, function (err, budget) {
    res.status(200);
    res.render('budget/view', renderUtil.options(req, 'budgets', 'Budget', {
      budget: budget
    }));
  });
};

exports.create = function (req, res) {
  res.status(200);
  res.render('budget/create', renderUtil.options(req, 'budgets', 'Create new budget'));
};

exports.post = function (req, res) {
  req.checkBody('name', 'Name required').notEmpty();
  req.checkBody('year', 'Invalid year').notEmpty().isInt();
  
  Budget.create({
    name: req.body.name,
    year: parseInt(req.body.year)
  }, function (err, budget) {
    req.flash('notice', 'Created budget');
    res.redirect(303, util.format('budget/%d', budget.id));
  });
};