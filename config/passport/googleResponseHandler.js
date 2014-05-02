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
    Q.allSettled(userQueries)
      .done(function (results) {
        user = results.reduce(function (memo, result) {
          return memo || (result.state == 'fulfilled' ? result.value : null);
        }, null);
        if (user) {
          user.updateAttributes({
            identifier: identifier,
            name: profile.displayName
          }, function (err, user2) {
            foundUser.resolve(user2);
            done(null, user2);
          });
        } else {
          foundUser.reject('no user found');
          done('no user found', null);
        }
      });
  });
  return foundUser.promise;
};