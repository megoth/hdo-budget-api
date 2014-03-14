var User = null;

module.exports = function (schema) {
  if (User) {
    return User;
  }
  
  if (!schema) {
    throw new Error('No schema given!');
  }
  
  User = schema.define('User', {
    email: String
  }, {
    table: 'users'
  });
//  console.log('Defined user schema');
//  
//  User.create({
//    email: 'test@gmail.com'
//  }, function () {
//    console.log("CREATED USER", arguments);
//    User.count(function () {
//      console.log("USERS", arguments);
//    });
//  });
  
  return User;
};