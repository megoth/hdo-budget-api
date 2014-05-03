var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When getting posts', function () {
  var budget;
  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
  });

  describe('When previously added', function () {
    beforeEach(function () {
      budget.addPost(20, 1, "Apanasje", 42);
    });

    it('resolves the frame immediately', function (done) {
      budget.getPost(20, 1).then(function (post) {
        expect(post.chapterNo).to.equal(20);
        expect(post.no).to.equal(1);
        expect(post.name).to.equal("Apanasje");
        expect(post.cost).to.equal(42);
        expect(post.revenue).to.equal(0);
        done();
      });
    });
  });

  describe('When not yet added', function () {
    var post;
    beforeEach(function () {
      post = budget.getPost(20, 1);
    });

    it('gets a promise', function () {
      expect(post.then).to.be.a('function');
    });

    it('resolves when frame is later added', function (done) {
      post.then(function (post) {
        expect(post.chapterNo).to.equal(20);
        expect(post.no).to.equal(1);
        expect(post.name).to.equal("Apanasje");
        expect(post.cost).to.equal(42);
        expect(post.revenue).to.equal(0);
        done();
      });
      budget.addPost(20, 1, "Apanasje", 42);
    });
  });
});