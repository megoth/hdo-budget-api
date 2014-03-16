var proxyquire = require('proxyquire'),
    assert = require('assert'),
    sinon = require('sinon'),
    validator = require('express-validator'),
    _ = require('underscore');

var mockValidator = require('../utils/mockValidator'),
    mockModel = require('../utils/mockModel');

describe('When posting a budget', function () {
  var validator;
  var model;
  var redirect;
  var flash;
  
  beforeEach(function() {
    // mock model
    var Budget = mockModel({ 
      'create': [null, { id: 42 }] 
    });
    model = Budget.model();
    budget = proxyquire('../../routes/budget', {
      '../models/Budget': Budget
    });
    // mock req
    var req = { name: 'test', year: '2014' };
    validator = mockValidator(req);
    req.flash = flash = sinon.spy();
    // mock res
    var res = {};
    res.redirect = redirect = sinon.spy();
    
    budget.post(req, res);
  });
  
  it('Should validate', function () {
    assert(validator.checkBody.calledWith('name'));
    assert(validator.checkBody.calledWith('year'));
    assert.equal(validator.constraints.notEmpty.callCount, 2);
    assert.equal(validator.constraints.isInt.callCount, 1);
  });
  
  it('Should create a new budget', function () {
    assert(model.create.called);
    assert(model.create.calledWith({
      name: 'test',
      year: 2014
    }));
  });
  
  it('Should notify flash', function () {
    assert(flash.called);
    assert(flash.calledWith('notice'));
  });
  
  it('Should redirect to admin', function () {
    assert(redirect.called);
    assert(redirect.calledWith(303, 'budget/42'));
  });
});