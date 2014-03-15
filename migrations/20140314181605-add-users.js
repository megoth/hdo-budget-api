var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, unique: true, notNull: true },
    email: { type: 'string', unique: true, notNull: true },
    openid: { type: 'string', unique: true, notNull: true },
    name: { type: 'string' }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};