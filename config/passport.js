//var mongoose = require('mongoose'),
//  User = mongoose.model('User'),
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function (passport) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.load(id, done)
  });
  
  // use google strategy
  passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  }, function (identifier, profile, done) {
//      User.findOrCreate({ openId: identifier }, function(err, user) {
//        done(err, user);
//      });
    }
  ));
  // use geekevents strategy
//  passport.use(new GeekeventsStrategy(function (userCred, done) {
//    User.findOne(userCred, function (err, user) {
//      if (err) {
//        return done(err);
//      }
//      if (!user) {
//        return done(null, false, { message:'Unknown user' });
//      }
//      return done(null, user)
//    })
//  }));
};
