var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect,
    mockValidator = require('../../utils/mockValidator'),
    mockModel = require('../../utils/mockModel'),
    Budget = mockModel({ 
      'create': [null, { id: 42 }] 
    }),
    budget = proxyquire('../../../routes/budget', {
      '../models/Budget': Budget
    });

describe('When posting a budget', function () {
  var validator;
  var model;
  var flash;
  var reponse;
  
  beforeEach(function() {
    model = Budget.model();
    request = httpMocks.createRequest({
      body: { name: 'test', year: '2014' }
    });
    validator = mockValidator(request);
    request.flash = flash = sinon.spy();
    response = httpMocks.createResponse();

    budget.post(request, response);
  });
  
  it('Should validate', function () {
    expect(validator.checkBody.calledWith('name')).to.be.true;
    expect(validator.checkBody.calledWith('year')).to.be.true;
    expect(validator.constraints.notEmpty.callCount).to.equal(2);
    expect(validator.constraints.isInt.callCount).to.equal(1);
  });
  
  it('Should create a new budget', function () {
    expect(model.create.called).to.be.true;
    expect(model.create.calledWith({
      name: 'test',
      year: 2014
    })).to.be.true;
  });
  
  it('Should notify flash', function () {
    expect(flash.called).to.be.true;
    expect(flash.calledWith('notice')).to.be.true;
  });
  
  it('Should redirect to new budget', function () {
    expect(response.statusCode).to.equal(303);
    expect(response._getRedirectUrl()).to.equal('budget/42');
  });
});