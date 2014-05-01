var assert = require('assert'),
    sinon = require('sinon'),
    budget = require('../../routes/budget'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect;

describe('When getting form to create budget', function () {
  var request, response;
  
  beforeEach(function() {
    request = httpMocks.createRequest();
    request.isAuthenticated = sinon.spy();
    response = httpMocks.createResponse();
    
    budget.create(request, response);
  });
  
  it('Should return 200 OK', function () {
    expect(response.statusCode).to.equal(200);
    expect(response._isEndCalled());
  });
});