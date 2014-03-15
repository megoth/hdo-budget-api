var assert = require('assert'),
    budget = require('../../routes/budget'),
    sinon = require('sinon');

describe('When creating a budget', function () {
  var res;
  
  beforeEach(function() {
    res = {
      render: sinon.spy()
    };
    budget.create({}, res);
  });
  
  it('Should render a view', function () {
    assert(res.render.called);
  });
  
  it('Should render the create form', function () {
    assert(res.render.calledWith('budget/create'));
  });
});