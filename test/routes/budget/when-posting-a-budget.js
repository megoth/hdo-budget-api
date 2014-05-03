var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect,
    mockValidator = require('../../utils/mockValidator'),
    mockModel = require('../../utils/mockModel'),
    Budget = mockModel({ 
      'create': [null, { id: 42 }] 
    }),
    Frame = mockModel({
      'create': [null, { id: 666 }]
    });
    budget = proxyquire('../../../routes/budget', {
      '../models/Budget': Budget,
      '../models/Frame': Frame
    });

describe('When posting a budget', function () {
  var validator;
  var budgetModel, frameModel;
  var flash;
  var response;
  var responsePromise;
  
  beforeEach(function() {
    budgetModel = Budget.model();
    frameModel = Frame.model();
    request = httpMocks.createRequest({
      body: { name: 'test', year: '2014' },
      files: { structureFile: {
        path: './test/routes/budget/structureTest.csv'
      }}
    });
    validator = mockValidator(request);
    request.flash = flash = sinon.spy();
    response = httpMocks.createResponse();

    responsePromise = budget.post(request, response);
  });
  
  it('Should validate', function () {
    expect(validator.checkBody.calledWith('name')).to.be.true;
    expect(validator.checkBody.calledWith('year')).to.be.true;
    expect(validator.constraints.notEmpty.callCount).to.equal(2);
    expect(validator.constraints.isInt.callCount).to.equal(1);
  });
  
  // it('Should create a new budget', function (done) {
  //   responsePromise.then(function () {
  //     expect(budgetModel.create.called).to.be.true;
  //     expect(budgetModel.create.calledWith({
  //       name: 'test',
  //       year: 2014
  //     })).to.be.true;
  //     done();
  //   });
  // });

  // it('Should create frames', function (done) {
  //   responsePromise.then(function () {
  //     expect(frameModel.create.called).to.be.true;
  //     done();
  //   });
  // });
  
  it('Should notify flash', function (done) {
    responsePromise.then(function () {
      expect(flash.called).to.be.true;
      expect(flash.calledWith('notice')).to.be.true;
      done();
    });
  });
  
  it('Should redirect to new budget', function (done) {
    responsePromise.then(function () {
      expect(response.statusCode).to.equal(303);
      expect(response._getRedirectUrl()).to.equal('budgets/42');
      done();
    })
  });
});