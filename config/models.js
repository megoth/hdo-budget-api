var Schema = require('jugglingdb').Schema,
    fs = require('fs'),
    util = require('util');

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
  
  fs.readdirSync('models').forEach(function (fileName) {
    require(util.format('%s/%s', '../models', fileName)).setup(schema);
  });
};