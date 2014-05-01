var sinon = require('sinon'),
    _ = require('underscore');

var extendReturnModel = function (model, response) {
  var returnModel = response[response.length - 1];
  if (returnModel) {
    _.extend(returnModel, model);
  }
};

module.exports = function (args) {
  var model = {};
  [{create: 1}, {findOne: 1}, {updateAttributes: 1}].forEach(function (method) {
    var key = Object.keys(method)[0];
    var val = method[key];
    var response = args[key];
    model[key] = sinon.spy(function () {
      if (val == -1 || !response) return;
      var args = Array.prototype.slice.call(arguments, 0);
      args.splice(val, 1);
      extendReturnModel(response, model);
      if (_.isArray(response)){
        arguments[val].apply(this, response);
      } else if(response.except) {
        var hit = response.except.reduce(function (memo, condition) {
          if(_.isEqual(args, condition.where)) {
            extendReturnModel(model, condition.response);
            memo.push(condition.response);
          }
          return memo;
        }, [])[0];
        arguments[val].apply(this, hit || response.response);
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