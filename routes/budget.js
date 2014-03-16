

exports.create = function (req, res) {
  res.render('budget/create', { title: 'Create new budget' });
};

exports.post = function (req, res) {
  req.checkBody('name', 'Name required').notEmpty();
  req.checkBody('year', 'Invalid year').notEmpty().isInt();
};