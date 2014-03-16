var User = null;

module.exports = {
  model: function () {
    return User;
  },
  setup: function (schema) {
    User = schema.define('User', {
      email: String,
      openid: String,
      name: String
    }, {
      table: 'users'
    });
//    console.log('Defined user schema');
//
//    User.create({
//      email: 'arne.hassel@gmail.com',
//      openid: 'https://www.google.com/accounts/o8/id?id=AItOawl-ypq0NT_1O4rUANYFCe021DGYmmoCCew',
//      name: 'Arne Hassel'
//    }, function (err, user) {
//      console.log("CREATED USER", user);
//      User.count(function (err, count) {
//        console.log("USERS", count);
//      });
//    });
    return User;
  }
};