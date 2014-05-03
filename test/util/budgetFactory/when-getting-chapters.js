var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When getting chapters', function () {
  var budget;
  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
  });

  describe('When previously added', function () {
    beforeEach(function () {
      budget.addChapter(1, 20, "Statsministerens kontor");
    });

    it('resolves the chapter immediately', function (done) {
      budget.getChapter(20).then(function (chapter) {
        expect(chapter.frameNo).to.equal(1);
        expect(chapter.no).to.equal(20);
        expect(chapter.name).to.equal("Statsministerens kontor");
        done();
      });
    });
  });

  describe('When not yet added', function () {
    var chapter;
    beforeEach(function () {
      chapter = budget.getChapter(20);
    });

    it('gets a promise', function () {
      expect(chapter.then).to.be.a('function');
    });

    it('resolves when chapter is later added', function (done) {
      chapter.then(function (chapter) {
        expect(chapter.frameNo).to.equal(1);
        expect(chapter.no).to.equal(20);
        expect(chapter.name).to.equal("Statsministerens kontor");
        done();
      });
      budget.addChapter(1, 20, "Statsministerens kontor");
    });
  });
});