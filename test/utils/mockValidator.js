var sinon = require('sinon'),
    _ = require('underscore');

module.exports = function (req) {
  var constraints = {};
  ['isAlpha', 'isInt', 'notEmpty'].forEach(function (method) {
    constraints[method] = sinon.spy(function () {
      return constraints;
    });
  });
  var validations = {
    constraints: constraints
  };
  ['checkBody', 'checkParams', 'checkQuery'].forEach(function (method) {
    validations[method] = sinon.spy(function () {
      return constraints;
    });
  });
  return _.extend(req, validations);
};