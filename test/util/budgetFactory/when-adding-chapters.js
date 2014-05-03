var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When adding chapters', function () {
  var budget;

  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
    budget.addChapter(1, 20, "Statsministerens kontor");
  });

  it('should add it to budget', function () {
    expect(budget.chapters.length).to.equal(1);
  });

  it('should add it as promise', function () {
    expect(Object.keys(budget.chapters._map).length).to.equal(1);
    expect(budget.chapters._map[20].promise).to.be.a('object');
  });
});
