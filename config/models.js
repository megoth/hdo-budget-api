var Schema = require('jugglingdb').Schema;

module.exports = function () {
  var schema = new Schema('postgres', {
    username: 'postgres',
    password: 'test',
    database: 'postgres'
    // host: 'localhost',
    // port: 5432,
    // password: s.password,
    // database: s.database,
    // ssl: true,
    // debug: false
  });
  
  require('../models/User')(schema);
};