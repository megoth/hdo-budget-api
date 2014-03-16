var Budget = require('../models/Budget').model(),
    util = require('util');

exports.create = function (req, res) {
  res.render('budget/create', { title: 'Create new budget' });
};

exports.post = function (req, res) {
  req.checkBody('name', 'Name required').notEmpty();
  req.checkBody('year', 'Invalid year').notEmpty().isInt();
  
  Budget.create({
    name: req.name,
    year: parseInt(req.year)
  }, function (err, budget) {
    req.flash('notice', 'Created budget');
    res.redirect(303, util.format('budget/%d', budget.id));
  });
};