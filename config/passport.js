//var mongoose = require('mongoose'),
//  User = mongoose.model('User'),
var GoogleStrategy = require('passport-google').Strategy,
    User = require('../models/User').model();

module.exports = function (passport) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function (user, done) {
//    console.log("SERIALIZE", user);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
//    console.log("DESERIALIZE", id);
    User.find(id, done);
//    User.find(id, function (err, user) {
//      console.log("FOUND USER", err, user);
//      done(err, user);
//    });
  });
  
  // use google strategy
  passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  }, function (identifier, profile, done) {
      User.findOne({ where: {openid: identifier } }, done);
//      User.findOne({ where: {openid: identifier } }, function (err, user) {
//        console.log("ERROR", err, user);
//        return done(err, user);
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
