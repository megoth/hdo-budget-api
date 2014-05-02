var _ = require('underscore');

module.exports = {
  options: function (req, domain, title, options) {
    return _.extend({
      domain: domain,
      title: title
    }, options || {});
  }
};