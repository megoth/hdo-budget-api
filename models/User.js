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
    return User;
  }
};