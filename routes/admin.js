var renderUtil = require('../util/render');

exports.index = function (req, res) {
  res.render('admin', renderUtil.options(req, 'admin', 'Admin'));
};