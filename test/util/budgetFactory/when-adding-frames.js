var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When adding frames', function () {
  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
    budget.addFrame(1, "Statsforvaltning");
  });

  it('should add it to budget', function () {
    expect(budget.frames.length).to.equal(1);
  });

  it('should add it as promise', function () {
    expect(Object.keys(budget.frames._map).length).to.equal(1);
    expect(budget.frames._map[1].promise).to.be.a('object');
  });
});
