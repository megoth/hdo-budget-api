var Frame = null;

module.exports = {
  model: function () {
    return Frame;
  },
  setup: function (schema) {
    return Frame = schema.define('Frame', {
      budgetId: Number,
      no: Number,
      name: String
    }, {
      table: 'frames'
    });
  }
};