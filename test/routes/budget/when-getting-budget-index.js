var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect,
    mockValidator = require('../../utils/mockValidator'),
    mockModel = require('../../utils/mockModel'),
    Budget = mockModel({ 
      'all': [null, []] 
    }),
    budget = proxyquire('../../../routes/budget', {
      '../models/Budget': Budget
    });

describe('When getting budget index', function () {
  var response;
  var model;
  var validator;
  
  beforeEach(function() {
    var request = httpMocks.createRequest();
    request.isAuthenticated = sinon.spy();
    response = httpMocks.createResponse();
    model = Budget.model();
    validator = mockValidator(request);

    budget.index(request, response);
  });

  it('should render view', function () {
    expect(response._getRenderView()).to.equal('budget/index');
  });
  
  it('Should return 200 OK', function () {
    expect(response.statusCode).to.equal(200);
    expect(response._isEndCalled());
  });

  it('should get all budgets', function () {
  	expect(model.all.called).to.be.true;
  });
});