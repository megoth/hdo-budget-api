var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When adding posts', function () {
  var budget;

  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
    budget.addPost(20, 1, "Apanasje", 42);
  });

  it('should add it to budget', function () {
    expect(budget.posts.length).to.equal(1);
    expect(Object.keys(budget.posts._map).length).to.equal(1);
  });

  it('should add amount as cost', function () {
    var post = budget.posts[0]; 
    expect(post.cost).to.equal(42);
    expect(post.revenue).to.equal(0);
  });

  it('should add it as promise', function () {
    expect(Object.keys(budget.posts._map).length).to.equal(1);
    expect(budget.posts._map['20-1'].promise).to.be.a('object');
  });
});
