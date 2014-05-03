var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('frames', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, unique: true, notNull: true },
    budgetId: { type: 'int', notNull: true },
    no: { type: 'int', notNull: true },
    name: { type: 'string', unique: true, notNull: true }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('frames', callback);
};
