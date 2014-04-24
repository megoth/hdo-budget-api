var proxyquire = require('proxyquire'),
    mockModel = require('../utils/mockModel'),
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    expect = require('chai').expect;

var setupHandler = function (User) {
  return proxyquire('../../config/passport/googleResponseHandler', {
    '../../models/User': User
  });
};

describe('When logging in with Google', function () {
  var doneSpy;
  var model;
  
  beforeEach(function () {
    doneSpy = sinon.spy();
  });
  
  describe('When finding user by identifer', function () {
    beforeEach(function () {
      var User = mockModel({
        findOne: [null, 42]
      });
      model = User.model();
      setupHandler(User)(1337, {}, doneSpy);
    });
    
    it('Should look up', function () {
      expect(model.findOne.calledWith({ where: {openid: 1337}}));
    });
    
    it('Should simply move on', function () {
      expect(doneSpy.calledWith(null, 42));
    });
  });
  
  describe('When finding user by email', function () {
    var handler;
    var userReturned;
    
    beforeEach(function () {
      userReturned = {};
      var User = mockModel({
        findOne: {
          response: [null, null],
          except: [{
            where: [ { where: { email: 'test@test.com' } } ],
            response: [null, userReturned]
          }]
        }
      });
      model = User.model();
      handler = setupHandler(User)(1337, { 
        displayName: 'Test Testersen',
        emails: [ 
          { value: 'test@test.com' },
          { value: 'test2@test.com' }
        ]
      }, doneSpy);
    });
    
    it('Should look up emails', function () {
      expect(model.findOne.calledWith({ where: {email: 'test@test.com'}}));
      expect(model.findOne.calledWith({ where: {email: 'test2@test.com'}}));
    });
    
    it('Should update user', function () {
      expect(userReturned.updateAttributes.calledWith({
        openid: 1337,
        name: 'Test Testersen'
      }));
    });
    
    it('Should move on with found user', function (done) {
      handler.then(function () {
        expect(doneSpy.calledWith(null, userReturned));
        done();
      });
    });
  });
});