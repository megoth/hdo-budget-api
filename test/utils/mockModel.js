var sinon = require('sinon');

module.exports = function (args) {
  var model = {};
  [{'create': 1}].forEach(function (method) {
    var key = Object.keys(method)[0];
    var val = method[key];
    model[key] = sinon.spy(function () {
      if (val == -1) return;
      arguments[val].apply(this, args[key]);
    });
  });
  return {
    model: function () {
      return model;
    }
  }
};