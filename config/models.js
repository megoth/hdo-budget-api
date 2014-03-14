var Schema = require('jugglingdb').Schema;

module.exports = function () {
    var schema = new Schema('postgres', {
        database: 'postgres',
        username: 'postgres',
        password: 'test'
         // host: 'localhost',
         // port: 5432,
         // password: s.password,
         // database: s.database,
         // ssl: true,
         // debug: false
    });
    
    require('../models/User')(schema);
};