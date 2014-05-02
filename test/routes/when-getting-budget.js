var proxyquire = require('proxyquire'),
    assert = require('assert'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    mockValidator = require('../utils/mockValidator'),
    mockModel = require('../utils/mockModel'),
    expect = require('chai').expect;

describe('When getting budget', function () {
  var request, response;
  var model;
  var validator;
  
  beforeEach(function() {
    // mocking request and response
    request = httpMocks.createRequest({
      params: { id: 42 }
    });
    request.isAuthenticated = sinon.spy();
    response = httpMocks.createResponse();
    // mocking model
    var Budget = mockModel({ 
      'findOne': [null, 1337] 
    });
    model = Budget.model();
    //mocking validator
    validator = mockValidator(request);

    // setting up controller
    var budget = proxyquire('../../routes/budget', {
      '../models/Budget': Budget
    });
    budget.view(request, response);
  });

  it('should validate', function () {
    expect(validator.checkParams.calledWith('id')).to.be.true;
  });

  it('should find budget by id', function () {
    expect(model.findOne.called).to.be.true;
    expect(model.findOne.calledWith({ where: {id: 42}})).to.be.true;
  });

  it('should render view with', function () {
    expect(response._getRenderView()).to.equal('budget/view');
    console.log("TEST", response, response._getRenderData(), response._getData());
  });
  
  it('Should return 200 OK', function () {
    expect(response.statusCode).to.equal(200);
    expect(response._isEndCalled());
  });
});