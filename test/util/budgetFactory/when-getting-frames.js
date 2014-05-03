var budgetFactory = require('../../../util/budgetFactory'),
    expect = require('chai').expect;

describe('When getting frames', function () {
  var budget;
  beforeEach(function () {
    budget = budgetFactory.create('testName', 2014);
  });

  describe('When previously added', function () {
    beforeEach(function () {
      budget.addFrame(1, "Statsforvaltning");
    });

    it('resolves the frame immediately', function (done) {
      budget.getFrame(1).then(function (frame) {
        expect(frame.no).to.equal(1);
        expect(frame.name).to.equal("Statsforvaltning");
        done();
      });
    });
  });

  describe('When not yet added', function () {
    var frame;
    beforeEach(function () {
      frame = budget.getFrame(1);
    });

    it('gets a promise', function () {
      expect(frame.then).to.be.a('function');
    });

    it('resolves when frame is later added', function (done) {
      frame.then(function (frame) {
        expect(frame.no).to.equal(1);
        expect(frame.name).to.equal("Statsforvaltning");
        done();
      });
      budget.addFrame(1, "Statsforvaltning");
    });
  });
});