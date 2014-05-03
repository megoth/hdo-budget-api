var sinon = require('sinon');

module.exports = function () {
  var fs = sinon.spy({
    createReadStream: sinon.spy(function () {
      return []
    })
  });
  return fs;
};