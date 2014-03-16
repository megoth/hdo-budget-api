var assert = require('assert'),
    budget = require('../../routes/budget'),
    sinon = require('sinon'),
    validator = require('express-validator'),
    _ = require('underscore'),
    mockValidator = require('../utils/mockValidator');

describe('When posting a budget', function () {
  var req;
  var validator;
  
  beforeEach(function() {
    req = {};
    validator = mockValidator();
    budget.post(_.extend(req, validator), {});
  });
  
  it('Should validate', function () {
    assert(validator.checkBody.calledWith('name'));
    assert(validator.checkBody.calledWith('year'));
    assert.equal(validator.constraints.notEmpty.callCount, 2);
    assert.equal(validator.constraints.isInt.callCount, 1);
  });
});