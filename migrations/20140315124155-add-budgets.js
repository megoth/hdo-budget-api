var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('budgets', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, unique: true, notNull: true },
    name: { type: 'string', unique: true, notNull: true },
    year: { type: 'int', notNull: true }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('budgets', callback);
};
