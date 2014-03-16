var User = require('../../models/User').model(),
    Q = require('q');

module.exports = function (identifier, profile, done) {
  var foundUser = Q.defer();
  User.findOne({ where: {openid: identifier } }, function (err, user) {
    if (user) {
      foundUser.resolve(user);
      return done(err, user);
    }
    var userQueries = profile.emails.map(function (email) {
      var defer = Q.defer();
      User.findOne({ where: { email: email.value } }, function (err, user) {
        if (user) {
          defer.resolve(user);
        } else {
          defer.reject(new Error('User not found'));
        }
      });
      return defer.promise;
    });
    Q.allSettled(userQueries).done(function (results) {
      user = results.reduce(function (memo, result) {
        return memo || (result.state == 'fulfilled' ? result.value : null);
      }, null);
      done(null, user);
      foundUser.resolve(user);
//      console.log("TEST", user.prototype);
//      user.updateAttributes({
//        identifier: identifier,
//        name: profile.displayName
//      }, function (err, user) {
//        done(null, user);
//        foundUser.resolve(user);
//      });
    });
  });
  return foundUser.promise;
};