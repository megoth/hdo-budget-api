var Chapter = null;

module.exports = {
  model: function () {
    return Chapter;
  },
  setup: function (schema) {
    return Chapter = schema.define('Chapter', {
      budgetId: Number,
      frameId: Number,
      no: Number,
      name: String
    }, {
      table: 'chapters'
    });
  }
};