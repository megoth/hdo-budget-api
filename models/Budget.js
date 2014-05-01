var Budget = null;

module.exports = {
  model: function () {
    return Budget;
  },
  setup: function (schema) {
    return Budget = schema.define('Budget', {
      name: String,
      year: Number
    }, {
      table: 'budgets'
    });
  }
};