var renderUtil = require('../util/render');
var Budget = require('../models/Budget').model(),
    Frame = require('../models/Frame').model(),
    util = require('util');
var fs = require('fs');
var csv = require('csv');
var Q = require('q');

exports.index = function(req, res){
  Budget.all({}, function (err, budgets) {
    res.status(200);
    res.render('budget/index', renderUtil.options(req, 'budgets', 'Budgets', {
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
  var deferred = Q.defer();
  req.checkBody('name', 'Name required').notEmpty();
  req.checkBody('year', 'Invalid year').notEmpty().isInt();

  // csv().from.stream(fs.createReadStream(req.files.structureFile.path))
  //   .on('record', function (row, index) {;
  //     if (index == 0) return;
  //     Frame.create({
  //       no: parseInt(row[0])
  //     }, function (err, frame) {
  //       console.log("TEST");
  //     });
  //   })
  //   .on('end', function () {
  //     res.redirect(303, 'budgets');
  //     Budget.create({
  //       name: req.body.name,
  //       year: parseInt(req.body.year)
  //     }, function (err, budget) {
        req.flash('notice', 'Created budget');
        res.redirect(303, 'budgets/42');
        deferred.resolve();
  //     });
  //   });
  return deferred.promise;
};