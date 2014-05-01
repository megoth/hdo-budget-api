var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect,
    mockValidator = require('../utils/mockValidator'),
    mockModel = require('../utils/mockModel');

describe('When posting a budget', function () {
  var validator;
  var model;
  var redirect;
  var flash;
  var request, reponse;
  
  beforeEach(function() {
    // mock model
    var Budget = mockModel({ 
      'create': [null, { id: 42 }] 
    });
    model = Budget.model();
    budget = proxyquire('../../routes/budget', {
      '../models/Budget': Budget
    });
    request = httpMocks.createRequest({
      params: { name: 'test', year: '2014' }
    });
    validator = mockValidator(request);
    request.flash = flash = sinon.spy();
    response = httpMocks.createResponse();
    budget.post(request, response);
  });
  
  it('Should validate', function () {
    expect(validator.checkBody.calledWith('name'));
    expect(validator.checkBody.calledWith('year'));
    expect(validator.constraints.notEmpty.callCount).to.equal(2);
    expect(validator.constraints.isInt.callCount).to.equal(1);
  });
  
  it('Should create a new budget', function () {
    expect(model.create.called);
    expect(model.create.calledWith({
      name: 'test',
      year: 2014
    }));
  });
  
  it('Should notify flash', function () {
    expect(flash.called);
    expect(flash.calledWith('notice'));
  });
  
  it('Should redirect to admin', function () {
    expect(response.statusCode).to.equal(303);
    expect(response._getRedirectUrl()).to.equal('budget/42');
  });
});