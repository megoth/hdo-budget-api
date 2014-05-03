var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When creating budget', function () {
  var budget;
  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
  });

  it('should store name and a year', function () {
    expect(budget.name).to.equal('testName');
    expect(budget.year).to.equal(2014);
  });

  it('prepares frames', function () {
    expect(budget.frames.length).to.equal(0);
    expect(Object.keys(budget.frames._map).length).to.equal(0);
  });

  it('prepares chapters', function () {
    expect(budget.chapters.length).to.equal(0);
    expect(Object.keys(budget.chapters._map).length).to.equal(0);
  });

  it('prepares posts', function () {
    expect(budget.posts.length).to.equal(0);
    expect(Object.keys(budget.posts._map).length).to.equal(0);
  });
});