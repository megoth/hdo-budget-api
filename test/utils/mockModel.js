var sinon = require('sinon'),
    _ = require('underscore');

module.exports = function (args) {
  var model = {};
  [{all: 1}, {create: 1}, {findOne: 1}, {updateAttributes: 1}].forEach(function (method) {
    var key = Object.keys(method)[0];
    var val = method[key];
    var response = args[key];
    model[key] = sinon.spy(function () {
      if (val == -1 || !response) return;
      var args = Array.prototype.slice.call(arguments, 0);
      args.splice(val, 1);
      if (_.isArray(response)){
        arguments[val].apply(this, response);
      } else if(response.except) {
        var hit = [];
        response.except.forEach(function (condition) {
          if(_.isEqual(args, condition.where)) {
            hit.push(condition.response);
          }
        });
        arguments[val].apply(this, hit[0] || response.response);
      } else {
        arguments[val].apply(this, response.response);
      }
    });
  });
  return {
    model: function () {
      return model;
    }
  }
};