var _ = require('underscore'),
    sinon = require('sinon');

module.exports = function () {
  var constraints = {};
  ['isInt', 'notEmpty'].forEach(function (method) {
    constraints[method] = sinon.spy(function () {
      return constraints;
    });
  });
  var validations = {
    constraints: constraints
  };
  ['checkBody'].forEach(function (method) {
    validations[method] = sinon.spy(function () {
      return constraints;
    });
  });
  return validations;
};